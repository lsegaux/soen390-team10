defmodule Erp.Repo.Migrations.CreatePackagesTable do
  use Ecto.Migration

  def change do
    create table(:packages) do
      add :order_id, references(:orders, column: :id, on_delete: :nothing)
      add :user_email, references(:users, column: :email, type: :string, on_delete: :nothing)
      add :weight, :float
      add :shipped, :boolean
    timestamps()
    end

    create index(:packages, [:order_id])
  end
end
