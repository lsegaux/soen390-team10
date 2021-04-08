# Script for populating the database. You can run it as:
#
#     mix run priv/repo/users-seed.exs
#


alias Erp.Repo
alias Erp.Accounts.User


data = [
  %{
    "email" => "test1@gmail.com",
  },
  %{
    "email" => "test2@mail.com"
  }
]

Enum.each data, fn(user) ->

  email = Map.get(user, "email")

  Repo.insert! %User{
    email: email
  }
end
