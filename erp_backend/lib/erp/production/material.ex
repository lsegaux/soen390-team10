defmodule Erp.Production.Material do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, warn: false

  alias Erp.Repo
  alias Erp.Production.Material

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

  def get_material!(id), do: Repo.get!(Material, id)

  def list_materials() do
    Repo.all(Material)
  end

  def get_materials_by_plant_id(id) do
    query = from(m in Material, where: m.plant_id == ^id, select: [:material_id, :name, :quantity, :plant_id, :price])
    Repo.all(query)
  end

  def update_quantity(%Material{} = material, quantity) do
    material
    |> Material.changeset(%{quantity: quantity})
    |> Repo.update()
  end
end
