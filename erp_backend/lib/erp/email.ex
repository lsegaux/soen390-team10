defmodule Erp.Email do
    use Bamboo.Phoenix, view: ErpWeb.EmailView

    def order_confirmation_email(email_address, id, bikesAmount, price, time) do
        new_email
        |> to(email_address)
        |> from("390teamten@gmail.com")
        |> subject("Order Confirmation")
        |> render("order_confirmation_email.html", email_address: email_address, id: id, bikesAmount: bikesAmount, price: price, time: time)
    end

    def order_shipped_email(email_address, id, delivery_date) do
        new_email
        |> to(email_address)
        |> from("390teamten@gmail.com")
        |> subject("Order has been shipped.")
        |> render("order_shipped_email.html", email_address: email_address, id: id, delivery_date: delivery_date)
    end

    def order_delivered_email(email_address, id, delivery_date) do
        new_email
        |> to(email_address)
        |> from("390teamten@gmail.com")
        |> subject("Order has been delivered.")
        |> render("order_delivered_email.html", email_address: email_address, id: id, delivery_date: delivery_date)
    end
end