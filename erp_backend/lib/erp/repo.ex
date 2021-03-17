defmodule Erp.Repo do
  use Ecto.Repo,
    otp_app: :erp,
    adapter: Ecto.Adapters.Postgres

  def init(_,config) do
    config = config
    {:ok,config}
  end
end


