defmodule Erp.Sale do
  @moduledoc false

  alias Erp.Repo
  alias Erp.Sales.Order

  @doc false
  def add_sale(params) do
    order = %Order{
      price: params["price"]/1,
      bikesAmount: params["quantity"],
      userEmail: params["email"],
      time: NaiveDateTime.truncate(NaiveDateTime.utc_now(), :second)
    }
    Repo.insert!(order)
    {:ok}
  end
end
