defmodule ErpWeb.PageController do
  use ErpWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
