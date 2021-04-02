defmodule ErpWeb.PlanningController do
@moduledoc """
A module that acts as the controller for the product planning module.
"""
  use ErpWeb, :controller
  import Ecto.Query, warn: false

  alias Erp.Planning

  @doc false
  """
  def show(conn, %{"id" => material_id}) do
    material = Erp.Production.Material.get_material!(material_id)
    render(conn, "show.json", material: material)
  end
    """
  @doc """
  Show all materials.
  """
  def show_all_tasks(conn, _params) do
    tasks = Erp.Planning.Task.list_tasks()
    render(conn, "index.json", tasks: tasks)
  end
end
