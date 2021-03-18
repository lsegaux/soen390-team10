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
      err -> err
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

  defp add_plants(plants) do
    plants |> Enum.reduce(%{}, fn(plant, map) ->
      Map.put(map, plant.plant_id, %{
        location: plant.name,
        parts: [],
        materials: [],
        bikesBuilt: 0,
        bikesBeingBuilt: 0
      })
    end)
  end

  defp add_parts(res, partsList) do
    Enum.reduce(partsList, res, fn(x, map) ->
      xplant = x.plant_id
      updated = Map.replace(map[xplant], :parts, [%{type: x.name, quantity: x.quantity, price: x.price, material: x.material} | Map.get(map[xplant], :parts)])
      Map.replace(map, xplant, updated)
    end)
  end

  defp add_materials(res, materialsList) do
    Enum.reduce(materialsList, res, fn(y, map) ->
      yplant = y.plant_id
      updated = Map.replace(map[yplant], :materials,  [%{type: y.name, quantity: y.quantity} | Map.get(map[yplant], :materials)])
      Map.replace(map, yplant, updated)
    end)
  end

  defp add_bikes(res, bikesList) do
    Enum.reduce(bikesList, res, fn(z, map) ->
      if NaiveDateTime.compare(z.start_time, NaiveDateTime.add(NaiveDateTime.utc_now(), -3600, :second)) == :gt do
        zplant = z.plant_id
        updated = Map.replace(map[zplant], :bikesBeingBuilt, map[zplant].bikesBeingBuilt + 1)
        Map.replace(map, zplant, updated)
      else
        zplant = z.plant_id
        updated = Map.replace(map[zplant], :bikesBuilt, map[zplant].bikesBuilt + 1)
        Map.replace(map, zplant, updated)
      end
    end)
  end

  defp format_response(plantsList, partsList, materialsList, bikesList) do
    response = add_plants(plantsList)
    response = add_parts(response, partsList)
    response = add_materials(response, materialsList)
    response = add_bikes(response, bikesList)
    {:ok, response}
  end
end
