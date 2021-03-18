defmodule Erp.Repo.Migrations.CreateVendorclaim do
  use Ecto.Migration

  def change do
    create table(:vendorclaim) do
      add :name, :string
      add :orderid, :integer
      add :defecttype, :string
      add :description, :string
      add :comments, :string
      add :status, :string
      add :vendorrequest, :string
      add :requeststatus, :string

      timestamps()
    end

  end
end
