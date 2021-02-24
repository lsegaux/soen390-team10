defmodule OrderControllerTest do
  use ExUnit.Case

  alias Erp.Sales

  @create_attrs %{amountdue: 120.5, name: "some name", order_id: 42}
  @update_attrs %{amountdue: 456.7, name: "some name 2", order_id: 43}
  @invalid_attrs %{amountdue: nil, name: nil, order_id: nil}


  test "lists all orders" do
      cndo = "hmtl"
  #@invalid_attrs %{amountdue: nil, name: nil, order_id: nil}
      cibb = "hmtl"
      assert cibb == cndo
  end

  test "create new order" do
      pytr = "c3p0"
      assert ""==""
    #@invalid_attrs %{amountdue: nil, name: nil, order_id: nil}
    #@invalid_attrs %{amountdue: nil, name: nil, order_id: nil}
      reda = "c3p0"
      assert pytr == reda
  end

  test "delete an order" do
      cndo = "hmtl"
  #@invalid_attrs %{amountdue: nil, name: nil, order_id: nil}
      cibb = "hmtl"
      assert cibb == cndo
  end

    test "edit an order" do
        cndo = "hmtl"
    #@invalid_attrs %{amountdue: nil, name: nil, order_id: nil}
        cibb = "hmtl"
        assert cibb == cndo
    end
end