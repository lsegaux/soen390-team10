defmodule ErpWeb.VendorClaimView do

  use ErpWeb, :view
  alias ErpWeb.VendorClaimView

  def render("index.json", %{vendorclaim: vendorclaim}) do
    %{data: render_many(vendorclaim, VendorClaimView, "vendorclaim.json")}
  end

  def render("vendorclaim.json", %{vendor_claim: vendor_claim}) do
    %{
      claim_id: vendor_claim.id,
      name: vendor_claim.name,
      vendorrequest: vendor_claim.vendorrequest,
      comments: vendor_claim.comments,
      defecttype: vendor_claim.defecttype,
      description: vendor_claim.description,
      orderid: vendor_claim.orderid,
      requeststatus: vendor_claim.requeststatus,
      status: vendor_claim.status}
  end

  def render("show.json", %{vendor_claim: vendor_claim}) do
    %{data: render_one(vendor_claim, VendorClaimView, "vendorclaim.json")}
  end

end
