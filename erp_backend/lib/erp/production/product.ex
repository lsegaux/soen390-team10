defmodule Erp.Production.Product do
  use Ecto.Schema
  import Ecto.Changeset

  schema "products" do
    field :name, :string
    field :product_id, :integer
    field :quantity, :integer
    field :start_time, :naive_datetime
    field :plant_id, :id

    timestamps()
  end

  @doc false
  def changeset(product, attrs) do
    product
    |> cast(attrs, [:name, :product_id, :quantity, :start_time])
    |> validate_required([:name, :product_id, :quantity, :start_time])
    |> unique_constraint(:product_id)
  end
end
