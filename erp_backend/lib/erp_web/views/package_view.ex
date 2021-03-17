defmodule ErpWeb.PackagingView do

  use ErpWeb, :view

  def render("package.json", %{package: package}) do
    %{package_id: package.id}
  end

  def render("box.json", %{box: _box}) do
    %{response: 200}
  end

end
