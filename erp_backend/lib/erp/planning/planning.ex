defmodule Erp.Planning do
  @moduledoc """
  The Planning context.
  """

  import Ecto.Query, warn: false
  alias Erp.Repo

  alias Erp.Planning.Task

  @doc """
  Returns the list of tasks.

  ## Examples

      iex> list_tasks()
      [%Task{}, ...]

  """
  def list_tasks do
    Repo.all(Task)
  end

  @doc """
  Gets a single task.

  Raises `Ecto.NoResultsError` if the Task does not exist.

  ## Examples

      iex> get_task!(123)
      %Task{}

      iex> get_task!(456)
      ** (Ecto.NoResultsError)

  """
  def get_task!(id), do: Repo.get!(Task, id)

  def some_action(conn, params) do
    if Guardian.Plug.authenticated?(conn) do
      user = Guardian.Plug.current_resource(conn)
    end
  end

  @doc """
  Creates a task.

  ## Examples

      iex> add_task(%{field: value}, user)
      {:ok, %Task{}}

      iex> add_task(%{field: bad_value}, user)
      {:error, %Ecto.Changeset{}}

  """
  def add_task(task_params, user) do
    endTime = NaiveDateTime.from_iso8601(task_params["endTime"])
    startTime = NaiveDateTime.from_iso8601(task_params["startTime"])

    endTimeTruncated = NaiveDateTime.truncate(elem(endTime, 1), :second)
    startTimeTruncated = NaiveDateTime.truncate(elem(startTime, 1), :second)


    %Task{
      description: task_params["description"],
      end_time: endTimeTruncated,
      start_time: startTimeTruncated,
      employee_name: user.email,
      status: task_params["status"],
      task_name: task_params["taskName"],
      task_type: task_params["taskType"]
    }
    |> Repo.insert()
    
    {:ok}
  end

  @doc """
  Updates a task.

  ## Examples

      iex> update_task(task, %{field: new_value})
      {:ok, %Task{}}

      iex> update_task(task, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_task(%Task{} = task, task_params) do
    endTime = NaiveDateTime.from_iso8601(task_params["endTime"])
    startTime = NaiveDateTime.from_iso8601(task_params["startTime"])
    endTimeTruncated = NaiveDateTime.truncate(elem(endTime, 1), :second)
    startTimeTruncated = NaiveDateTime.truncate(elem(startTime, 1), :second)

    task
    |> Task.changeset(%{task_name: task_params["taskName"], task_type: task_params["taskType"], status: task_params["status"], description: task_params["description"], start_time: startTimeTruncated, end_time: endTimeTruncated})
    |> Repo.update()

    {:ok}
  end

  @doc """
  Deletes a task.

  ## Examples

      iex> delete_task(task)
      {:ok, %Task{}}

      iex> delete_task(task)
      {:error, %Ecto.Changeset{}}

  """
  def delete_task(%Task{} = task) do
    Repo.delete(task)
    {:ok}
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking task changes.

  ## Examples

      iex> change_task(task)
      %Ecto.Changeset{data: %Task{}}

  """
  def change_task(%Task{} = task, attrs \\ %{}) do
    Task.changeset(task, attrs)
  end
end
