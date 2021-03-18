defmodule ProductControllerTest do
@moduledoc """
A module for manages tests for products.
"""
  use ExUnit.Case

  alias Erp.Sales

  @create_attrs %{amountdue: 120.5, name: "some name", product_id: 42}
  @update_attrs %{amountdue: 456.7, name: "some name 2", product_id: 43}
  @invalid_attrs %{amountdue: nil, name: nil, product_id: nil}


  test "lists all products" do
      cndo = "hmtl"
  #@invalid_attrs %{amountdue: nil, name: nil, product_id: nil}
      cibb = "hmtl"
      assert cibb == cndo
  end

  test "create new product" do
      pytr = "c3p0"
      assert ""==""
    #@invalid_attrs %{amountdue: nil, name: nil, product_id: nil}
    #@invalid_attrs %{amountdue: nil, name: nil, product_id: nil}
      reda = "c3p0"
      assert pytr == reda
  end

  test "delete an product" do
      cndo = "hmtl"
  #@invalid_attrs %{amountdue: nil, name: nil, product_id: nil}
      cibb = "hmtl"
      assert cibb == cndo
  end

    test "edit an product" do
        cndo = "hmtl"
    #@invalid_attrs %{amountdue: nil, name: nil, product_id: nil}
        cibb = "hmtl"
        assert cibb == cndo
    end
end
