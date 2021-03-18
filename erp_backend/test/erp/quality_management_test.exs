defmodule Erp.QualityManagementTest do
  use Erp.DataCase

  alias Erp.QualityManagement

  describe "vendorclaim" do
    alias Erp.QualityManagement.VendorClaim

    @valid_attrs %{comments: "some comments", defecttype: "some defecttype", description: "some description", name: "some name", orderid: 42, requeststatus: "some requeststatus", status: "some status", vendorrequest: "some vendorrequest"}
    @update_attrs %{comments: "some updated comments", defecttype: "some updated defecttype", description: "some updated description", name: "some updated name", orderid: 43, requeststatus: "some updated requeststatus", status: "some updated status", vendorrequest: "some updated vendorrequest"}
    @invalid_attrs %{comments: nil, defecttype: nil, description: nil, name: nil, orderid: nil, requeststatus: nil, status: nil, vendorrequest: nil}

    def vendor_claim_fixture(attrs \\ %{}) do
      {:ok, vendor_claim} =
        attrs
        |> Enum.into(@valid_attrs)
        |> QualityManagement.create_vendor_claim()

      vendor_claim
    end

    test "list_vendorclaim/0 returns all vendorclaim" do
      vendor_claim = vendor_claim_fixture()
      assert QualityManagement.list_vendorclaim() == [vendor_claim]
    end

    test "get_vendor_claim!/1 returns the vendor_claim with given id" do
      vendor_claim = vendor_claim_fixture()
      assert QualityManagement.get_vendor_claim!(vendor_claim.id) == vendor_claim
    end

    test "create_vendor_claim/1 with valid data creates a vendor_claim" do
      assert {:ok, %VendorClaim{} = vendor_claim} = QualityManagement.create_vendor_claim(@valid_attrs)
      assert vendor_claim.comments == "some comments"
      assert vendor_claim.defecttype == "some defecttype"
      assert vendor_claim.description == "some description"
      assert vendor_claim.name == "some name"
      assert vendor_claim.orderid == 42
      assert vendor_claim.requeststatus == "some requeststatus"
      assert vendor_claim.status == "some status"
      assert vendor_claim.vendorrequest == "some vendorrequest"
    end

    test "create_vendor_claim/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = QualityManagement.create_vendor_claim(@invalid_attrs)
    end

    test "update_vendor_claim/2 with valid data updates the vendor_claim" do
      vendor_claim = vendor_claim_fixture()
      assert {:ok, %VendorClaim{} = vendor_claim} = QualityManagement.update_vendor_claim(vendor_claim, @update_attrs)
      assert vendor_claim.comments == "some updated comments"
      assert vendor_claim.defecttype == "some updated defecttype"
      assert vendor_claim.description == "some updated description"
      assert vendor_claim.name == "some updated name"
      assert vendor_claim.orderid == 43
      assert vendor_claim.requeststatus == "some updated requeststatus"
      assert vendor_claim.status == "some updated status"
      assert vendor_claim.vendorrequest == "some updated vendorrequest"
    end

    test "update_vendor_claim/2 with invalid data returns error changeset" do
      vendor_claim = vendor_claim_fixture()
      assert {:error, %Ecto.Changeset{}} = QualityManagement.update_vendor_claim(vendor_claim, @invalid_attrs)
      assert vendor_claim == QualityManagement.get_vendor_claim!(vendor_claim.id)
    end

    test "delete_vendor_claim/1 deletes the vendor_claim" do
      vendor_claim = vendor_claim_fixture()
      assert {:ok, %VendorClaim{}} = QualityManagement.delete_vendor_claim(vendor_claim)
      assert_raise Ecto.NoResultsError, fn -> QualityManagement.get_vendor_claim!(vendor_claim.id) end
    end

    test "change_vendor_claim/1 returns a vendor_claim changeset" do
      vendor_claim = vendor_claim_fixture()
      assert %Ecto.Changeset{} = QualityManagement.change_vendor_claim(vendor_claim)
    end
  end

  describe "clientclaim" do
    alias Erp.QualityManagement.ClientClaim

    @valid_attrs %{clientrequest: "some clientrequest", comments: "some comments", defecttype: "some defecttype", description: "some description", name: "some name", orderid: 42, requeststatus: "some requeststatus", status: "some status"}
    @update_attrs %{clientrequest: "some updated clientrequest", comments: "some updated comments", defecttype: "some updated defecttype", description: "some updated description", name: "some updated name", orderid: 43, requeststatus: "some updated requeststatus", status: "some updated status"}
    @invalid_attrs %{clientrequest: nil, comments: nil, defecttype: nil, description: nil, name: nil, orderid: nil, requeststatus: nil, status: nil}

    def client_claim_fixture(attrs \\ %{}) do
      {:ok, client_claim} =
        attrs
        |> Enum.into(@valid_attrs)
        |> QualityManagement.create_client_claim()

      client_claim
    end

    test "list_clientclaim/0 returns all clientclaim" do
      client_claim = client_claim_fixture()
      assert QualityManagement.list_clientclaim() == [client_claim]
    end

    test "get_client_claim!/1 returns the client_claim with given id" do
      client_claim = client_claim_fixture()
      assert QualityManagement.get_client_claim!(client_claim.id) == client_claim
    end

    test "create_client_claim/1 with valid data creates a client_claim" do
      assert {:ok, %ClientClaim{} = client_claim} = QualityManagement.create_client_claim(@valid_attrs)
      assert client_claim.clientrequest == "some clientrequest"
      assert client_claim.comments == "some comments"
      assert client_claim.defecttype == "some defecttype"
      assert client_claim.description == "some description"
      assert client_claim.name == "some name"
      assert client_claim.orderid == 42
      assert client_claim.requeststatus == "some requeststatus"
      assert client_claim.status == "some status"
    end

    test "create_client_claim/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = QualityManagement.create_client_claim(@invalid_attrs)
    end

    test "update_client_claim/2 with valid data updates the client_claim" do
      client_claim = client_claim_fixture()
      assert {:ok, %ClientClaim{} = client_claim} = QualityManagement.update_client_claim(client_claim, @update_attrs)
      assert client_claim.clientrequest == "some updated clientrequest"
      assert client_claim.comments == "some updated comments"
      assert client_claim.defecttype == "some updated defecttype"
      assert client_claim.description == "some updated description"
      assert client_claim.name == "some updated name"
      assert client_claim.orderid == 43
      assert client_claim.requeststatus == "some updated requeststatus"
      assert client_claim.status == "some updated status"
    end

    test "update_client_claim/2 with invalid data returns error changeset" do
      client_claim = client_claim_fixture()
      assert {:error, %Ecto.Changeset{}} = QualityManagement.update_client_claim(client_claim, @invalid_attrs)
      assert client_claim == QualityManagement.get_client_claim!(client_claim.id)
    end

    test "delete_client_claim/1 deletes the client_claim" do
      client_claim = client_claim_fixture()
      assert {:ok, %ClientClaim{}} = QualityManagement.delete_client_claim(client_claim)
      assert_raise Ecto.NoResultsError, fn -> QualityManagement.get_client_claim!(client_claim.id) end
    end

    test "change_client_claim/1 returns a client_claim changeset" do
      client_claim = client_claim_fixture()
      assert %Ecto.Changeset{} = QualityManagement.change_client_claim(client_claim)
    end
  end
end
