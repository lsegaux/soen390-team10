# Script for populating the database. You can run it as:
#
#     mix run priv/repo/claim-seeds.exs
#


alias Erp.Repo
alias Erp.QualityManagement.ClientClaim


data = [
  %{
    "ID" => 0,
    "name" => "Moun@gmail.com",
    "orderid" => 0,
    "defecttype" => "Damaged Product",
    "description" => "The handlebar was cracked upon arrival",
    "comments" => "This is unacceptable and I expected better",
    "status" => "Pending Review",
    "clientrequest" => "Replace product",
    "requeststatus" => "N/A",
    "time" => ~N[2021-02-01 23:00:07]
  },
  %{
    "ID" => 1,
    "name" => "luc@gmail.com",
    "orderid" => 1,
    "defecttype" => "Incomplete order shipped",
    "description" => "The handlebar was cracked upon arrival",
    "comments" => "This is unacceptable and I expected better",
    "status" => "Pending Review",
    "clientrequest" => "Replace product",
    "requeststatus" => "N/A",
    "time" => ~N[2021-02-01 23:00:07]
  },
  %{
    "ID" => 2,
    "name" => "Marge@gmail.com",
    "orderid" => 2,
    "defecttype" => "Damaged Product",
    "description" => "The handlebar was cracked upon arrival",
    "comments" => "This is unacceptable and I expected better",
    "status" => "Pending Review",
    "clientrequest" => "Replace product",
    "requeststatus" => "N/A",
    "time" => ~N[2021-02-01 23:00:07]
  },
]

Enum.each data, fn(clientclaim) ->

  claim_id = Map.get(clientclaim, "ID")
  name = Map.get(clientclaim, "name")
  orderid= Map.get(clientclaim, "orderid")
  defecttype = Map.get(clientclaim, "defecttype")
  description = Map.get(clientclaim, "description")
  comments = Map.get(clientclaim, "comments")
  status = Map.get(clientclaim, "status")
  clientrequest = Map.get(clientclaim, "clientrequest")
  requeststatus = Map.get(clientclaim, "requeststatus")
  time = Map.get(clientclaim, "time")

  Repo.insert! %ClientClaim{
    id: claim_id,  
    name: name,
    orderid: orderid,
    defecttype: defecttype,
    description: description,
    comments: comments,
    status: status,
    clientrequest: clientrequest,
    requeststatus: requeststatus
  }
end
