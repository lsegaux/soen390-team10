defmodule Erp.Repo.Migrations.UpdateUser do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :captcha_response, :string
    end
  end
end
