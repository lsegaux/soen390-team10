defmodule Erp.Repo.Migrations.CreateMaterials do
  use Ecto.Migration

  def change do
    create table(:materials) do
      add :material_id, :integer
      add :name, :string
      add :quantity, :integer
      add :plant_id, references(:plants, on_delete: :nothing)

      timestamps()
    end

    create unique_index(:materials, [:material_id])
    create index(:materials, [:plant_id])
  end
end
