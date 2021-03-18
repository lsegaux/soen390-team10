defmodule ErpWeb.PageControllerTest do
@moduledoc """
A module for manages tests for site pages.
"""
  use ErpWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert "Welcome to Phoenix!" == "Welcome to Phoenix!"
  end
end
