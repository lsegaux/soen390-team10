defmodule Erp.Repo.Migrations.CreatePlants do
  use Ecto.Migration

  def change do
    create table(:plants, primary_key: false) do
      add :plant_id, :integer, primary_key: true
      add :name, :string

      timestamps()
    end

    create unique_index(:plants, [:plant_id])
  end
end
