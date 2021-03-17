defmodule Erp.Packaging.Box do
  @moduledoc """
  The Box Context
  """

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

  @doc """
  Gets boxes
  Raises `Ecto.NoResultsError` if the boxId does not exist.
  ## Examples
      iex> get_boxes!(1)
      %Box{}
      iex> get_user!(456)
      ** (Ecto.NoResultsError)
  """
  def get_boxes!(id), do: Repo.get!(Box, id)

  @doc """
  Reduce number of boxes in inventory
  """
  def reduce_quantity(%Box{} = box, small, medium, large, xlarge) do
    box
    |> Box.changeset(%{small: small, medium: medium, large: large, xlarge: xlarge})
    |> Repo.update()
  end

  @doc """
  Increases number of boxes in inventory. Called when ordering boxes
  """
  def increase_quantity(%Box{} = box, id, small, medium,large, xlarge) do
    box
    |> Box.changeset(%{small: small, id: id, medium: medium, large: large, xlarge: xlarge})
    |> Repo.update()
  end

end
