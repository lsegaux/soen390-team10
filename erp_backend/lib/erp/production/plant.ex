defmodule Erp.Production.Plant do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:name, :plant_id]}

  @primary_key false
  schema "plants" do
    field :plant_id, :integer
    field :name, :string

    @primary_key {:plant_id, :integer, autogenerate: true}
    timestamps()
  end

  @doc false
  def changeset(plant, attrs) do
    plant
    |> cast(attrs, [:name, :plant_id])
    |> validate_required([:name, :plant_id])
    |> unique_constraint(:plant_id, name: "plants_pkey")
  end
end
