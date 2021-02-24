defmodule Erp.Repo.Migrations.CreateOrders do
  use Ecto.Migration

  def change do
    create table(:orders) do
      add :orderId, :id
      add :price, :integer
      add :userEmail, references(:users, column: :email, type: :string, on_delete: :nothing)
      add :time, :naive_datetime
      add :bikesAmount, :integer
    timestamps()
    end

  create unique_index(:orders, [:orderId])
  end
end
