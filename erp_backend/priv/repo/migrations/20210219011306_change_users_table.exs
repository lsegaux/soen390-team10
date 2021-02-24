defmodule Erp.Repo.Migrations.ChangeUsersTable do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :first_name, :string
      add :last_name, :string
      add :role, :string
      remove :is_admin
      remove :name
    end
  end
end
