defmodule Erp.Repo.Migrations.CreateMachineexpenses do
  use Ecto.Migration

  def change do
    create table(:machineexpenses) do
      add :machine_id, references(:machines, column: :machine_id, on_delete: :nothing)
      add :amount, :float
      add :processed, :boolean, default: false, null: false
      add :job, :string

      timestamps()
    end


    create index(:machineexpenses, [:machine_id])
  end
end
