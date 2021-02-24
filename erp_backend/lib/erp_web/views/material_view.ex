defmodule ErpWeb.MaterialView do

  use ErpWeb, :view
  alias ErpWeb.MaterialView

  def render("index.json", %{materials: materials}) do
    %{data: render_many(materials, MaterialView, "material.json")}
  end

  def render("material.json", %{material: material}) do
    %{material_id: material.material_id,
      name: material.name,
      quantity: material.quantity,
      plant_id: material.plant_id,
      price: material.price}
  end

  def render("show.json", %{material: material}) do
    %{data: render_one(material, MaterialView, "material.json")}
  end

end
