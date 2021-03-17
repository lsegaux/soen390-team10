# Script for populating the database. You can run it as:
#
#     mix run priv/repo/box-seeds.exs
#

alias Erp.Repo
alias Erp.Packaging.Box

data = [
  %{
    "plant_id" => 0,
    "small" => 100,
    "medium" => 100,
    "large" => 100,
    "xlarge" => 100
  },
  %{
    "plant_id" => 1,
    "small" => 222,
    "medium" => 111,
    "large" => 178,
    "xlarge" => 86
  },
  %{
    "plant_id" => 2,
    "small" => 200,
    "medium" => 252,
    "large" => 301,
    "xlarge" => 108
  }
]

Enum.each data, fn(box) ->
  plant_id = Map.get(box, "plant_id")
  small = Map.get(box, "small")
  medium = Map.get(box, "medium")
  large = Map.get(box, "large")
  xlarge = Map.get(box, "xlarge")

  Repo.insert! %Box{
    plant_id: plant_id,
    small: small,
    medium: medium,
    large: large,
    xlarge: xlarge
  }
end
