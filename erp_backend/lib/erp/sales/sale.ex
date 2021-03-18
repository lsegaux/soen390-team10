defmodule Erp.Sale do
  @moduledoc false

  import Erp.Email
  alias Erp.Repo
  alias Erp.Sales.Order

    @doc false
  def add_sale(params, user) do
    order = %Order{
      price: params["price"]/1,
      bikesAmount: params["quantity"],
      userEmail: user.email,
      time: NaiveDateTime.truncate(NaiveDateTime.utc_now(), :second),
      status: 0
    }

    # insert order into DB and send email
    new_order = Repo.insert!(order)
    order_confirmation_email(new_order.userEmail, new_order.id, new_order.bikesAmount, new_order.price, new_order.time)
    {:ok}
  end
end
