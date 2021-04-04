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

  @doc false
  def add_task(params, user) do
    endTime = NaiveDateTime.from_iso8601(params["endTime"])
    startTime = NaiveDateTime.from_iso8601(params["startTime"])

    endTimeTruncated = NaiveDateTime.truncate(elem(endTime, 1), :second)
    startTimeTruncated = NaiveDateTime.truncate(elem(startTime, 1), :second)


    %Task{
      description: params["description"],
      end_time: endTimeTruncated,
      start_time: startTimeTruncated,
      employee_name: user.email,
      status: params["status"],
      task_name: params["taskName"],
      task_type: params["taskType"]
    }
    |> Repo.insert()
    
    {:ok}
  end


  @doc """
  Creates a task.

  ## Examples

      iex> create_task(%{field: value})
      {:ok, %Task{}}

      iex> create_task(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_task(attrs \\ %{}) do
    %Task{}
    |> Task.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a task.

  ## Examples

      iex> update_task(task, %{field: new_value})
      {:ok, %Task{}}

      iex> update_task(task, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_task(%Task{} = task, attrs) do
    task
    |> Task.changeset(attrs)
    |> Repo.update()
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
