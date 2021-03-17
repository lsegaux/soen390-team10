defmodule Erp.Sales.Order do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, warn: false

  alias Erp.Repo
  alias Erp.Sales.Order

  schema "orders" do
    field :price, :float
    field :time, :naive_datetime
    field :bikesAmount, :integer
    field :userEmail, :string
    timestamps()
  end

  def get_order!(id), do: Repo.get!(Order, id)

  def list_orders() do
    Erp.Repo.all(Order)
  end
end
