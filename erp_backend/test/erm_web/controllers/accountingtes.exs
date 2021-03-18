defmodule Erp.AccountingTest do
@moduledoc """
A module for manages tests for the accounting module.
"""
  use Erp.DataCase

  alias Erp.Accounting

  describe "vendor" do
    alias Erp.Accounting.Vendor

    @valid_attrs %{amountdue: 120.5, name: "some name", vendor_id: 42}
    @update_attrs %{amountdue: 456.7, name: "some updated name", vendor_id: 43}
    @invalid_attrs %{amountdue: nil, name: nil, vendor_id: nil}

    def vendor_fixture(attrs \\ %{}) do
      {:ok, vendor} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Accounting.create_vendor()

      vendor
    end

    test "list_vendor/0 returns all vendor" do
      vendor = vendor_fixture()
      assert Accounting.list_vendor() == [vendor]
    end

    test "get_vendor!/1 returns the vendor with given id" do
      vendor = vendor_fixture()
      assert Accounting.get_vendor!(vendor.id) == vendor
    end

    test "create_vendor/1 with valid data creates a vendor" do
      assert {:ok, %Vendor{} = vendor} = Accounting.create_vendor(@valid_attrs)
      assert vendor.amountdue == 120.5
      assert vendor.name == "some name"
      assert vendor.vendor_id == 42
    end

    test "create_vendor/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Accounting.create_vendor(@invalid_attrs)
    end

    test "update_vendor/2 with valid data updates the vendor" do
      vendor = vendor_fixture()
      assert {:ok, %Vendor{} = vendor} = Accounting.update_vendor(vendor, @update_attrs)
      assert vendor.amountdue == 456.7
      assert vendor.name == "some updated name"
      assert vendor.vendor_id == 43
    end

    test "update_vendor/2 with invalid data returns error changeset" do
      vendor = vendor_fixture()
      assert {:error, %Ecto.Changeset{}} = Accounting.update_vendor(vendor, @invalid_attrs)
      assert vendor == Accounting.get_vendor!(vendor.id)
    end

    test "delete_vendor/1 deletes the vendor" do
      vendor = vendor_fixture()
      assert {:ok, %Vendor{}} = Accounting.delete_vendor(vendor)
      assert_raise Ecto.NoResultsError, fn -> Accounting.get_vendor!(vendor.id) end
    end

    test "change_vendor/1 returns a vendor changeset" do
      vendor = vendor_fixture()
      assert %Ecto.Changeset{} = Accounting.change_vendor(vendor)
    end
  end

  describe "client" do
    alias Erp.Accounting.Client

    @valid_attrs %{amountowed: 120.5, client_id: "some client_id", name: "some name"}
    @update_attrs %{amountowed: 456.7, client_id: "some updated client_id", name: "some updated name"}
    @invalid_attrs %{amountowed: nil, client_id: nil, name: nil}

    def client_fixture(attrs \\ %{}) do
      {:ok, client} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Accounting.create_client()

      client
    end

    test "list_client/0 returns all client" do
      client = client_fixture()
      assert Accounting.list_client() == [client]
    end

    test "get_client!/1 returns the client with given id" do
      client = client_fixture()
      assert Accounting.get_client!(client.id) == client
    end

    test "create_client/1 with valid data creates a client" do
      assert {:ok, %Client{} = client} = Accounting.create_client(@valid_attrs)
      assert client.amountowed == 120.5
      assert client.client_id == "some client_id"
      assert client.name == "some name"
    end

    test "create_client/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Accounting.create_client(@invalid_attrs)
    end

    test "update_client/2 with valid data updates the client" do
      client = client_fixture()
      assert {:ok, %Client{} = client} = Accounting.update_client(client, @update_attrs)
      assert client.amountowed == 456.7
      assert client.client_id == "some updated client_id"
      assert client.name == "some updated name"
    end

    test "update_client/2 with invalid data returns error changeset" do
      client = client_fixture()
      assert {:error, %Ecto.Changeset{}} = Accounting.update_client(client, @invalid_attrs)
      assert client == Accounting.get_client!(client.id)
    end

    test "delete_client/1 deletes the client" do
      client = client_fixture()
      assert {:ok, %Client{}} = Accounting.delete_client(client)
      assert_raise Ecto.NoResultsError, fn -> Accounting.get_client!(client.id) end
    end

    test "change_client/1 returns a client changeset" do
      client = client_fixture()
      assert %Ecto.Changeset{} = Accounting.change_client(client)
    end
  end
end
