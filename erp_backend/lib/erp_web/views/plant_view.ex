defmodule ErpWeb.PlantView do

  use ErpWeb, :view
  alias ErpWeb.PlantView

  def render("index.json", %{plants: plants}) do
    %{data: render_many(plants, PlantView, "plant.json")}
  end

  def render("plant.json", %{plant: plant}) do
    %{plant_id: plant.plant_id,
      name: plant.name}
  end

  def render("show.json", %{plant: plant}) do
    %{data: render_one(plant, PlantView, "plant.json")}
  end

end
