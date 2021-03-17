defmodule ErpWeb.SaleController do
  use ErpWeb, :controller

  def process_sale(conn,  %{"sale" => sale_params}) do
    user = Guardian.Plug.current_resource(conn)
    case Erp.Sale.add_sale(sale_params, user) do
      {:ok} ->
        json(conn, %{success: ":)"})
      {:error, error} ->
        {:error, error}
    end
  end
end
