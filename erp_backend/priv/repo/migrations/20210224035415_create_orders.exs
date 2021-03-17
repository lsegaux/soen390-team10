defmodule Erp.Repo.Migrations.CreateOrders do
  use Ecto.Migration

  def change do
    create table(:orders) do
      add :price, :float
      add :userEmail, references(:users, column: :email, type: :string, on_delete: :nothing)
      add :time, :naive_datetime
      add :bikesAmount, :integer
      add :status, :integer # 0 is created, 1 is packaged, 2 is shipped and 3 is delivered
    timestamps()
    end

  end
end
