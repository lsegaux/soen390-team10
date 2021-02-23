defmodule Erp.Repo.Migrations.CreateProducts do
  use Ecto.Migration

  def change do
    create table(:products, primary_key: false) do
      add :name, :string
      add :product_id, :integer, primary_key: true
      add :quantity, :integer
      add :start_time, :naive_datetime
      add :plant_id, references(:plants, column: :plant_id, on_delete: :nothing)

      timestamps()
    end

    create unique_index(:products, [:product_id])
    create index(:products, [:plant_id])
  end
end
