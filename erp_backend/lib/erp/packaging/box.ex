defmodule Erp.Packaging.Box do
  use Ecto.Schema
  import Ecto.Changeset
  alias Erp.Packaging.Box
  alias Erp.Repo

  schema "boxes" do
    field :small, :integer
    field :medium, :integer
    field :large, :integer
    field :xlarge, :integer
  end

  @doc false
  def changeset(box, attrs) do
    box
    |> cast(attrs, [:small, :medium, :large, :xlarge])
  end

  def get_box!(id), do: Repo.get!(Box, id)

  def reduce_quantity(%Box{} = box, small, medium, large, xlarge) do
    box
    |> Box.changeset(%{small: small, medium: medium, large: large, xlarge: xlarge})
    |> Repo.update()
  end

  def increase_quantity(%Box{} = box, small, medium,large, xlarge) do
    box
    |> Box.changeset(%{small: small, medium: medium, large: large, xlarge: xlarge})
    |> Repo.update()
  end

end
