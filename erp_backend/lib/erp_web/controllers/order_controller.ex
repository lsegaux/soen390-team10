defmodule ErpWeb.OrderController do
@moduledoc """
A module that acts as the controller for managing orders (customer transactions).
"""
  use ErpWeb, :controller
  import Ecto.Query, warn: false

  alias Erp.Repo

  alias Erp.Sales
  alias Erp.Sales.Order

  @doc false
  def show(conn, %{"id" => orderId}) do
    order = Erp.Sales.Order.get_order!(orderId)
    render(conn, "show.json", order: order)
  end

    @doc """
    Show a list of all orders.
    """
  def show_all_orders(conn, _params) do
    orders = Erp.Sales.Order.list_orders()
    render(conn, "index.json", orders: orders)
  end
end
