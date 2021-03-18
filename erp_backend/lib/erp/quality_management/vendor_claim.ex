defmodule Erp.QualityManagement.VendorClaim do
  use Ecto.Schema
  import Ecto.Changeset

  schema "vendorclaim" do
    field :comments, :string
    field :defecttype, :string
    field :description, :string
    field :name, :string
    field :orderid, :integer
    field :requeststatus, :string
    field :status, :string
    field :vendorrequest, :string

    timestamps()
  end

  @doc false
  def changeset(vendor_claim, attrs) do
    vendor_claim
    |> cast(attrs, [:name, :orderid, :defecttype, :description, :comments, :status, :vendorrequest, :requeststatus])
    |> validate_required([:name, :orderid, :defecttype, :description, :comments, :status, :vendorrequest, :requeststatus])
  end
end
