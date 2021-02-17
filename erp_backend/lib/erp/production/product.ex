defmodule Erp.Production.Product do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key false
  schema "products" do
    field :name, :string
    field :product_id, :integer
    field :quantity, :integer
    field :start_time, :naive_datetime
    field :plant_id, :integer

    @primary_key {:product_id, :integer, autogenerate: true}
    timestamps()
  end

  @doc false
  def changeset(product, attrs) do
    product
    |> cast(attrs, [:name, :product_id, :quantity, :start_time])
    |> validate_required([:name, :product_id, :quantity, :start_time])
    |> unique_constraint(:product_id)
    |> foreign_key_constraint(:plant_id)
  end
end
