defmodule Erp.Repo.Migrations.CreateMaterialsexpenses do
  use Ecto.Migration

  def change do
    create table(:materialsexpenses) do
      add :amount, :float
      add :processed, :boolean
      timestamps()
    end

  end
end
