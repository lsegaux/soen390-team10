defmodule ErpWeb.OrderController do
@moduledoc """
A module that acts as the controller for managing orders (customer transactions).
"""
  use ErpWeb, :controller
  import Ecto.Query, warn: false
  import Guardian.Plug

  @doc false
  def show(conn, %{"id" => id}) do
    {int, _rem} = Integer.parse(id)
    order = Erp.Sales.Order.get_order!(int)
    user = Guardian.Plug.current_resource(conn)
    if order.userEmail == user.email do 
      render(conn, "show.json", order: order)
    else 
      send_resp(conn, 404, "not found")
    end
  end

  @doc """
  Show a list of all orders.
  """
  def show_all_orders(conn, _params) do
    orders = Erp.Sales.Order.list_orders()
    render(conn, "index.json", orders: orders)
  end
end
