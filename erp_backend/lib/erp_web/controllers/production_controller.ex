defmodule ErpWeb.ProductionController do
@moduledoc """
A module that acts as the controller for production of products.
"""
  use ErpWeb, :controller

  @doc """
  Show the production information for the plant.
  """
  def get_production_info(conn, _params) do
    case Erp.Production.production_status() do
      {:ok, data} ->
        json(conn, %{productionData: data})
      {:error, error} ->
        {:error, error}
    end
  end
end
