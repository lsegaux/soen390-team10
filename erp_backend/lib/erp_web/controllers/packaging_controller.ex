defmodule ErpWeb.PackagingController do
  use ErpWeb, :controller
  import Ecto.Query, warn: false
  alias Erp.Packaging.Package


  def create_package(conn, %{"package" => package_params}) do
    order = Erp.Sales.Order.get_order!(Map.get(package_params, "order_id"))
    with {:ok, %Package{} = package} <- Package.create_package(Map.put(package_params, "user_email", order.userEmail)) do
      order_id = package.order_id
      plant_id = package.plant_id
      ErpWeb.BoxController.reduce_quantity(conn, %{"id" => plant_id, "order_id" => order_id})
    end
  end
end
