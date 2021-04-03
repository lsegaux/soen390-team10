defmodule Erp.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :task_name, :string
      add :task_type, :string
      add :description, :string
      add :start_time, :naive_datetime
      add :end_time, :naive_datetime
      add :employee_name, :string
      add :status, :boolean, default: false, null: false

      timestamps()
    end

  end
end
