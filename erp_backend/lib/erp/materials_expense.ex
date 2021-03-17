defmodule Erp.Production.MaterialsExpense do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, warn: false

  alias Erp.Repo

  alias Erp.Production.MaterialsExpense

  schema "materialsexpenses" do
    field :amount, :float
    field :processed, :boolean
    field :company, :string

    timestamps()
  end

  @doc false
  def changeset(materials_expense, attrs) do
    materials_expense
    |> cast(attrs, [ :amount, :processed])
    |> validate_required([ :amount, :processed])
  end

  def create_expense(amount, company_name) do
    float = Float.parse(amount) |> elem(0)
    Repo.insert %MaterialsExpense{amount: float, processed: false, company: company_name}
  end

  def get_materialsexpense!(id), do: Repo.get!(MaterialsExpense, id)

  def list_materialsexpenses() do
    Repo.all(MaterialsExpense)
  end

  def process_expense(%MaterialsExpense{} = materialsexpense, processed) do
    materialsexpense
    |> MaterialsExpense.changeset(%{processed: processed})
    |> Repo.update()
  end

end
