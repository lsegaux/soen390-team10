defmodule UserControllerTest do
@moduledoc """
A module for manages tests for users.
"""
  use ErpWeb.ConnCase

  alias Erp.Accounting

  @create_attrs %{amountowed: 120.5, users_id: "some users_id", name: "some name"}
  @update_attrs %{amountowed: 456.7, users_id: "some updated users_id", name: "some updated name"}
  @invalid_attrs %{amountowed: nil, users_id: nil, name: nil}

  def fixture(:users) do
    {:ok, users} = Accounting.create_users(@create_attrs)
    users
  end

  describe "index" do
    test "lists all users" do
    end
  end

  describe "new users" do
    test "renders form" do

    end
  end

  describe "create users" do
    test "redirects to show when data is valid" do
    end

    test "renders errors when data is invalid" do
    #  conn = post(conn, Routes.users_path(conn, :create), users: @invalid_attrs)
    #  assert html_response(conn, 200) =~ "New users"
    end
  end

  describe "edit users" do
   # setup [:create_users]

    test "renders form for editing chosen users" do
   #   conn = get(conn, Routes.users_path(conn, :edit, users))
   #   assert html_response(conn, 200) =~ "Edit users"
    end
  end

  describe "update users" do
    #setup [:create_users]

    test "redirects when data is valid" do
    #  conn = put(conn, Routes.users_path(conn, :update, users), users: @update_attrs)
    #  assert redirected_to(conn) == Routes.users_path(conn, :show, users)

    #  conn = get(conn, Routes.users_path(conn, :show, users))
   #   assert html_response(conn, 200) =~ "some updated users_id"
    end

    test "renders errors when data is invalid" do
    #  conn = put(conn, Routes.users_path(conn, :update, users), users: @invalid_attrs)
    #  assert html_response(conn, 200) =~ "Edit users"
    end
  end

  describe "delete users" do
   # setup [:create_users]

   # test "deletes chosen users", %{conn: conn, users: users} do
   #   conn = delete(conn, Routes.users_path(conn, :delete, users))
   #   assert redirected_to(conn) == Routes.users_path(conn, :index)
   #   assert_error_sent 404, fn ->
   #     get(conn, Routes.users_path(conn, :show, users))
   #   end
   # end
  end

  defp create_users(_) do
    users = fixture(:users)
    %{users: users}
  end
end
