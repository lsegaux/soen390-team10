defmodule ErpWeb.EmailController do
    use ErpWeb, :controller

    alias Erp.Repo

    def send_order_confirmation_email(conn, %{"email" => email_address, "id" => id, "bikesAmount" => bikesAmount, "price" => price, "time" => time}) do
        Erp.Email.order_confirmation_email(email_address, id, bikesAmount, price, time) |> Erp.Mailer.deliver_now
        render(conn, "index.json", email_address: email_address)
    end

    def send_order_shipped_email(conn, %{"email" => email_address, "id" => id}) do
        Erp.Email.order_shipped_email(email_address, id, DateTime.utc_now |> DateTime.add(5*24*60*60, :second)) |> Erp.Mailer.deliver_now
        render(conn, "index.json", email_address: email_address)
    end

    def send_order_delivered_email(conn, %{"email" => email_address, "id" => id}) do
        Erp.Email.order_delivered_email(email_address, id, DateTime.utc_now) |> Erp.Mailer.deliver_now
        render(conn, "index.json", email_address: email_address)
    end
end