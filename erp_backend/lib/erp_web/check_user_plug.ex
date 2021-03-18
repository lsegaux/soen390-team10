defmodule ErpWeb.Plugs.BlockClients do
@moduledoc """
A module that facilitates blocking clients from restricted pages.
"""
  import Plug.Conn

  @doc false
  def init(default), do: default

  @doc """
  Create a new client claim.
  """
  def call(conn, _) do
    user = Guardian.Plug.current_resource(conn)
    if user.role == "Client" do
      send_resp(conn, 500, "Clients not allowed on this page.")
      conn |> halt()
    else
      conn
    end
  end
end
