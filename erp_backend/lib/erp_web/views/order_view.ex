defmodule ErpWeb.OrderView do

  use ErpWeb, :view
  alias ErpWeb.OrderView

  def render("index.json", %{orders: orders}) do
    %{data: render_many(orders, OrderView, "order.json")}
  end

  def render("order.json", %{order: order}) do
    %{
      price: order.price,
      time: order.time,
      bikesAmount: order.bikesAmount,
      userEmail: order.userEmail,
      status: order.status,
      id: order.id}
  end

  def render("show.json", %{order: order}) do
    %{data: render_one(order, OrderView, "order.json")}
  end

end
