defmodule Erp.Repo.Migrations.CreateParts do
  use Ecto.Migration

  def change do
    create table(:parts, primary_key: false) do
      add :part_id, :integer, primary_key: true
      add :name, :string
      add :quantity, :integer
      add :build_time, :time
      add :plant_id, references(:plants, column: :plant_id, on_delete: :nothing)

      timestamps()
    end

    create unique_index(:parts, [:part_id])
    create index(:parts, [:plant_id])
  end
end
