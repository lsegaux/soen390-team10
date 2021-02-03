defmodule Erp.Repo.Migrations.CreateParts do
  use Ecto.Migration

  def change do
    create table(:parts) do
      add :name, :string
      add :part_id, :integer
      add :quantity, :integer
      add :build_time, :time
      add :plant_id, references(:plants, on_delete: :nothing)

      timestamps()
    end

    create unique_index(:parts, [:part_id])
    create index(:parts, [:plant_id])
  end
end
