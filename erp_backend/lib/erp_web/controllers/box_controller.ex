defmodule ErpWeb.BoxController do
  use ErpWeb, :controller
  import Ecto.Query, warn: false
  alias Erp.Packaging.Box

  def show(conn, _params) do
    package = Guardian.Plug.current_resource(conn)
    conn |> render("package.json", package: package)
  end

  def reduce_quantity(conn, %{"id" => id}) do
    box = Box.get_box!(id)
    small = box.small
    medium = box.medium
    large = box.large
    xlarge = box.xlarge
    with {:ok, %Box{} = box} <- Box.reduce_quantity(box, small - 1, medium - 2, large - 2, xlarge - 1) do
      render(conn, "box.json", box: box)
    end
  end

  def order_boxes(conn, %{"id" => id, "smallOrder" => smallOrder, "mediumOrder" => mediumOrder, "largeOrder" => largeOrder, "xlargeOrder" => xlargeOrder }) do
    box = Box.get_box!(id)
    small = box.small
    medium = box.medium
    large = box.large
    xlarge = box.xlarge

    newSmall = small + smallOrder
    newMedium = medium + mediumOrder
    newLarge = large + largeOrder
    newXLarge = xlarge + xlargeOrder

    totalPrice = smallOrder * 0.75 + mediumOrder * 1 + largeOrder * 1.10 + xlargeOrder * 1.25

    with {:ok, %Box{} = box} <- Box.increase_quantity(box, newSmall, newMedium, newLarge, newXLarge) do
      render(conn, "box.json", box: box)
    end
  end
end
