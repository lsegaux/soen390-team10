defmodule ErpWeb.BoxView do

  use ErpWeb, :view

  def render("box.json", %{box: _box}) do
    %{success: 200}
  end

  def render("boxes.json", %{box: box}) do
    %{plant_id: box.plant_id,
    small: box.small,
    medium: box.medium,
    large: box.large,
    xlarge: box.xlarge}
  end
end
