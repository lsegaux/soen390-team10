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

  def show_all_tasks(conn, _params) do
    tasks = Erp.Planning.list_tasks()
    render(conn, "index.json", tasks: tasks)
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

  def edit(conn, %{"id" => id}) do
    task = Planning.get_task!(id)
    changeset = Planning.change_task(task)
    render(conn, "edit.html", task: task, changeset: changeset)
  end

  def update(conn, %{"id" => id, "task" => task_params}) do
    task = Planning.get_task!(id)

    case Planning.update_task(task, task_params) do
      {:ok, task} ->
        conn
        |> put_flash(:info, "Task updated successfully.")
        |> redirect(to: Routes.task_path(conn, :show, task))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", task: task, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    task = Planning.get_task!(id)
    {:ok, _task} = Planning.delete_task(task)

    conn
    |> put_flash(:info, "Task deleted successfully.")
    |> redirect(to: Routes.task_path(conn, :index))
  end
end
