defmodule ErpWeb.ClientClaimControllerTest do
  use ErpWeb.ConnCase

  alias Erp.QualityManagement

  @create_attrs %{clientrequest: "some clientrequest", comments: "some comments", defecttype: "some defecttype", description: "some description", name: "some name", orderid: 42, requeststatus: "some requeststatus", status: "some status"}
  @update_attrs %{clientrequest: "some updated clientrequest", comments: "some updated comments", defecttype: "some updated defecttype", description: "some updated description", name: "some updated name", orderid: 43, requeststatus: "some updated requeststatus", status: "some updated status"}
  @invalid_attrs %{clientrequest: nil, comments: nil, defecttype: nil, description: nil, name: nil, orderid: nil, requeststatus: nil, status: nil}

  def fixture(:client_claim) do
    {:ok, client_claim} = QualityManagement.create_client_claim(@create_attrs)
    client_claim
  end

  describe "index" do
    test "lists all clientclaim", %{conn: conn} do
      conn = get(conn, Routes.client_claim_path(conn, :index))
      assert html_response(conn, 200) =~ "Listing Clientclaim"
    end
  end

  describe "new client_claim" do
    test "renders form", %{conn: conn} do
      conn = get(conn, Routes.client_claim_path(conn, :new))
      assert html_response(conn, 200) =~ "New Client claim"
    end
  end

  describe "create client_claim" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, Routes.client_claim_path(conn, :create), client_claim: @create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == Routes.client_claim_path(conn, :show, id)

      conn = get(conn, Routes.client_claim_path(conn, :show, id))
      assert html_response(conn, 200) =~ "Show Client claim"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.client_claim_path(conn, :create), client_claim: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Client claim"
    end
  end

  describe "edit client_claim" do
    setup [:create_client_claim]

    test "renders form for editing chosen client_claim", %{conn: conn, client_claim: client_claim} do
      conn = get(conn, Routes.client_claim_path(conn, :edit, client_claim))
      assert html_response(conn, 200) =~ "Edit Client claim"
    end
  end

  describe "update client_claim" do
    setup [:create_client_claim]

    test "redirects when data is valid", %{conn: conn, client_claim: client_claim} do
      conn = put(conn, Routes.client_claim_path(conn, :update, client_claim), client_claim: @update_attrs)
      assert redirected_to(conn) == Routes.client_claim_path(conn, :show, client_claim)

      conn = get(conn, Routes.client_claim_path(conn, :show, client_claim))
      assert html_response(conn, 200) =~ "some updated clientrequest"
    end

    test "renders errors when data is invalid", %{conn: conn, client_claim: client_claim} do
      conn = put(conn, Routes.client_claim_path(conn, :update, client_claim), client_claim: @invalid_attrs)
      assert html_response(conn, 200) =~ "Edit Client claim"
    end
  end

  describe "delete client_claim" do
    setup [:create_client_claim]

    test "deletes chosen client_claim", %{conn: conn, client_claim: client_claim} do
      conn = delete(conn, Routes.client_claim_path(conn, :delete, client_claim))
      assert redirected_to(conn) == Routes.client_claim_path(conn, :index)
      assert_error_sent 404, fn ->
        get(conn, Routes.client_claim_path(conn, :show, client_claim))
      end
    end
  end

  defp create_client_claim(_) do
    client_claim = fixture(:client_claim)
    %{client_claim: client_claim}
  end
end
