defmodule ErpWeb.VendorClaimControllerTest do
@moduledoc """
A module for manages tests for vendor claims.
"""
  use ErpWeb.ConnCase

  alias Erp.QualityManagement

  @create_attrs %{comments: "some comments", defecttype: "some defecttype", description: "some description", name: "some name", orderid: 42, requeststatus: "some requeststatus", status: "some status", vendorrequest: "some vendorrequest"}
  @update_attrs %{comments: "some updated comments", defecttype: "some updated defecttype", description: "some updated description", name: "some updated name", orderid: 43, requeststatus: "some updated requeststatus", status: "some updated status", vendorrequest: "some updated vendorrequest"}
  @invalid_attrs %{comments: nil, defecttype: nil, description: nil, name: nil, orderid: nil, requeststatus: nil, status: nil, vendorrequest: nil}

  def fixture(:vendor_claim) do
    {:ok, vendor_claim} = QualityManagement.create_vendor_claim(@create_attrs)
    vendor_claim
  end

  describe "index" do
    test "lists all vendorclaim", %{conn: conn} do
      conn = get(conn, Routes.vendor_claim_path(conn, :index))
      assert html_response(conn, 200) =~ "Listing Vendorclaim"
    end
  end

  describe "new vendor_claim" do
    test "renders form", %{conn: conn} do
      conn = get(conn, Routes.vendor_claim_path(conn, :new))
      assert html_response(conn, 200) =~ "New Vendor claim"
    end
  end

  describe "create vendor_claim" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, Routes.vendor_claim_path(conn, :create), vendor_claim: @create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == Routes.vendor_claim_path(conn, :show, id)

      conn = get(conn, Routes.vendor_claim_path(conn, :show, id))
      assert html_response(conn, 200) =~ "Show Vendor claim"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.vendor_claim_path(conn, :create), vendor_claim: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Vendor claim"
    end
  end

  describe "edit vendor_claim" do
    setup [:create_vendor_claim]

    test "renders form for editing chosen vendor_claim", %{conn: conn, vendor_claim: vendor_claim} do
      conn = get(conn, Routes.vendor_claim_path(conn, :edit, vendor_claim))
      assert html_response(conn, 200) =~ "Edit Vendor claim"
    end
  end

  describe "update vendor_claim" do
    setup [:create_vendor_claim]

    test "redirects when data is valid", %{conn: conn, vendor_claim: vendor_claim} do
      conn = put(conn, Routes.vendor_claim_path(conn, :update, vendor_claim), vendor_claim: @update_attrs)
      assert redirected_to(conn) == Routes.vendor_claim_path(conn, :show, vendor_claim)

      conn = get(conn, Routes.vendor_claim_path(conn, :show, vendor_claim))
      assert html_response(conn, 200) =~ "some updated comments"
    end

    test "renders errors when data is invalid", %{conn: conn, vendor_claim: vendor_claim} do
      conn = put(conn, Routes.vendor_claim_path(conn, :update, vendor_claim), vendor_claim: @invalid_attrs)
      assert html_response(conn, 200) =~ "Edit Vendor claim"
    end
  end

  describe "delete vendor_claim" do
    setup [:create_vendor_claim]

    test "deletes chosen vendor_claim", %{conn: conn, vendor_claim: vendor_claim} do
      conn = delete(conn, Routes.vendor_claim_path(conn, :delete, vendor_claim))
      assert redirected_to(conn) == Routes.vendor_claim_path(conn, :index)
      assert_error_sent 404, fn ->
        get(conn, Routes.vendor_claim_path(conn, :show, vendor_claim))
      end
    end
  end

  defp create_vendor_claim(_) do
    vendor_claim = fixture(:vendor_claim)
    %{vendor_claim: vendor_claim}
  end
end
