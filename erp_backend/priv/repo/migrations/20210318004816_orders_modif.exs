defmodule Erp.Repo.Migrations.OrdersModif do
  use Ecto.Migration

  def change do
    alter table(:orders) do
      add :status, :integer # 0 is created, 1 is packaged, 2 is shipped and 3 is delivered
    end
    alter table(:materialsexpenses) do
      add :company, :string
    end
  end
end
