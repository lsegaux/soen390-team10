defmodule Erp.Production.MaterialsExpense do
@moduledoc """
A module that provides methods that allow for managing materials costs.
"""
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, warn: false

  alias Erp.Repo

  alias Erp.Production.MaterialsExpense

  @doc false
  schema "materialsexpenses" do
    field :amount, :float
    field :processed, :boolean

    timestamps()
  end

  @doc false
  def changeset(materials_expense, attrs) do
    materials_expense
    |> cast(attrs, [ :amount, :processed])
    |> validate_required([ :amount, :processed])
  end

    @doc """
  Creates an expense.
  ## Examples
      iex> create_expense(%{field: value})
      {:ok, %MaterialsExpense{}}
      iex> create_expense(%{field: bad_value})
      {:error, %Ecto.Changeset{}}
  """
  def create_expense(amount) do
    float = Float.parse(amount) |> elem(0)
    Repo.insert %MaterialsExpense{amount: float, processed: false}
  end

  @doc """
  Gets a materials epense
  Raises `Ecto.NoResultsError` if the User does not exist.
  ## Examples
      iex> get_materialsexpense!(123)
      %User{}
      iex> get_materialsexpense!(asdasd)
      ** (Ecto.NoResultsError)
  """
  def get_materialsexpense!(id), do: Repo.get!(MaterialsExpense, id)


  @doc """
  Returns the list of materials expenses
  ## Examples
      iex> list_materialsexpenses()
      [%MaterialsExpense{}, ...]
  """
  def list_materialsexpenses() do
    Repo.all(MaterialsExpense)
  end

    @doc """
  Verifies a user password.
  ## Examples
      iex> process_expense()
      [%MaterialsExpense{}, ...]
  """
  def process_expense(%MaterialsExpense{} = materialsexpense, processed) do
    materialsexpense
    |> MaterialsExpense.changeset(%{processed: processed})
    |> Repo.update()
  end

end
