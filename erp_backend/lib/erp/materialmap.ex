defmodule Erp.Materialmap do
  use Ecto.Schema
  import Ecto.Changeset

  #each part has a list of materials
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
  end
end
