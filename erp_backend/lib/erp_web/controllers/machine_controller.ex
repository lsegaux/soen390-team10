defmodule ErpWeb.MachineController do
  @moduledoc """
  A module that acts as the controller for managing machines.
  """
  use ErpWeb, :controller
  import Ecto.Query, warn: false

  alias Erp.Machine

  @doc """
  Get machine by id.
  """
  def show(conn, %{"id" => machine_id}) do
    machine = Erp.Machine.get_machine!(machine_id)
    render(conn, "show.json", machine: machine)
  end

  @doc """
  Show all machines.
  """
  def show_all_machines(conn, _params) do
    machines = Erp.Machine.list_machines()
    render(conn, "index.json", machines: machines)
  end

  @doc """
  Get a list of machines that correlate to a plant ID.
  """
  def get_machines_by_plant_id(conn, %{"id" => plant_id}) do
    machines = Erp.Machine.get_machines_by_plant_id(plant_id)
    render(conn, "index.json", machines: machines)
  end

  @doc """
  Update the status of a machine by ID.
  """
  def update_status(conn, %{"id" => machine_id, "status" => status}) do
    machine = Machine.get_machine!(machine_id)

    with {:ok, %Machine{} = machine} <- Machine.update_status(machine, status) do
      render(conn, "show.json", machine: machine)
    end
  end
end
