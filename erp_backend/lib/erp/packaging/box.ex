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

  # def decrease_boxes(attrs \\ %{}) do
  #   %Package{}
  #   |> Package.changeset(attrs)
  #   |> Repo.insert()
  # end

end
