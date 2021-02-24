defmodule OrderControllerTest do
  use ExUnit.Case

  alias Erp.Sales

  @create_attrs %{amountdue: 120.5, name: "some name", order_id: 42}
  @update_attrs %{amountdue: 456.7, name: "some name", order_id: 43}
  @invalid_attrs %{amountdue: nil, name: nil, order_id: nil}


  test "lists all orders" do
      #conn = get(conn, Routes.order_path(conn, :index))
      #assert html_response(conn, 200) =~ "Listing order"
  end
  test "create new order" do
      #conn = get(conn, Routes.order_path(conn, :index))
      #assert html_response(conn, 200) =~ "Listing order"
  end
  test "edit an order" do
      #conn = get(conn, Routes.order_path(conn, :index))
      #assert html_response(conn, 200) =~ "Listing order"
  end
  test "delete an order" do
      #conn = get(conn, Routes.order_path(conn, :index))
      #assert html_response(conn, 200) =~ "Listing order"
  end
end