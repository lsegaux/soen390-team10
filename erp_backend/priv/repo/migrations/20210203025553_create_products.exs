defmodule Erp.Repo.Migrations.CreateProducts do
  use Ecto.Migration

  def change do
    create table(:products) do
      add :name, :string
      add :product_id, :integer
      add :quantity, :integer
      add :start_time, :naive_datetime
      add :plant_id, references(:plants, on_delete: :nothing)

      timestamps()
    end

    create unique_index(:products, [:product_id])
    create index(:products, [:plant_id])
  end
end
