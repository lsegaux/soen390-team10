defmodule ErpWeb.SaleController do
  use ErpWeb, :controller

  def process_sale(conn,  %{"sale" => sale_params}) do
    case Erp.Sale.add_sale(sale_params) do
      {:ok} ->
        json(conn, %{success: ":)"})
      {:error, error} ->
        {:error, error}
    end
  end
end
