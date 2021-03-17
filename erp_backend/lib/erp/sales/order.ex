defmodule Erp.Sales.Order do
  @moduledoc """
  The Orders context.
  """
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, warn: false

  alias Erp.Repo
  alias Erp.Sales.Order

  @primary_key false
  @doc false
  schema "orders" do
    field :price, :float
    field :time, :naive_datetime
    field :bikesAmount, :integer
    field :userEmail, :string

    @primary_key {:orderId, :id, autogenerate: true}
    timestamps()
  end

  @doc """
  Gets a single order.
  Raises `Ecto.NoResultsError` if the User does not exist.
  ## Examples
      iex> get_order!(123)
      %Order{}
      iex> get_user!(asdasd)
      ** (Ecto.NoResultsError)
  """
  def get_order!(id), do: Repo.get!(Order, id)

  @doc """
  Returns the list of orders.
  ## Examples
      iex> list_orders()
      [%Order{}, ...]
  """
  def list_orders() do
    Erp.Repo.all(Order)
  end
end
