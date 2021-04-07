defmodule ErpWeb.TaskController do
  use ErpWeb, :controller

  alias Erp.Planning
  alias Erp.Planning.Task

  def new(conn, %{"task" => task_params}) do
    user = Guardian.Plug.current_resource(conn)
    case Planning.add_task(task_params, user) do
          {:ok} ->
            tasks = Erp.Planning.list_tasks()
            render(conn, "index.json", tasks: tasks)
          {:error, error} ->
            {:error, error}
    end
  end

  def show(conn, %{"id" => id}) do
    task = Planning.get_task!(id)
    render(conn, "show.html", task: task)
  end

  def show_all_tasks(conn, _params) do
    tasks = Erp.Planning.list_tasks()
    render(conn, "index.json", tasks: tasks)
  end

  def update_task(conn, %{"task" => task_params}) do

    task = Planning.get_task!(task_params["id"])

    case Planning.update_task(task, task_params) do
      {:ok} ->
        tasks = Erp.Planning.list_tasks()
        render(conn, "index.json", tasks: tasks)
      {:error, error} ->
        {:error, error}
    end
  end

  def delete(conn, %{"taskID" => id}) do
    task = Planning.get_task!(id)
    case Planning.delete_task(task) do
      {:ok} ->
        tasks = Erp.Planning.list_tasks()
        render(conn, "index.json", tasks: tasks)
      {:error, error} ->
        {:error, error}
    end

  end
end
