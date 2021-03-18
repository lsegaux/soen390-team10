defmodule ErpWeb.BoxController do
  @moduledoc """
  This is the Box Controller module. It is used to manipulate and access the data
  about the boxes used for shipping bikes
  """

  use ErpWeb, :controller
  import Ecto.Query, warn: false
  alias Erp.Packaging.Box

  @doc false
  def show(conn, _params) do
    package = Guardian.Plug.current_resource(conn)
    conn |> render("package.json", package: package)
  end

  @doc """
  Reduce number of boxes in inventory
  """
  def reduce_quantity(conn, %{"id" => id, "order_id" => order_id}) do
    box = Box.get_boxes!(id + 1)
    orderQty = Erp.Sales.Order.get_order!(order_id).bikesAmount
    small = box.small
    medium = box.medium
    large = box.large
    xlarge = box.xlarge

    with {:ok, %Box{} = box} <- Box.reduce_quantity(box, small - orderQty * 1, medium - orderQty * 2, large - orderQty * 2, xlarge - orderQty * 1) do
      render(conn, "box.json", box: box)
    end
  end

  @doc """
  Get number of boxes in inventory by plant id
  """
  def get_boxes_by_plant(conn, %{"id" => id}) do
    intId = String.to_integer(id) + 1
    box = Box.get_boxes!(intId)
    render(conn, "boxes.json", box: box)
  end

  @doc """
  Order boxes
  """
  def order_boxes(conn, %{"id" => id, "smallOrder" => smallOrder, "mediumOrder" => mediumOrder, "largeOrder" => largeOrder, "xlargeOrder" => xlargeOrder }) do
    box = Box.get_boxes!(id + 1)
    small = box.small
    medium = box.medium
    large = box.large
    xlarge = box.xlarge

    newSmall = small + smallOrder
    newMedium = medium + mediumOrder
    newLarge = large + largeOrder
    newXLarge = xlarge + xlargeOrder
    with {:ok, %Box{} = box} <- Box.increase_quantity(box, id + 1,newSmall, newMedium, newLarge, newXLarge) do
      render(conn, "boxes.json", box: box)
    end
  end
end
