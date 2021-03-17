defmodule ErpWeb.PackagingController do
  use ErpWeb, :controller
  import Ecto.Query, warn: false
  alias Erp.Packaging.Package


  def create_package(conn, %{"package" => package_params}) do
    with {:ok, %Package{} = package} <- Package.create_package(package_params) do
      order_id = package.order_id
      plant_id = package.plant_id
      ErpWeb.BoxController.reduce_quantity(conn, %{"id" => plant_id, "order_id" => order_id})
    end
  end
end
