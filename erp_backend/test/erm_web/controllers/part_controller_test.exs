defmodule PartControllerTest do
  use ErpWeb.ConnCase

  alias Erp.Accounting

  @create_attrs %{amountowed: 120.5, parts_id: "some parts_id", name: "some name"}
  @update_attrs %{amountowed: 456.7, parts_id: "some updated parts_id", name: "some updated name"}
  @invalid_attrs %{amountowed: nil, parts_id: nil, name: nil}

  def fixture(:parts) do
    {:ok, parts} = Accounting.create_parts(@create_attrs)
    parts
  end

  describe "index" do
    test "lists all parts" do
    end
  end

  describe "new parts" do
    test "renders form" do

    end
  end

  describe "create parts" do
    test "redirects to show when data is valid" do
    end

    test "renders errors when data is invalid" do
    #  conn = post(conn, Routes.parts_path(conn, :create), parts: @invalid_attrs)
    #  assert html_response(conn, 200) =~ "New parts"
    end
  end

  describe "edit parts" do
   # setup [:create_parts]

    test "renders form for editing chosen parts" do
   #   conn = get(conn, Routes.parts_path(conn, :edit, parts))
   #   assert html_response(conn, 200) =~ "Edit parts"
    end
  end

  describe "update parts" do
    #setup [:create_parts]

    test "redirects when data is valid" do
    #  conn = put(conn, Routes.parts_path(conn, :update, parts), parts: @update_attrs)
    #  assert redirected_to(conn) == Routes.parts_path(conn, :show, parts)

    #  conn = get(conn, Routes.parts_path(conn, :show, parts))
   #   assert html_response(conn, 200) =~ "some updated parts_id"
    end

    test "renders errors when data is invalid" do
    #  conn = put(conn, Routes.parts_path(conn, :update, parts), parts: @invalid_attrs)
    #  assert html_response(conn, 200) =~ "Edit parts"
    end
  end

  describe "delete parts" do
   # setup [:create_parts]

   # test "deletes chosen parts", %{conn: conn, parts: parts} do
   #   conn = delete(conn, Routes.parts_path(conn, :delete, parts))
   #   assert redirected_to(conn) == Routes.parts_path(conn, :index)
   #   assert_error_sent 404, fn ->
   #     get(conn, Routes.parts_path(conn, :show, parts))
   #   end
   # end
  end

  defp create_parts(_) do
    parts = fixture(:parts)
    %{parts: parts}
  end
end