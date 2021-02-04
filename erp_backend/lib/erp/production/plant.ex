defmodule Erp.Production.Plant do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:name, :plant_id]}
  schema "plants" do
    field :name, :string
    field :plant_id, :integer

    timestamps()
  end

  @doc false
  def changeset(plant, attrs) do
    plant
    |> cast(attrs, [:name, :plant_id])
    |> validate_required([:name, :plant_id])
    |> unique_constraint(:plant_id)
  end
end
