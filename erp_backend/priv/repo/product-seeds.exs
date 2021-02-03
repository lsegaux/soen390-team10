# Script for populating the database. You can run it as:
#
#     mix run priv/repo/product-seeds.exs
#


alias Erp.Repo
alias Erp.Product


data = [
  %{
    "ID" => 0,
    "name" => "G300 Bicyle",
    "quantity" => 3,
    "plantID" => 0,
    "time" => ~N[2021-02-01 23:00:07]
  },
  %{
    "ID" => 1,
    "name" => "P800 Road Bike",
    "quantity" => 5,
    "plantID" => 0
  },
  %{
    "ID" => 2,
    "name" => "T10 Roadster",
    "quantity" => 1,
    "plantID" => 1,
    "time" => ~N[2021-02-01 23:00:07]
  },
  %{
    "ID" => 3,
    "name" => "H4 Bicyle",
    "quantity" => 12,
    "plantID" => 1,
    "time" => ~N[2021-02-01 23:00:07]
  },
  %{
    "ID" => 4,
    "name" => "H6 Bicycle",
    "quantity" => 8,
    "plantID" => 2,
    "time" => ~N[2021-02-01 23:00:07]
  },
  %{
    "ID" => 5,
    "name" => "H8 Velociraptor",
    "quantity" => 4,
    "plantID" => 2,
    "time" => ~N[2021-02-01 23:00:07]
  }
]

Enum.each data, fn(product) ->

  product_id = Map.get(product, "ID")
  name = Map.get(product, "name")
  quantity = Map.get(product, "quantity")
  plant_id = Map.get(product, "plantID")
  start_time = Map.get(product, "time")

  Repo.insert! %Product{
    name: name,
    product_id: product_id,
    quantity: quantity,
    start_time: start_time,
    plant_id: plant_id
  }
end
