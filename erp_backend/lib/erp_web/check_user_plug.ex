defmodule ErpWeb.Plugs.BlockClients do
  import Plug.Conn

  def init(default), do: default

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
