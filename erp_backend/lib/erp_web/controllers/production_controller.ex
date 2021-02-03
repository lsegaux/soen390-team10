defmodule ErpWeb.ProductionController do
  use ErpWeb, :controller

  def get_production_info(conn, _params) do
    case Erp.Production.production_status() do
      {:ok, data} ->
        json(conn, %{productionData: data})
      {:error, error} ->
        {:error, error}
    end
  end
end