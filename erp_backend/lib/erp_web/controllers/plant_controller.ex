defmodule ErpWeb.PlantController do
  use ErpWeb, :controller
  import Ecto.Query, warn: false

  def show(conn, %{"id" => plant_id}) do
    plant = Erp.Production.Plant.get_plant!(plant_id)
    render(conn, "show.json", plant: plant)
  end

  def show_all_plants(conn, _params) do
    plants = Erp.Production.Plant.list_plants()
    render(conn, "index.json", plants: plants)
  end
end
