defmodule ErpWeb.PackagingController do
  use ErpWeb, :controller
  import Ecto.Query, warn: false
  alias Erp.Packaging.Package


  def create_package(conn, %{"package" => package_params}) do
    with {:ok, %Package{} = package} <- Package.create_package(package_params) do
      ErpWeb.BoxController.reduce_quantity(conn, %{"id" => 1})
      conn |> render("package.json", package: package)
    end
  end
end
