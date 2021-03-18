defmodule Erp.Guardian.AuthPipeline do
@moduledoc """
A module that acts as a pipeline for the authentication process.
"""
  use Guardian.Plug.Pipeline, otp_app: :Erp,
  module: Erp.Guardian,
  error_handler: Erp.AuthErrorHandler

  @doc false
  plug Guardian.Plug.VerifyHeader, realm: "Bearer"
  plug Guardian.Plug.EnsureAuthenticated
  plug Guardian.Plug.LoadResource
end
