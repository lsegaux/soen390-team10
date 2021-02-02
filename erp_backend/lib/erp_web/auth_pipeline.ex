defmodule Erp.Guardian.AuthPipeline do
  use Guardian.Plug.Pipeline, otp_app: :Erp,
  module: Erp.Guardian,
  error_handler: Erp.AuthErrorHandler

  plug Guardian.Plug.VerifyHeader, realm: "Bearer"
  plug Guardian.Plug.EnsureAuthenticated
  plug Guardian.Plug.LoadResource
end