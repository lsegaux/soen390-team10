defmodule ErpWeb.FallbackController do
  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.
  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use ErpWeb, :controller

  @doc false
  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(ErpWeb.ChangesetView, "error.json", changeset: changeset)
  end

  @doc false
  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> render(ErpWeb.ErrorView, :"404")
  end

  @doc false
  def call(conn, {:error, :unauthorized}) do
    conn
    |> put_status(:unauthorized)
    |> json(%{error: "Login error"})
  end

  @doc false
  def call(conn, {:error, :invalid_captcha}) do
    conn
    |> put_status(:unauthorized)
    |> json(%{error: "Captcha wrong"})
  end
end
