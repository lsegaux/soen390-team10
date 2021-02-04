# ERP
SOEN390 Team 10 ERP Project

## How to run with docker

`sudo docker-compose build`
`sudo docker-compose up`

## How to run
- Install [Elixir](https://elixir-lang.org/install.html)
- Install [PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
- Install [Node.js](https://nodejs.org/en/download/)
- Clone repo
- `cd` into `soen390-team10` and then into `erp_frontend`
- Install Node dependencies with `npm install`
- `cd ..` and `cd` into `erp_backend` to enter the backend folder
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

Also, **make sure** to run `git update-index --skip-worktree config/dev.secret.exs` to ignore future changes to that file.
- Create and migrate your database with `mix ecto.setup`
- Start the Phoenix endpoint with `mix phx.server`
- Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.