defmodule Erp.Chron do
  use GenServer

  # Chron job methods

  def start_link(_ok) do
    GenServer.start_link(__MODULE__, %{})
  end

  def init(state) do
    schedule_chron() # Schedule work to be performed at some point
    {:ok, state}
  end

  def handle_info(:work, state) do
    update_database()

    schedule_chron() # Reschedule once more
    {:noreply, state}
  end

  defp schedule_chron() do
    Process.send_after(self(), :work, 60 * 1000) # run every minute
  end

  # DB updating methods

  defp update_database() do
    # handle order created -> packaged (0 -> 1)
    orders = get_created_orders()

    # handle order packaged -> shipped (1 -> 2)

    # handle order shipped -> delivered (2 -> 3)

  end

  defp get_created_orders() do
    query = from o in Order, join: p in Packages, on o.id == p.orderId and o.status == 0
    Repo.all(query) # confirm Packages module, orderId foreign key
  end
end