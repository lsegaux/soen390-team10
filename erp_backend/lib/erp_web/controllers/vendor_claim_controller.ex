defmodule ErpWeb.VendorClaimController do
  use ErpWeb, :controller

  alias Erp.QualityManagement
  alias Erp.QualityManagement.VendorClaim

  def index(conn, _params) do
    vendorclaim = QualityManagement.list_vendorclaim()
    render(conn, "index.html", vendorclaim: vendorclaim)
  end

  def new(conn, _params) do
    changeset = QualityManagement.change_vendor_claim(%VendorClaim{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"vendor_claim" => vendor_claim_params}) do
    case QualityManagement.create_vendor_claim(vendor_claim_params) do
      {:ok, vendor_claim} ->
        conn
        |> redirect(to: Routes.vendor_claim_path(conn, :show, vendor_claim))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    vendor_claim = QualityManagement.get_vendor_claim!(id)
    render(conn, "show.json", vendor_claim: vendor_claim)
  end

  def show_all_vendor_claim(conn, _params) do
    vendorclaim = QualityManagement.list_vendorclaim()
    render(conn, "index.json", vendorclaim: vendorclaim)
  end

  def edit(conn, %{"id" => id}) do
    vendor_claim = QualityManagement.get_vendor_claim!(id)
    changeset = QualityManagement.change_vendor_claim(vendor_claim)
    render(conn, "edit.html", vendor_claim: vendor_claim, changeset: changeset)
  end

  def update(conn, %{"id" => id, "vendor_claim" => vendor_claim_params}) do
    vendor_claim = QualityManagement.get_vendor_claim!(id)

    case QualityManagement.update_vendor_claim(vendor_claim, vendor_claim_params) do
      {:ok, vendor_claim} ->
        conn
        |> put_flash(:info, "Vendor claim updated successfully.")
        |> redirect(to: Routes.vendor_claim_path(conn, :show, vendor_claim))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", vendor_claim: vendor_claim, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    vendor_claim = QualityManagement.get_vendor_claim!(id)
    {:ok, _vendor_claim} = QualityManagement.delete_vendor_claim(vendor_claim)

    conn
    |> put_flash(:info, "Vendor claim deleted successfully.")
    |> redirect(to: Routes.vendor_claim_path(conn, :index))
  end
end
