defmodule ErpWeb.EmailView do
    use ErpWeb, :view
    alias ErpWeb.EmailView

    def render("index.json", %{email_address: email_address}) do
        %{email_address: email_address}
    end
end