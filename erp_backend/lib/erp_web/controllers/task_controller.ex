defmodule ErpWeb.TaskController do
  use ErpWeb, :controller

  alias Erp.Planning
  alias Erp.Planning.Task

  def index(conn, _params) do
    tasks = Planning.list_tasks()
    render(conn, "index.html", tasks: tasks)
  end

  def new(conn, %{"task" => task_params}) do
    user = Guardian.Plug.current_resource(conn)
   
    case Planning.add_task(task_params, user) do
          {:ok} ->
            json(conn, %{success: ":)"})
          {:error, error} ->
            {:error, error}
    end
  end

  def create(conn, %{"task" => task_params}) do
    case Planning.create_task(task_params) do
      {:ok, task} ->
        conn
        |> put_flash(:info, "Task created successfully.")
        |> redirect(to: Routes.task_path(conn, :show, task))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    task = Planning.get_task!(id)
    render(conn, "show.html", task: task)
  end

  def update_task(conn, %{"taskID" => id, "taskName" => task_name, "taskDescription" => description, "status" => status, "taskType" => task_type, "startDate" => start_time, "endDate" => end_time}) do
    task = Planning.get_task!(id)

    {:ok, _task} = case Planning.update_task(task, %{"id" => id, "task_name" => task_name, "description" => description, "status" => status, "task_type" => task_type, "start_time" => start_time, "end_time" => end_time}) do
      {:ok} ->
        json(conn, %{success: ":)"})
      {:error, error} ->
        {:error, error}
    end
  end

  def show_all_tasks(conn, _params) do
    tasks = Erp.Planning.list_tasks()
    render(conn, "index.json", tasks: tasks)
    end

  def delete(conn, %{"taskID" => id}) do
    task = Planning.get_task!(id)
    {:ok, _task} = case Planning.delete_task(task) do
      {:ok} ->
        json(conn, %{success: ":)"})
      {:error, error} ->
        {:error, error}
    end

  end
end
