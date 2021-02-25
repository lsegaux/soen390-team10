defmodule ErpWeb.MaterialControllerPage do
  use ErpWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert "Welcome to Phoenix!" == "Welcome to Phoenix!"
  end
end
