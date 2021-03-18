defmodule Erp.Production.Materialmap do
  @moduledoc """
  Mapping Materials.
  """
  use Ecto.Schema
  import Ecto.Changeset

  #Each part has a list of materials
  schema "materialmaps" do
    field :quantity, :integer
    field :part_id, :id
    field :material_id, :id

    timestamps()
  end

  @doc false
  def changeset(materialmap, attrs) do
    materialmap
    |> cast(attrs, [:quantity])
    |> validate_required([:quantity])
    |> foreign_key_constraint(:part_id)
    |> foreign_key_constraint(:material_id)
  end
end
