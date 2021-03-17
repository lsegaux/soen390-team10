defmodule Erp.Repo.Migrations.CreateBoxesTable do
  use Ecto.Migration

  def change do
    create table(:boxes) do
      add :small, :integer
      add :medium, :integer
      add :large, :integer
      add :xlarge, :integer
    end
  end
end
