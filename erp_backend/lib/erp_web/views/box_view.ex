defmodule ErpWeb.BoxView do

  use ErpWeb, :view

  def render("box.json", %{box: _box}) do
    %{success: 200}
  end

end
