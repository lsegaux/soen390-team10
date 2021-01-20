defmodule Erm.Repo do
  use Ecto.Repo,
    otp_app: :erm,
    adapter: Ecto.Adapters.Postgres
end
