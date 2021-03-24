defmodule ErpWeb.ClientClaimController do
@moduledoc """
A module for managing client claims on defective products.
"""
  use ErpWeb, :controller

  alias Erp.QualityManagement
  alias Erp.QualityManagement.ClientClaim

  @doc false
  def index(conn, _params) do
    clientclaim = QualityManagement.list_clientclaim()
    render(conn, "index.html", clientclaim: clientclaim)
  end

  @doc false
  def new(conn, _params) do
    changeset = QualityManagement.change_client_claim(%ClientClaim{})
    render(conn, "new.html", changeset: changeset)
  end

  @doc """
  Create a new client claim.
  """
  def create(conn, %{"client_claim" => client_claim_params}) do
    user = Guardian.Plug.current_resource(conn)

    temp = Map.put(client_claim_params, "name" , user.email)
    
    case QualityManagement.create_client_claim(temp) do
      {:ok, client_claim} ->
        conn
        |> redirect(to: Routes.client_claim_path(conn, :show, client_claim))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  @doc """
  Show a singular client claim (get by ID).
  """
  def show(conn, %{"id" => id}) do
    client_claim = QualityManagement.get_client_claim!(id)
    render(conn, "show.json", client_claim: client_claim)
  end

  @doc """
  Get a list of all client claims.
  """
  def show_all_client_claim(conn, _params) do
    clientclaim = QualityManagement.list_clientclaim()
    render(conn, "index.json", clientclaim: clientclaim)
  end

  @doc """
  Edit a singular client claim (update by ID)
  """
  def edit(conn, %{"id" => id}) do
    client_claim = QualityManagement.get_client_claim!(id)
    changeset = QualityManagement.change_client_claim(client_claim)
    render(conn, "clientclaim.json", client_claim: client_claim, changeset: changeset)
  end

  @doc """
  Update a singular client claim (update by ID)
  """
  def update(conn, %{"id" => id, "client_claim" => client_claim_params}) do
    client_claim = QualityManagement.get_client_claim!(id)

    case QualityManagement.update_client_claim(client_claim, client_claim_params) do
      {:ok, client_claim} ->
        conn
        |> redirect(to: Routes.client_claim_path(conn, :show, client_claim))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", client_claim: client_claim, changeset: changeset)
    end
  end

  @doc """
  Delete a singular client claim (delete by ID)
  """
  def delete(conn, %{"id" => id}) do
    client_claim = QualityManagement.get_client_claim!(id)
    {:ok, _client_claim} = QualityManagement.delete_client_claim(client_claim)

    conn
    |> put_flash(:info, "Client claim deleted successfully.")
    |> redirect(to: Routes.client_claim_path(conn, :index))
  end
end
