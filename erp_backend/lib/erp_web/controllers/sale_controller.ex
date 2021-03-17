defmodule ErpWeb.SaleController do
@moduledoc """
A module that acts as the controller for system sales.
"""
  use ErpWeb, :controller

  @doc """
  Process a singular sale of a bike.
  """
  def process_sale(conn, _params) do
    case Erp.Sale.add_sale() do
      {:ok, data} ->
        json(conn, %{success: data})
      {:error, error} ->
        {:error, error}
    end
  end
end
