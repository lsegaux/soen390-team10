defmodule Erp.QualityManagement.ClientClaim do
  use Ecto.Schema
  import Ecto.Changeset

  schema "clientclaim" do
    field :clientrequest, :string
    field :comments, :string
    field :defecttype, :string
    field :description, :string
    field :name, :string
    field :orderid, :integer
    field :requeststatus, :string
    field :status, :string

    timestamps()
  end

  @doc false
  def changeset(client_claim, attrs) do
    client_claim
    |> cast(attrs, [:name, :orderid, :defecttype, :description, :comments, :status, :clientrequest, :requeststatus])
    |> validate_required([:name, :orderid, :defecttype, :description, :comments, :status, :clientrequest, :requeststatus])
    |> unique_constraint(:orderid)
  end
end
