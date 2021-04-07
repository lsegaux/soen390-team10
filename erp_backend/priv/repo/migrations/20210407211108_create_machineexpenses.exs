defmodule Erp.Repo.Migrations.CreateMachineexpenses do
  use Ecto.Migration

  def change do
    create table(:machineexpenses) do
      add :amount, :float
      add :processed, :boolean, default: false, null: false
      add :job, :string

      timestamps()
    end

  end
end
