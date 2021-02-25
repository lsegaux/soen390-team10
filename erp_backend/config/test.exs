use Mix.Config

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :erp, Erp.Repo,
  username: "postgres",
  password: "postgres",
  database: "erp_test#{System.get_env("MIX_TEST_PARTITION")}",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :erp, ErpWeb.Endpoint,
  http: [port: 4002],
  server: false

#Recaptcha config
config :google_recaptcha,
  api_url: "https://www.google.com/recaptcha/api/siteverify",
  public_key: "6LcjqWQaAAAAAA_KNpNiiQhQT7rHtpo_AJySY_64",
  secret_key: "6LcjqWQaAAAAAB3mCgCh_ndIHaPXozh10-nyitpZ",
  enabled: true

# Print only warnings and errors during test
config :logger, level: :warn
