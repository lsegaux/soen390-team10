defmodule ErpWeb.MaterialsExpenseController do
  use ErpWeb, :controller
  import Ecto.Query, warn: false

  alias Erp.Repo

  alias Erp.Production
  alias Erp.Production.MaterialsExpense

  def show(conn, %{"id" => expense_id}) do
    materialsexpense = Erp.Production.MaterialsExpense.get_materialsexpense!(expense_id)
    render(conn, "show.json", materialsexpense: materialsexpense)
  end

  def show_all_materialsexpenses(conn, _params) do
    materialsexpenses = Erp.Production.MaterialsExpense.list_materialsexpenses()
    render(conn, "index.json", materialsexpenses: materialsexpenses)
  end

  def get_materials_by_expense_id(conn, %{"id" => expense_id}) do
    materialsexpense = Erp.Production.MaterialsExpense.get_materialsexpense(expense_id)
    render(conn, "index.json", materialsexpense: materialsexpense)
  end

  def process_expense(conn, %{"id" => expense_id}) do
    materialsexpense = MaterialsExpense.get_materialsexpense!(expense_id)

    with {:ok, %MaterialsExpense{} = materialsexpense} <- MaterialsExpense.process_expense(materialsexpense, true) do
      render(conn, "show.json", materialsexpense: materialsexpense)
    end
  end

  def create(conn, %{"amount" => amount, "company" => company}) do
    with {:ok, %MaterialsExpense{} = materialsexpense} <- MaterialsExpense.create_expense(amount, company) do
      render(conn, "materialsexpense.json", materialsexpense: materialsexpense)
    end
  end
end
