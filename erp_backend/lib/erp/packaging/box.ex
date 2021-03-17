defmodule Erp.Packaging.Box do
  use Ecto.Schema
  import Ecto.Changeset
  alias Erp.Packaging.Box
  alias Erp.Repo

  schema "boxes" do
    field :plant_id, :id
    field :small, :integer
    field :medium, :integer
    field :large, :integer
    field :xlarge, :integer
  end

  @doc false
  def changeset(box, attrs) do
    box
    |> cast(attrs, [:plant_id, :small, :medium, :large, :xlarge])
    |> foreign_key_constraint(:plant_id)
  end

  def get_boxes!(id), do: Repo.get!(Box, id)

  def reduce_quantity(%Box{} = box, small, medium, large, xlarge) do
    box
    |> Box.changeset(%{small: small, medium: medium, large: large, xlarge: xlarge})
    |> Repo.update()
  end

  def increase_quantity(%Box{} = box, id, small, medium,large, xlarge) do
    box
    |> Box.changeset(%{small: small, id: id, medium: medium, large: large, xlarge: xlarge})
    |> Repo.update()
  end

end
