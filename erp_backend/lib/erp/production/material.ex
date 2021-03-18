defmodule Erp.Production.Material do
  @moduledoc """
  The Materials Context
  """
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, warn: false


  alias Erp.Repo
  alias Erp.Production.Material

  #Each material has a list of attributes.
  @derive {Jason.Encoder, only: [:name, :quantity, :plant_id, :material_id]}
  @primary_key {:material_id, :integer, []}
  @derive {Phoenix.Param, key: :material_id}
  schema "materials" do
    field :name, :string
    field :quantity, :integer
    field :plant_id, :id
    field :price, :float

    timestamps()
  end

  @doc false
  def changeset(material, attrs) do
    material
    |> cast(attrs, [:name, :material_id, :quantity, :price])
    |> validate_required([:name, :material_id, :quantity, :price])
    |> unique_constraint(:material_id)
    |> foreign_key_constraint(:plant_id)
  end

  @doc """
  Gets a single material by ID
  Raises `Ecto.NoResultsError` if the material does not exist.
  ## Examples
      iex> get_material!(123)
      %Material{}
      iex> get_user!(asdjas)
      ** (Ecto.NoResultsError)
  """
  def get_material!(id), do: Repo.get!(Material, id)

  @doc """
  Returns the list of materials.
  ## Examples
      iex> list_materials()
      [%Material{}, ...]
  """
  def list_materials() do
    Repo.all(Material)
  end

    @doc """
  Gets list of materials by plant ID.
  Raises `Ecto.NoResultsError` if the User does not exist.
  ## Examples
      iex> get_materials_by_plant_id!(123)
      %User{}
      iex> get_materials_by_plant_id!(asdjansd)
      ** (Ecto.NoResultsError)
  """
  def get_materials_by_plant_id(id) do
    query = from(m in Material, where: m.plant_id == ^id, select: [:material_id, :name, :quantity, :plant_id, :price])
    Repo.all(query)
  end

    @doc """
  Updates a material quantity
  ## Examples
      iex> update_quantity(material, %{field: new_value})
      {:ok, %Material{}}
      iex> update_quantity(material, %{field: bad_value})
      {:error, %Ecto.Changeset{}}
  """
  def update_quantity(%Material{} = material, quantity) do
    material
    |> Material.changeset(%{quantity: quantity})
    |> Repo.update()
  end
end
