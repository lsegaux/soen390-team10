# Script for populating the database. You can run it as:
#
#     mix run priv/repo/plant-seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Erp.Repo.insert!(%Erp.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Erp.Repo
alias Erp.Production.Plant


data = [
  %{
    "ID" => 0,
    "name" => "Montreal Plant",
  },
  %{
    "ID" => 1,
    "name" => "Dubai Plant",
  },
  %{
    "ID" => 2,
    "name" => "Toronto Plant",
  }
]

Enum.each data, fn(plant) ->

  plant_id = Map.get(plant, "ID")
  name = Map.get(plant, "name")

  Repo.insert! %Plant{
    plant_id: plant_id,
    name: name
  }
end
