defmodule ErpWeb.EmailController do
    use ErpWeb, :controller

    alias Erp.Repo

    def send_email(conn, %{"email" => email_address}) do
        Erp.Email.welcome_text_email(email_address) |> Erp.Mailer.deliver_now
        render(conn, "index.json", email_address: email_address)
    end
end