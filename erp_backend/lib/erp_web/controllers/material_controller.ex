defmodule ErpWeb.MaterialController do
  use ErpWeb, :controller
  import Ecto.Query, warn: false

  alias Erp.Repo

  alias Erp.Production
  alias Erp.Production.Material

  def show(conn, %{"id" => material_id}) do
    material = Erp.Production.Material.get_material!(material_id)
    render(conn, "show.json", material: material)
  end

  def show_all_materials(conn, _params) do
    materials = Erp.Production.Material.list_materials()
    render(conn, "index.json", materials: materials)
  end

  def get_materials_by_plant_id(conn, %{"id" => plant_id}) do
    materials = Erp.Production.Material.get_materials_by_plant_id(plant_id)
    render(conn, "index.json", materials: materials)
  end
  def update_quantity(conn, %{"id" => plant_id, "quantity" => quantity}) do
    material = Material.get_material!(plant_id)

    with {:ok, %Material{} = material} <- Material.update_quantity(material, quantity) do
      render(conn, "show.json", material: material)
    end
  end
end
