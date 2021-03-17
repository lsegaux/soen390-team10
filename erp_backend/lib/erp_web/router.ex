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

  pipeline :restrict_client do
    plug ErpWeb.Plugs.BlockClients
  end

  scope "/api/v1", ErpWeb do
    pipe_through [:api, :jwt_authenticated, :restrict_client]

    get "/employee_test", UserController, :employee_test

    get  "/my_user", UserController, :show
    get  "/packaging/boxes/:id", BoxController, :get_boxes_by_plant
    post "/packaging/order_boxes", BoxController, :order_boxes
    post "/packaging/create_package", PackagingController, :create_package
    post "/packaging/reduce_quantity", BoxController, :reduce_quantity

    get  "/production", ProductionController, :get_production_info
    get  "/production/plants", PlantController, :show_all_plants
    get  "/production/plant/:id", PlantController, :show
    get  "/production/materials", MaterialController, :show_all_materials
    get  "/production/material/:id", MaterialController, :show
    get  "/production/material/plant_id/:id", MaterialController, :get_materials_by_plant_id
    get  "/production/expenses", MaterialsExpenseController, :show_all_materialsexpenses
    post "/production/expense/create/amount/:amount", MaterialsExpenseController, :create
    post "/production/expense/process/:id", MaterialsExpenseController, :process_expense
    post "/production/material/update/material_id/:id/quantity/:quantity", MaterialController, :update_quantity

    get  "/quality_management/vendor_claim", VendorClaimController, :show_all_vendor_claim
    post "/quality_management/vendor_claim/newClaim", VendorClaimController, :create
    post "/quality_management/vendor_claim/updateDefectStatus/id/:id", VendorClaimController, :update

    post "/sale", SaleController, :process_sale

    get "/accounting/ledger", OrderController, :show_all_orders
    get "/sendemail", EmailController, :send_email

    resources "/vendorclaim", VendorClaimController
  end

  scope "/api/v1", ErpWeb do
    pipe_through [:api, :jwt_authenticated]

    get "/client_test", UserController, :client_test

    get  "/quality_management/client_claim", ClientClaimController, :show_all_client_claim
    post "/quality_management/client_claim/newClaim", ClientClaimController, :create
    post "/quality_management/client_claim/updateDefectStatus/id/:id", ClientClaimController, :update

    resources "/clientclaim", ClientClaimController
  end

  scope "/api/v1", ErpWeb do
    pipe_through :api

    post "/sign_up", UserController, :create
    post "/sign_in", UserController, :sign_in
  end

  scope "/", ErpWeb do
    pipe_through :browser

    get "/*path", PageController, :index
  end

end
