defmodule Erp.Repo do
@moduledoc false
  use Ecto.Repo,
    otp_app: :erp,
    adapter: Ecto.Adapters.Postgres

  @doc false
  def init(_,config) do
    config = config
    {:ok,config}
  end
end


