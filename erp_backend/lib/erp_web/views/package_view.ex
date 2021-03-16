defmodule ErpWeb.PackagingView do

  use ErpWeb, :view

  def render("package.json", %{package: package}) do
    %{package_id: package.id}
  end

end
