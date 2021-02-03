defmodule ErpWeb.Router do
  use ErpWeb, :router

  alias Erp.Guardian

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :jwt_authenticated do
    plug Guardian.AuthPipeline
  end

  scope "/api/v1", ErpWeb do
    pipe_through [:api, :jwt_authenticated]

    get "/my_user", UserController, :show
  end
  
  scope "/api/v1", ErpWeb do
    pipe_through :api

    post "/sign_up", UserController, :create
    post "/sign_in", UserController, :sign_in
    get "/production", ProductionController, :get_production_info
  end

  scope "/", ErpWeb do
    pipe_through :browser

    get "/*path", PageController, :index
  end

end
