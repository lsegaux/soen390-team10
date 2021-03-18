defmodule Erp.AuthErrorHandler do
  import Plug.Conn

  def auth_error(conn, {type, _reason}, _opts) do
    body = Jason.encode!(%{error: to_string(type)})
    send_resp(conn, 401, body)
  end

  def is_employee(conn) do
    user = Guardian.Plug.current_resource(conn)
    user.role == "Employee"
  end

  def is_client(conn) do
    user = Guardian.Plug.current_resource(conn)
    user.role == "Client"
  end

end
