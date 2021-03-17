defmodule ErpWeb.SaleController do
  use ErpWeb, :controller

  def process_sale(conn, _params) do
    case Erp.Sale.add_sale() do
      {:ok, data} -> json(conn, %{success: data})
      {:error, error} -> {:error, error}
    end
  end
end
