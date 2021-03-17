defmodule ErpWeb.PageController do
@moduledoc false
  use ErpWeb, :controller

  @doc false
  def index(conn, _params) do
    render(conn, "index.html")
  end
end
