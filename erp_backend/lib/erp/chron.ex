defmodule Erp.Chron do
  use GenServer

  import Ecto.Query
  import Erp.Email
  import Erp.Production.MaterialsExpense
  alias Erp.Repo
  alias Erp.Sales.Order
  alias Erp.Packaging.Package

  # Chron job methods

  def start_link(_ok) do
    GenServer.start_link(__MODULE__, %{})
  end

  @doc """
  Initiate worker
  """
  def init(state) do
    schedule_chron() # Schedule work to be performed at some point
    {:ok, state}
  end

  @doc """
  Handle message sending for processes
  """
  def handle_info(:work, state) do
    update_database()

    schedule_chron() # Reschedule once more
    {:noreply, state}
  end

  @doc """
  Chron job scheduler
  """
  defp schedule_chron() do
    Process.send_after(self(), :work, 60 * 1000) # run every minute
    # change time later!!!
  end

  @doc """
  Update databases with new data at scheduled times
  """
  defp update_database() do
    # handle order created -> packaged (0 -> 1)
    update_created_orders()

    # handle order packaged -> shipped (1 -> 2)
    update_packaged_orders()

    # handle order shipped -> delivered (2 -> 3)
    update_shipped_orders()
  end

  @doc """
  Update status 0 orders
  """
  defp update_created_orders() do
    query = from(o in Order, join: p in Package, on: o.id == p.order_id and o.status == 0, update: [set: [status: 1]])
    Repo.update_all(query, [])
  end

  @doc """
  Update status 1 orders
  """
  defp update_packaged_orders() do
    # update the records
    cutoff_time = NaiveDateTime.add(NaiveDateTime.truncate(NaiveDateTime.utc_now(), :second), -120, :second) # 2 minutes, for demo purposes
    
    update_query = from(o in Order, where: o.status == 1 and o.time < ^cutoff_time, select: [:id, :userEmail], update: [set: [status: 2]])
    {_ok, updated} = Repo.update_all(update_query, [])

    # add the packages to expenses and email users
    if updated != nil do
      Enum.each(updated, fn(order) -> 
        #package = Repo.all(from(p in Package, where: p.order_id == ^order.id))
        #create_expense(Enum.at(package, 0).weight * 2, 'Packaging Boxes Inc.')
        order_shipped_email(order.userEmail, order.id)
      end)
    end
  end

  @doc """
  Update status 2 orders
  """
  defp update_shipped_orders() do
    cutoff_time = NaiveDateTime.add(NaiveDateTime.truncate(NaiveDateTime.utc_now(), :second), -240, :second) # 4 minutes, for demo purposes
    query = from(o in Order, where: o.status == 2 and o.time < ^cutoff_time, select: [:id, :userEmail], update: [set: [status: 3]])
    {_ok, updated} = Repo.update_all(query, [])

    # email users
    if updated != nil do
      Enum.each(updated, fn(order) -> 
        order_delivered_email(order.userEmail, order.id, NaiveDateTime.truncate(NaiveDateTime.utc_now(), :second))
      end)
    end
  end
end