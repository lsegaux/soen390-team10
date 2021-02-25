defmodule Erp.Repo.Migrations.ChangeParts do
  use Ecto.Migration

  def change do
    alter table(:parts) do
      add :material, :string
      add :price, :integer
    end
  end
end
