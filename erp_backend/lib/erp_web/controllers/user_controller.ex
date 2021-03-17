defmodule ErpWeb.UserController do
@moduledoc """
A module that acts as the controller for primary user actions.
"""
  use ErpWeb, :controller

  alias Erp.Accounts
  alias Erp.Accounts.User

  alias Erp.Guardian

  action_fallback ErpWeb.FallbackController

  @doc """
  Allow a user to sign in.
  """
  def sign_in(conn, %{"email" => email, "password" => password}) do
    case Accounts.token_sign_in(email, password) do
      {:ok, token, _claims} ->
        conn |> render("jwt.json", jwt: token)
      _ ->
        {:error, :unauthorized}
    end
  end

  @doc false
  def index(conn, _params) do
    users = Accounts.list_users()
    render(conn, "index.json", users: users)
  end

  @doc """
  Allow a user to sign up.
  """
  def create(conn, %{"user" => user_params}) do
    IO.inspect(Map.get(user_params, "captcha_response"))
    case GoogleRecaptcha.verify( Map.get(user_params, "captcha_response"), conn.remote_ip) do
      :ok ->
        with {:ok, %User{} = user} <- Accounts.create_user(user_params),
          {:ok, token, _claims} <- Guardian.encode_and_sign(user) do
          conn |> render("jwt.json", jwt: token)
        end
      {:error, :invalid_captcha} -> {:error, :invalid_captcha}
    end
  end

  @doc false
  def show(conn, _params) do
    user = Guardian.Plug.current_resource(conn)
    conn |> render("user.json", user: user)
  end

  @doc """
  Update a user by ID.
  """
  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Accounts.get_user!(id)

    with {:ok, %User{} = user} <- Accounts.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  @doc """
  Delete a user by ID.
  """
  def delete(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    with {:ok, %User{}} <- Accounts.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
