defmodule Erp.Repo.Migrations.ChangeOrdersTable do
  use Ecto.Migration

  def change do
    alter table(:orders) do

    timestamps()
    end

  create unique_index(:orders, [:orderId])
  end
end
