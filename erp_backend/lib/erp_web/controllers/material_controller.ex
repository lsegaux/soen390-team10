defmodule ErpWeb.MaterialController do
@moduledoc """
A module that acts as the controller for managing materials.
"""
  use ErpWeb, :controller
  import Ecto.Query, warn: false

  alias Erp.Production.Material

  @doc false
  def show(conn, %{"id" => material_id}) do
    material = Erp.Production.Material.get_material!(material_id)
    render(conn, "show.json", material: material)
  end

    @doc """
    Show all materials.
    """
  def show_all_materials(conn, _params) do
    materials = Erp.Production.Material.list_materials()
    render(conn, "index.json", materials: materials)
  end

    @doc """
    Get a list of materials that correlate to a plant ID.
    """
  def get_materials_by_plant_id(conn, %{"id" => plant_id}) do
    materials = Erp.Production.Material.get_materials_by_plant_id(plant_id)
    render(conn, "index.json", materials: materials)
  end

    @doc """
    Update the quanity of a material by ID.
    """
  def update_quantity(conn, %{"id" => plant_id, "quantity" => quantity}) do
    material = Material.get_material!(plant_id)

    with {:ok, %Material{} = material} <- Material.update_quantity(material, quantity) do
      render(conn, "show.json", material: material)
    end
  end
end
