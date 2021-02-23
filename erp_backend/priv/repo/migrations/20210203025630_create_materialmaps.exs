defmodule Erp.Repo.Migrations.CreateMaterialmaps do
  use Ecto.Migration

  def change do
    create table(:materialmaps) do
      add :quantity, :integer
      add :part_id, references(:parts, column: :part_id, on_delete: :nothing)
      add :material_id, references(:materials, column: :material_id, on_delete: :nothing)

      timestamps()
    end

    create index(:materialmaps, [:part_id])
    create index(:materialmaps, [:material_id])
  end
end
