defmodule Erp.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application


  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Erp.Repo,
      # Start the Telemetry supervisor
      ErpWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Erp.PubSub},
      # Start the Endpoint (http/https)
      ErpWeb.Endpoint
      # Start a worker by calling: Erp.Worker.start_link(arg)
      # {Erp.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Erp.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    ErpWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
