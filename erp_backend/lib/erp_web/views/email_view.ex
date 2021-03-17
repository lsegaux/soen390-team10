defmodule ErpWeb.EmailView do
@moduledoc """
A module that implements a basic render method for emails.
"""
    use ErpWeb, :view

    @doc """
    Render index.json and return the inputted email address.
    """
    def render("index.json", %{email_address: email_address}) do
        %{email_address: email_address}
    end
end