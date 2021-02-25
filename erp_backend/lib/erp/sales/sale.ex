defmodule Erp.Sale do
  @moduledoc """
  The Sale context.
  """

  alias Erp.Repo
  alias Erp.Sales.Order

  def add_sale(params) do
    order = %Order{
      price: params["price"]/1,
      bikesAmount: params["quantity"],
      userEmail: params["name"],
      time: NaiveDateTime.truncate(NaiveDateTime.utc_now(), :second)
    }
    Repo.insert!(order)
    {:ok}
  end
end
