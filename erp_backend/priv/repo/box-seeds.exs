# Script for populating the database. You can run it as:
#
#     mix run priv/repo/box-seeds.exs
#

alias Erp.Repo
alias Erp.Packaging.Box

data = [
  %{
    "small" => 10,
    "medium" => 10,
    "large" => 10,
    "xlarge" => 10
  },
]

Enum.each data, fn(box) ->

  small = Map.get(box, "small")
  medium = Map.get(box, "medium")
  large = Map.get(box, "large")
  xlarge = Map.get(box, "xlarge")

  Repo.insert! %Box{
    small: small,
    medium: medium,
    large: large,
    xlarge: xlarge
  }
end
