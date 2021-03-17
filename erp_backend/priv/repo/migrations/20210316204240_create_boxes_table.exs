defmodule Erp.Repo.Migrations.CreateBoxesTable do
  use Ecto.Migration

  def change do
    create table(:boxes) do
      add :plant_id, references(:plants, column: :plant_id, on_delete: :nothing)
      add :small, :integer
      add :medium, :integer
      add :large, :integer
      add :xlarge, :integer
    end
    create index(:boxes, [:plant_id])
  end
end
