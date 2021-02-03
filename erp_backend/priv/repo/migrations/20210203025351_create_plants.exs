defmodule Erp.Repo.Migrations.CreatePlants do
  use Ecto.Migration

  def change do
    create table(:plants) do
      add :name, :string
      add :plant_id, :integer

      timestamps()
    end

    create unique_index(:plants, [:plant_id])
  end
end
