defmodule ErpWeb.PartView do

  use ErpWeb, :view
  alias ErpWeb.PartView

  def render("index.json", %{parts: parts}) do
    %{data: render_many(parts, PartView, "part.json")}
  end

  def render("part.json", %{part: part}) do
    %{part_id: part.part_id,
      name: part.name}
  end

  def render("show.json", %{part: part}) do
    %{data: render_one(part, PartView, "part.json")}
  end

end
