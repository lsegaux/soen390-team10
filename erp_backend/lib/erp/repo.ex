defmodule Erp.Repo do
  use Ecto.Repo,
    otp_app: :erp,
    adapter: Ecto.Adapters.Postgres
end
