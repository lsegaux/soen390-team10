defmodule ErpWeb.ProductView do

  use ErpWeb, :view
  alias ErpWeb.ProductView

  def render("index.json", %{products: products}) do
    %{data: render_many(products, ProductView, "product.json")}
  end

  def render("product.json", %{product: product}) do
    %{product_id: product.product_id,
      name: product.name}
  end

  def render("show.json", %{product: product}) do
    %{data: render_one(product, ProductView, "product.json")}
  end

end
