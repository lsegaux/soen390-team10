defmodule Erp.Repo.Migrations.CreateMaterials do
  use Ecto.Migration

  def change do
    create table(:materials, primary_key: false) do
      add :material_id, :integer, primary_key: true
      add :name, :string
      add :quantity, :integer
      add :plant_id, references(:plants, column: :plant_id, on_delete: :nothing)
      add :price, :float

      timestamps()
    end

    create unique_index(:materials, [:material_id])
    create index(:materials, [:plant_id])
  end
end
