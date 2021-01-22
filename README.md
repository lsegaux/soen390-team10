# ERP
SOEN390 Team 10 ERP Project

## How to run
- Install [Elixir](https://elixir-lang.org/install.html)
- Install [PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
- Clone repo
- `cd` into `soen390-team10` and then into `erp_backend`
- Install dependencies with `mix deps.get`
- If your PostgreSQL username, password and database are all set to default values (they're all `"postgres"`), you can skip the following step. If you've made changes to those default values (different user, db name or password, then you need to follow the next step)
- Override the config values by adding the following code to `dev.secret.exs`.
```elixir
config :erp, Erp.Repo,
  username: "custom_username",
  password: "custom_password",
  database: "custom_db_name"
```
Obviously, change the strings to the proper values, and remove the ones you don't need to override.
- Create and migrate your database with `mix ecto.setup`
- Install [Node.js](https://nodejs.org/en/download/)
- `cd` inside the `assets` directory, and install Node dependencies with `npm install`
- `cd` back up to the root of the backend folder, and start the Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.