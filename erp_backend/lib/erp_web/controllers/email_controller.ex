defmodule ErpWeb.EmailController do
@moduledoc """
A module that acts as the controller for system emailing.
"""
    use ErpWeb, :controller

    @doc """
    Send a confirmation email for a bike order.
    """
    def send_order_confirmation_email(conn, %{"email" => email_address, "id" => id, "bikesAmount" => bikesAmount, "price" => price, "time" => time}) do
        Erp.Email.order_confirmation_email(email_address, id, bikesAmount, price, time) |> Erp.Mailer.deliver_now
        render(conn, "index.json", email_address: email_address)
    end

    @doc """
    Send an email notifying that a bike order has been shipped.
    """
    def send_order_shipped_email(conn, %{"email" => email_address, "id" => id}) do
        Erp.Email.order_shipped_email(email_address, id, DateTime.utc_now |> DateTime.add(5*24*60*60, :second)) |> Erp.Mailer.deliver_now
        render(conn, "index.json", email_address: email_address)
    end

    @doc """
    Send an email notifying that a bike order has been delivered.
    """
    def send_order_delivered_email(conn, %{"email" => email_address, "id" => id}) do
        Erp.Email.order_delivered_email(email_address, id, DateTime.utc_now) |> Erp.Mailer.deliver_now
        render(conn, "index.json", email_address: email_address)
    end
end
