defmodule Erp.Packaging.Package do
  use Ecto.Schema
  import Ecto.Changeset
  alias Erp.Packaging.Package
  alias Erp.Repo

  schema "packages" do
    field :order_id, :id
    field :plant_id, :integer
    field :user_email, :string
    field :weight, :float
    field :shipped, :boolean
    timestamps()
  end

  @doc false
  def changeset(package, attrs) do
    package
    |> cast(attrs, [:order_id, :plant_id, :user_email, :weight, :shipped])
    |> validate_required([:order_id, :user_email, :weight, :shipped])
    |> foreign_key_constraint(:order_id)
    |> foreign_key_constraint(:plant_id)
  end

  def create_package(attrs \\ %{}) do
    %Package{}
    |> Package.changeset(attrs)
    |> Repo.insert()
  end
end
