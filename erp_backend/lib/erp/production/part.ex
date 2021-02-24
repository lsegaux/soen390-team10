defmodule Erp.Production.Part do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:part_id, :integer, []}
  @derive {Phoenix.Param, key: :part_id}
  schema "parts" do
    field :name, :string
    field :quantity, :integer
    field :build_time, :time
    field :plant_id, :id

    timestamps()
  end

  @doc false
  def changeset(part, attrs) do
    part
    |> cast(attrs, [:name, :part_id, :quantity, :build_time])
    |> validate_required([:name, :part_id, :quantity, :build_time])
    |> unique_constraint(:part_id)
    |> foreign_key_constraint(:plant_id)
  end
end
