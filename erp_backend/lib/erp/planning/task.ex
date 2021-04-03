defmodule Erp.Planning.Task do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, warn: false

  alias Erp.Repo
  alias Erp.Planning.Task

  schema "tasks" do
    field :description, :string
    field :employee_name, :string
    field :end_time, :naive_datetime
    field :start_time, :naive_datetime
    field :status, :boolean, default: false
    field :task_name, :string
    field :task_type, :string

    timestamps()
  end

  def list_tasks() do
    Repo.all(Task)
  end

  def some_action(conn, params) do
    if Guardian.Plug.authenticated?(conn) do
      user = Guardian.Plug.current_resource(conn)
    end
  end

  @doc false
  def add_task(params, user) do
    endTime = NaiveDateTime.from_iso8601(params["endTime"])
    startTime = NaiveDateTime.from_iso8601(params["startTime"])

    endTimeTruncated = NaiveDateTime.truncate(elem(startTime, 1), :second)
    startTimeTruncated = NaiveDateTime.truncate(elem(endTime, 1), :second)



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

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:task_name, :task_type, :description, :start_time, :end_time, :employee_name, :status])
    |> validate_required([:task_name, :task_type, :description, :start_time, :end_time, :employee_name, :status])
  end
end
