# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :erp,
  ecto_repos: [Erp.Repo]

# Configures the endpoint
config :erp, ErpWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "wFmwpkr+tDz2942SMsbNUrWTcsHY83aCPd5uxfY3op3EKPBfNZQMNCweqxApdEN2",
  render_errors: [view: ErpWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Erp.PubSub,
  live_view: [signing_salt: "gNetU91v"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Guardian config
config :erp, Erp.Guardian,
       issuer: "erpIssuer",
       secret_key: "Vx7O2Iaq8GUPAdSmm+w06vnEBgcVbIcSeFCzmXBqU93Uf0rAmHzCe3pokc0fk7/S"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
