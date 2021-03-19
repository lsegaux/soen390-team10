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
alias Erp.Production.MaterialsExpense


data = [
  %{
    "amount" => 200.0,
    "processed" => false,
    "company" => "Wilson Inc."
  },
  %{
    "amount" => 300.99,
    "processed" => false,
    "company" => "Wilson Inc."
  },
  %{
    "amount" => 400.95,
    "processed" => false,
    "company" => "Wilson Inc."
  }
]

Enum.each data, fn(expense) ->

  amount = Map.get(expense, "amount")
  processed = Map.get(expense, "processed")
  company = Map.get(expense, "company")

  Repo.insert! %MaterialsExpense{
    amount: amount,
    processed: processed,
    company: company
  }
end
