defmodule OrderControllerTest do
@moduledoc """
A module for manages tests for the system orders (transactions).
"""
  use ErpWeb.ConnCase

  alias Erp.Accounting

  @create_attrs %{amountowed: 120.5, orders_id: "some orders_id", name: "some name"}
  @update_attrs %{amountowed: 456.7, orders_id: "some updated orders_id", name: "some updated name"}
  @invalid_attrs %{amountowed: nil, orders_id: nil, name: nil}

  def fixture(:orders) do
    {:ok, orders} = Accounting.create_orders(@create_attrs)
    orders
  end

  describe "index" do
    test "lists all orders" do
    end
  end

  describe "new orders" do
    test "renders form" do

    end
  end

  describe "create orders" do
    test "redirects to show when data is valid" do
    end

    test "renders errors when data is invalid" do
    #  conn = post(conn, Routes.orders_path(conn, :create), orders: @invalid_attrs)
    #  assert html_response(conn, 200) =~ "New orders"
    end
  end

  describe "edit orders" do
   # setup [:create_orders]

    test "renders form for editing chosen orders" do
   #   conn = get(conn, Routes.orders_path(conn, :edit, orders))
   #   assert html_response(conn, 200) =~ "Edit orders"
    end
  end

  describe "update orders" do
    #setup [:create_orders]

    test "redirects when data is valid" do
    #  conn = put(conn, Routes.orders_path(conn, :update, orders), orders: @update_attrs)
    #  assert redirected_to(conn) == Routes.orders_path(conn, :show, orders)

    #  conn = get(conn, Routes.orders_path(conn, :show, orders))
   #   assert html_response(conn, 200) =~ "some updated orders_id"
    end

    test "renders errors when data is invalid" do
    #  conn = put(conn, Routes.orders_path(conn, :update, orders), orders: @invalid_attrs)
    #  assert html_response(conn, 200) =~ "Edit orders"
    end
  end

  describe "delete orders" do
   # setup [:create_orders]

   # test "deletes chosen orders", %{conn: conn, orders: orders} do
   #   conn = delete(conn, Routes.orders_path(conn, :delete, orders))
   #   assert redirected_to(conn) == Routes.orders_path(conn, :index)
   #   assert_error_sent 404, fn ->
   #     get(conn, Routes.orders_path(conn, :show, orders))
   #   end
   # end
  end

  defp create_orders(_) do
    orders = fixture(:orders)
    %{orders: orders}
  end
end
