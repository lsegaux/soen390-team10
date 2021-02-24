defmodule Erp.Sales.Order do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key false
  schema "orders" do
    field :orderId, :id
    field :price, :integer
    field :time, :naive_datetime
    field :bikesAmount, :integer
    field :userEmail, :string

    @primary_key {:orderId, :id, autogenerate: true}
    timestamps()
  end
end
