defmodule Erp.Production.Plant do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, warn: false

  alias Erp.Repo
  alias Erp.Production.Plant

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

  def get_plant!(id), do: Repo.get!(Plant, id)

  def list_plants() do
    Repo.all(Plant)
  end
end
