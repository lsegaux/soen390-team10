defmodule ErmWeb.PageController do
  use ErmWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
