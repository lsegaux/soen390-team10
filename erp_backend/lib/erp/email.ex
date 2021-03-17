defmodule Erp.Email do
@moduledoc """
A module that contains the raw methods for emailing (called by controller).
"""
    use Bamboo.Phoenix, view: ErpWeb.EmailView

    @doc """
    Send a confirmation email for a bike order.
    """
    def order_confirmation_email(email_address, id, bikesAmount, price, time) do
        new_email
        |> to(email_address)
        |> from("390teamten@gmail.com")
        |> subject("Order Confirmation")
        |> render("order_confirmation_email.html", email_address: email_address, id: id, bikesAmount: bikesAmount, price: price, time: time)
    end

    @doc """
    Send an email notifying that a bike order has been shipped.
    """
    def order_shipped_email(email_address, id) do
        new_email
        |> to(email_address)
        |> from("390teamten@gmail.com")
        |> subject("Order has been shipped.")
        |> render("order_shipped_email.html", email_address: email_address, id: id)
    end

    @doc """
    Send an email notifying that a bike order has been delivered.
    """
    def order_delivered_email(email_address, id, delivery_date) do
        new_email
        |> to(email_address)
        |> from("390teamten@gmail.com")
        |> subject("Order has been delivered.")
        |> render("order_delivered_email.html", email_address: email_address, id: id, delivery_date: delivery_date)
    end
end