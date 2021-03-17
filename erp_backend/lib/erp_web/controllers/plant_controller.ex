defmodule ErpWeb.PlantController do
@moduledoc """
A module that acts as the controller for managing manufacturing plants.
"""
  use ErpWeb, :controller
  import Ecto.Query, warn: false

  alias Erp.Repo

  alias Erp.Production
  alias Erp.Production.Plant

  @doc false
  def show(conn, %{"id" => plant_id}) do
    plant = Erp.Production.Plant.get_plant!(plant_id)
    render(conn, "show.json", plant: plant)
  end

    @doc """
    Show a list of all plants.
    """
  def show_all_plants(conn, _params) do
    plants = Erp.Production.Plant.list_plants()
    render(conn, "index.json", plants: plants)
  end
end
