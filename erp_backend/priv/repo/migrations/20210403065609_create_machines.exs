defmodule Erp.Repo.Migrations.CreateMachines do
  use Ecto.Migration

  def change do
    create table(:machines, primary_key: false) do
      add :machine_id, :integer, primary_key: true
      add :plant_id, references(:plants, column: :plant_id, on_delete: :nothing)
      add :job, :string
      add :status, :string
      add :start_time, :time
      add :end_time, :time
      add :cost_per_hour, :float
      add :production_per_hour, :integer

      timestamps()
    end

    create unique_index(:machines, [:machine_id])
    create index(:machines, [:plant_id])
  end
end
