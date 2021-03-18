defmodule Erp.Guardian do
  use Guardian, otp_app: :erp


  @doc """
  Get the subject for the authentication token.
  """
  def subject_for_token(user, _claims) do
    sub = to_string(user.id)
    {:ok, sub}
  end

  @doc false
  def resource_from_claims(claims) do
    id = claims["sub"]
    try do
      resource = Erp.Accounts.get_user!(id)
      {:ok,  resource}
    rescue
      _ -> {:error, :reason_for_error}
    end
  end

end
