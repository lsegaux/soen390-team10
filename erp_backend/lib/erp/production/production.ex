defmodule Erp.Production do
  @moduledoc """
  The Production context.
  """

  alias Erp.Repo
  alias Erp.Production.Plant
  alias Erp.Production.Part
  alias Erp.Production.Material
  alias Erp.Production.Product


  def production_status() do
    with {:ok, plants} <- query_plants(),
    {:ok, parts} <- query_parts(),
    {:ok, materials} <- query_materials(),
    {:ok, bikes} <- query_bikes() 
    do
      format_response(plants, parts, materials, bikes)
    else
      :error -> {:error, :db_error}
    end
  end

  def list_plants() do
    Repo.all(Plant)
  end

  defp query_plants() do
    plants = list_plants()
    if length(plants) > 0 do
      {:ok, plants}
    else
      {:error, :no_plants_found}
    end
  end

  def list_parts() do
    Repo.all(Part)
  end

  defp query_parts() do
    parts = list_parts()
    if length(parts) > 0 do
      {:ok, parts}
    else
      {:error, :no_parts_found}
    end
  end

  def list_materials() do
    Repo.all(Material)
  end

  defp query_materials() do
    materials = list_materials()
    if length(materials) > 0 do
      {:ok, materials}
    else
      {:error, :no_materials_found}
    end
  end

  def list_bikes() do
    Repo.all(Product)
  end

  defp query_bikes() do
    bikes = list_bikes()
    if length(bikes) > 0 do
      {:ok, bikes}
    else
      {:error, :no_bikes_found}
    end
  end

  defp format_response(plants, parts, materials, bikes) do
    {:ok, %{
      Plants: plants,
      Parts: parts,
      Materials: materials,
      Bikes: bikes
    }}
  end
end
