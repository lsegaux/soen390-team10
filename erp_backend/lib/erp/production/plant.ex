defmodule Erp.Production.Plant do
  @moduledoc """
  The Plants Context.
  """
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, warn: false

  alias Erp.Repo
  alias Erp.Production.Plant

  #Each plant has a name and an ID.
  @derive {Jason.Encoder, only: [:name, :plant_id]}
  @primary_key {:plant_id, :integer, []}
  @derive {Phoenix.Param, key: :plant_id}
  schema "plants" do
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(plant, attrs) do
    plant
    |> cast(attrs, [:name, :plant_id])
    |> validate_required([:name, :plant_id])
    |> unique_constraint(:plant_id)
  end

    @doc """
  Gets a single plant
  Raises `Ecto.NoResultsError` if the Plant does not exist.
  ## Examples
      iex> get_plant!(123)
      %User{}
      iex> get_plant!(asdasd)
      ** (Ecto.NoResultsError)
  """
  def get_plant!(id), do: Repo.get!(Plant, id)

  @doc """
  Returns the list of plants.
  ## Examples
      iex> list_plants()
      [%Plant{}, ...]
  """
  def list_plants() do
    Repo.all(Plant)
  end
end
