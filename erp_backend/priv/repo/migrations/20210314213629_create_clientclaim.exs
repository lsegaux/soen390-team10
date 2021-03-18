defmodule Erp.Repo.Migrations.CreateClientclaim do
  use Ecto.Migration

  def change do
    create table(:clientclaim) do
      add :name, :string
      add :orderid, :integer
      add :defecttype, :string
      add :description, :string
      add :comments, :string
      add :status, :string
      add :clientrequest, :string
      add :requeststatus, :string

      timestamps()
    end

  end
end
