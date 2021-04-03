defmodule ErpWeb.PlanningController do
@moduledoc """
A module that acts as the controller for the product planning module.
"""
  use ErpWeb, :controller
  import Ecto.Query, warn: false

  alias Erp.Planning

  @doc false
  def new(conn, %{"task" => task_params}) do
    user = Guardian.Plug.current_resource(conn)
   
    case Erp.Planning.Task.add_task(task_params, user) do
          {:ok} ->
            json(conn, %{success: ":)"})
          {:error, error} ->
            {:error, error}
    end
  end

  @doc """
  Show all materials.
  """
  def show_all_tasks(conn, _params) do
    tasks = Erp.Planning.Task.list_tasks()
    render(conn, "index.json", tasks: tasks)
  end
end
