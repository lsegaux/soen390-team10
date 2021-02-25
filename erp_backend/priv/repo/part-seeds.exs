# Script for populating the database. You can run it as:
#
#     mix run priv/repo/part-seeds.exs
#


alias Erp.Repo
alias Erp.Production.Part


data = [
  %{
    "ID" => 0,
    "name" => "Spring",
    "quantity" => 40,
    "plantID" => 0,
    "time" => ~T[00:10:00],
    "price" => 25,
    "material" => "Steel"
  },
  %{
    "ID" => 1,
    "name" => "Frame",
    "quantity" => 25,
    "plantID" => 0,
    "time" => ~T[00:40:00],
    "price" => 250,
    "material" => "Carbon Fibre"
  },
  %{
    "ID" => 2,
    "name" => "Seat",
    "quantity" => 58,
    "plantID" => 0,
    "time" => ~T[00:25:00],
    "price" => 25,
    "material" => "Cloth"
  },
  %{
    "ID" => 3,
    "name" => "Wheel",
    "quantity" => 115,
    "plantID" => 0,
    "time" => ~T[00:20:00],
    "price" => 15,
    "material" => "Stainless Steel"
  },
  %{
    "ID" => 5,
    "name" => "Spring",
    "quantity" => 40,
    "plantID" => 1,
    "time" => ~T[00:10:00],
    "price" => 35,
    "material" => "Reinforced Titanium"
  },
  %{
    "ID" => 6,
    "name" => "Frame",
    "quantity" => 25,
    "plantID" => 1,
    "time" => ~T[00:40:00],
    "price" => 350,
    "material" => "Fiber Glass"
  },
  %{
    "ID" => 7,
    "name" => "Seat",
    "quantity" => 58,
    "plantID" => 1,
    "time" => ~T[00:25:00],
    "price" => 45,
    "material" => "Leather"
  },
  %{
    "ID" => 8,
    "name" => "Wheel",
    "quantity" => 115,
    "plantID" => 1,
    "time" => ~T[00:20:00],
    "price" => 55,
    "material" => "Carbon Fiber"
  },
  %{
    "ID" => 10,
    "name" => "Spring",
    "quantity" => 40,
    "plantID" => 2,
    "time" => ~T[00:10:00],
    "price" => 30,
    "material" => "Reinforced Steel"
  },
  %{
    "ID" => 11,
    "name" => "Frame",
    "quantity" => 25,
    "plantID" => 2,
    "time" => ~T[00:40:00],
    "price" => 100,
    "material" => "Plastic"
  },
  %{
    "ID" => 12,
    "name" => "Seat",
    "quantity" => 58,
    "plantID" => 2,
    "time" => ~T[00:25:00],
    "price" => 10,
    "material" => "Wood"
  },
  %{
    "ID" => 13,
    "name" => "Wheel",
    "quantity" => 115,
    "plantID" => 2,
    "time" => ~T[00:20:00],
    "price" => 25,
    "material" => "Fiber Glass"
  },
]

Enum.each data, fn(part) ->

  part_id = Map.get(part, "ID")
  name = Map.get(part, "name")
  quantity = Map.get(part, "quantity")
  plant_id = Map.get(part, "plantID")
  build_time = Map.get(part, "time")
  material = Map.get(part, "material")
  price = Map.get(part, "price")

  Repo.insert! %Part{
    part_id: part_id,
    name: name,
    quantity: quantity,
    build_time: build_time,
    plant_id: plant_id,
    material: material,
    price: price
  }
end
