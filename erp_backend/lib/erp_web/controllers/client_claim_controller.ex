defmodule ErpWeb.ClientClaimController do
  use ErpWeb, :controller

  alias Erp.QualityManagement
  alias Erp.QualityManagement.ClientClaim

  def index(conn, _params) do
    clientclaim = QualityManagement.list_clientclaim()
    render(conn, "index.html", clientclaim: clientclaim)
  end

  def new(conn, _params) do
    changeset = QualityManagement.change_client_claim(%ClientClaim{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"client_claim" => client_claim_params}) do
    case QualityManagement.create_client_claim(client_claim_params) do
      {:ok, client_claim} ->
        conn
        |> put_flash(:info, "Client claim created successfully.")
        |> redirect(to: Routes.client_claim_path(conn, :show, client_claim))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    client_claim = QualityManagement.get_client_claim!(id)
    render(conn, "show.html", client_claim: client_claim)
  end

  def show_all_client_claim(conn, _params) do
    clientclaim = QualityManagement.list_clientclaim()
    render(conn, "index.json", clientclaim: clientclaim)
  end

  def edit(conn, %{"id" => id}) do
    client_claim = QualityManagement.get_client_claim!(id)
    changeset = QualityManagement.change_client_claim(client_claim)
    render(conn, "index.json", client_claim: client_claim, changeset: changeset)
  end

  def update(conn, %{"id" => id, "client_claim" => client_claim_params}) do
    client_claim = QualityManagement.get_client_claim!(id)

    case QualityManagement.update_client_claim(client_claim, client_claim_params) do
      {:ok, client_claim} ->
        conn
        |> put_flash(:info, "Client claim updated successfully.")
        |> redirect(to: Routes.client_claim_path(conn, :show, client_claim))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", client_claim: client_claim, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    client_claim = QualityManagement.get_client_claim!(id)
    {:ok, _client_claim} = QualityManagement.delete_client_claim(client_claim)

    conn
    |> put_flash(:info, "Client claim deleted successfully.")
    |> redirect(to: Routes.client_claim_path(conn, :index))
  end
end
