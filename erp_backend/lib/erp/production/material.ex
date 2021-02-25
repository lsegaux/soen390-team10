defmodule Erp.Production.Material do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:name, :quantity, :plant_id, :material_id]}

  @primary_key false
  schema "materials" do
    field :material_id, :integer
    field :name, :string
    field :quantity, :integer
    field :plant_id, :id

    @primary_key {:material_id, :integer, autogenerate: true}
    timestamps()
  end

  @doc false
  def changeset(material, attrs) do
    material
    |> cast(attrs, [:name, :material_id, :quantity])
    |> validate_required([:name, :material_id, :quantity])
    |> unique_constraint(:material_id)
    |> foreign_key_constraint(:plant_id)
  end
end
