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
    "time" => ~T[00:10:00]
  },
  %{
    "ID" => 1,
    "name" => "Frame",
    "quantity" => 25,
    "plantID" => 0,
    "time" => ~T[00:40:00]
  },
  %{
    "ID" => 2,
    "name" => "Seat",
    "quantity" => 58,
    "plantID" => 0,
    "time" => ~T[00:25:00]
  },
  %{
    "ID" => 3,
    "name" => "Front wheel",
    "quantity" => 115,
    "plantID" => 0,
    "time" => ~T[00:20:00]
  },
  %{
    "ID" => 4,
    "name" => "Rear wheel",
    "quantity" => 115,
    "plantID" => 0,
    "time" => ~T[00:20:00]
  },
  %{
    "ID" => 5,
    "name" => "Spring",
    "quantity" => 40,
    "plantID" => 1,
    "time" => ~T[00:10:00]
  },
  %{
    "ID" => 6,
    "name" => "Frame",
    "quantity" => 25,
    "plantID" => 1,
    "time" => ~T[00:40:00]
  },
  %{
    "ID" => 7,
    "name" => "Seat",
    "quantity" => 58,
    "plantID" => 1,
    "time" => ~T[00:25:00]
  },
  %{
    "ID" => 8,
    "name" => "Front wheel",
    "quantity" => 115,
    "plantID" => 1,
    "time" => ~T[00:20:00]
  },
  %{
    "ID" => 9,
    "name" => "Rear wheel",
    "quantity" => 115,
    "plantID" => 1,
    "time" => ~T[00:20:00]
  },%{
    "ID" => 10,
    "name" => "Spring",
    "quantity" => 40,
    "plantID" => 2,
    "time" => ~T[00:10:00]
  },
  %{
    "ID" => 11,
    "name" => "Frame",
    "quantity" => 25,
    "plantID" => 2,
    "time" => ~T[00:40:00]
  },
  %{
    "ID" => 12,
    "name" => "Seat",
    "quantity" => 58,
    "plantID" => 2,
    "time" => ~T[00:25:00]
  },
  %{
    "ID" => 13,
    "name" => "Front wheel",
    "quantity" => 115,
    "plantID" => 2,
    "time" => ~T[00:20:00]
  },
  %{
    "ID" => 14,
    "name" => "Rear wheel",
    "quantity" => 115,
    "plantID" => 2,
    "time" => ~T[00:20:00]
  },
]

Enum.each data, fn(part) ->

  part_id = Map.get(part, "ID")
  name = Map.get(part, "name")
  quantity = Map.get(part, "quantity")
  plant_id = Map.get(part, "plantID")
  build_time = Map.get(part, "time")

  Repo.insert! %Part{
    part_id: part_id,
    name: name,
    quantity: quantity,
    build_time: build_time,
    plant_id: plant_id
  }
end
