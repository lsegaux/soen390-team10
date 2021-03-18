defmodule ErpWeb.MaterialControllerPage do
@moduledoc """
A module for manages tests for materials
"""
  use ErpWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert "Welcome to Phoenix!" == "Welcome to Phoenix!"
  end
end
