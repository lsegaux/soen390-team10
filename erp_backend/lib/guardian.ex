defmodule Erp.Guardian do
  use Guardian, otp_app: :erp

  def subject_for_token(user, _claims) do
    sub = to_string(user.id)
    {:ok, sub}
  end

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
