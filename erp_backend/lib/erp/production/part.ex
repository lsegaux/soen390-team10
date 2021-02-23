defmodule Erp.Production.Part do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key false
  schema "parts" do
    field :part_id, :integer
    field :name, :string
    field :quantity, :integer
    field :build_time, :time
    field :plant_id, :id

    @primary_key {:part_id, :integer, autogenerate: true}
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
