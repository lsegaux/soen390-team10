# Script for populating the database. You can run it as:
#
#     mix run priv/repo/claim-seeds.exs
#


alias Erp.Repo
alias Erp.QualityManagement.VendorClaim


data = [
  %{
    "ID" => 0,
    "name" => "Wilson Inc.",
    "orderid" => 2,
    "defecttype" => "Damaged Product",
    "description" => "The handlebar was cracked upon arrival",
    "comments" => "This is unacceptable and I expected better",
    "status" => "Pending Review",
    "vendorrequest" => "Replace product",
    "requeststatus" => "N/A",
    "time" => ~N[2021-02-01 23:00:07]
  },
  %{
    "ID" => 1,
    "name" => "Wilson Inc.",
    "orderid" => 1,
    "defecttype" => "Damaged Product",
    "description" => "The handlebar was cracked upon arrival",
    "comments" => "This is unacceptable and I expected better",
    "status" => "Pending Review",
    "vendorrequest" => "Replace product",
    "requeststatus" => "N/A",
    "time" => ~N[2021-02-01 23:00:07]
  },
  %{
    "ID" => 2,
    "name" => "Wilson Inc.",
    "orderid" => 0,
    "defecttype" => "Damaged Product",
    "description" => "The handlebar was cracked upon arrival",
    "comments" => "This is unacceptable and I expected better",
    "status" => "Pending Review",
    "vendorrequest" => "Replace product",
    "requeststatus" => "N/A",
    "time" => ~N[2021-02-01 23:00:07]
  },
]

Enum.each data, fn(vendorclaim) ->

  claim_id = Map.get(vendorclaim, "ID")
  name = Map.get(vendorclaim, "name")
  orderid= Map.get(vendorclaim, "orderid")
  defecttype = Map.get(vendorclaim, "defecttype")
  description = Map.get(vendorclaim, "description")
  comments = Map.get(vendorclaim, "comments")
  status = Map.get(vendorclaim, "status")
  vendorrequest = Map.get(vendorclaim, "vendorrequest")
  requeststatus = Map.get(vendorclaim, "requeststatus")
  time = Map.get(vendorclaim, "time")

  Repo.insert! %VendorClaim{
    id: claim_id,  
    name: name,
    orderid: orderid,
    defecttype: defecttype,
    description: description,
    comments: comments,
    status: status,
    vendorrequest: vendorrequest,
    requeststatus: requeststatus
  }
end
