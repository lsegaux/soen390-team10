defmodule Erp.Planning.Task do
  use Ecto.Schema
  import Ecto.Changeset

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

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:task_name, :task_type, :description, :start_time, :end_time, :employee_name, :status])
    |> validate_required([:task_name, :task_type, :description, :start_time, :end_time, :employee_name, :status])
  end
end
