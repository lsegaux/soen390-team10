defmodule ErpWeb.ClientClaimView do

  use ErpWeb, :view
  alias ErpWeb.ClientClaimView

  def render("index.json", %{clientclaim: clientclaim}) do
    %{data: render_many(clientclaim, ClientClaimView, "clientclaim.json")}
  end

  def render("clientclaim.json", %{client_claim: client_claim}) do
    %{
      claim_id: vendor_claim.id,
      name: client_claim.name,
      clientrequest: client_claim.clientrequest,
      comments: client_claim.comments,
      defecttype: client_claim.defecttype,
      description: client_claim.description,
      orderid: client_claim.orderid,
      requeststatus: client_claim.requeststatus,
      status: client_claim.status}
  end

  def render("show.json", %{clientclaim: clientclaim}) do
    %{data: render_one(clientclaim, ClientClaimView, "clientclaim.json")}
  end

end
