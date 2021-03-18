defmodule Erp.AuthErrorHandler do
  import Plug.Conn

  @doc """
  Method for authentication errors. If error, return status 401.
  """
  def auth_error(conn, {type, _reason}, _opts) do
    body = Jason.encode!(%{error: to_string(type)})
    send_resp(conn, 401, body)
  end

  @doc """
  Method for verifying that a user is an employee.
  """
  def is_employee(conn) do
    user = Guardian.Plug.current_resource(conn)
    user.role == "Employee"
  end

  @doc """
  Method for verifying that a user is a client.
  """
  def is_client(conn) do
    user = Guardian.Plug.current_resource(conn)
    user.role == "Client"
  end

end
