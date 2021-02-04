# Script for populating the database. You can run it as:
#
#     mix run priv/repo/material-seeds.exs
#


alias Erp.Repo
alias Erp.Production.Material


data = [
  %{
    "ID" => 0,
    "name" => "Metal",
    "quantity" => 20,
    "plantID" => 0
  },
  %{
    "ID" => 1,
    "name" => "Rubber",
    "quantity" => 15,
    "plantID" => 0
  },
  %{
    "ID" => 2,
    "name" => "Alluminium",
    "quantity" => 25,
    "plantID" => 0
  },
  %{
    "ID" => 3,
    "name" => "Alloy",
    "quantity" => 5,
    "plantID" => 0
  },
  %{
    "ID" => 4,
    "name" => "Carbon",
    "quantity" => 12,
    "plantID" => 0
  },
  %{
    "ID" => 5,
    "name" => "Leather",
    "quantity" => 20,
    "plantID" => 0
  },
  %{
    "ID" => 6,
    "name" => "Cloth",
    "quantity" => 15,
    "plantID" => 0
  },
  %{
    "ID" => 7,
    "name" => "Metal",
    "quantity" => 20,
    "plantID" => 1
  },
  %{
    "ID" => 8,
    "name" => "Rubber",
    "quantity" => 15,
    "plantID" => 1
  },
  %{
    "ID" => 9,
    "name" => "Alluminium",
    "quantity" => 25,
    "plantID" => 1
  },
  %{
    "ID" => 10,
    "name" => "Alloy",
    "quantity" => 5,
    "plantID" => 1
  },
  %{
    "ID" => 11,
    "name" => "Carbon",
    "quantity" => 12,
    "plantID" => 1
  },
  %{
    "ID" => 12,
    "name" => "Leather",
    "quantity" => 20,
    "plantID" => 1
  },
  %{
    "ID" => 13,
    "name" => "Cloth",
    "quantity" => 15,
    "plantID" => 1
  },
  %{
    "ID" => 14,
    "name" => "Metal",
    "quantity" => 20,
    "plantID" => 2
  },
  %{
    "ID" => 15,
    "name" => "Rubber",
    "quantity" => 15,
    "plantID" => 2
  },
  %{
    "ID" => 16,
    "name" => "Alluminium",
    "quantity" => 25,
    "plantID" => 2
  },
  %{
    "ID" => 17,
    "name" => "Alloy",
    "quantity" => 5,
    "plantID" => 2
  },
  %{
    "ID" => 18,
    "name" => "Carbon",
    "quantity" => 12,
    "plantID" => 2
  },
  %{
    "ID" => 19,
    "name" => "Leather",
    "quantity" => 20,
    "plantID" => 2
  },
  %{
    "ID" => 20,
    "name" => "Cloth",
    "quantity" => 15,
    "plantID" => 2
  }
]

Enum.each data, fn(material) ->

  material_id = Map.get(material, "ID")
  name = Map.get(material, "name")
  quantity = Map.get(material, "quantity")
  plant_id = Map.get(material, "plantID")

  Repo.insert! %Material{
    name: name,
    material_id: material_id,
    quantity: quantity,
    plant_id: plant_id
  }
end
