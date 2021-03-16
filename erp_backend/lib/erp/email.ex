defmodule Erp.Email do
    use Bamboo.Phoenix, view: ErpWeb.EmailView

    def welcome_text_email(email_address) do
        new_email
        |> to(email_address)
        |> from("390teamten@gmail.com")
        |> subject("Welcome!")
        |> text_body("Welcome to Adrenaline ERP")
    end
end