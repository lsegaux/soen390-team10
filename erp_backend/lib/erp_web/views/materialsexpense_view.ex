defmodule ErpWeb.MaterialsExpenseView do

  use ErpWeb, :view
  alias ErpWeb.MaterialsExpenseView

  def render("index.json", %{materialsexpenses: materialsexpenses}) do
    %{data: render_many(materialsexpenses, MaterialsExpenseView, "materialsexpense.json", as: :materialsexpense)}
  end

  def render("materialsexpense.json", %{materialsexpense: materialsexpense}) do
    %{id: materialsexpense.id,
      amount: materialsexpense.amount,
      processed: materialsexpense.processed}
  end

  def render("show.json", %{materialsexpense: materialsexpense}) do
    %{data: render_one(materialsexpense, MaterialsExpenseView, "materialsexpense.json", as: :materialsexpense)}
  end

end
