defmodule ErpWeb.MachineExpenseController do
@moduledoc """
A module that acts as the controller for managing machine expenses.
"""
use ErpWeb, :controller

alias Erp.Scheduling.MachineExpense

  @doc """
  Create a new machine expense.
  """
  def create(conn, %{"id" => machine_id, "amount" => amount, "job" => job}) do
    # amount = Float.parse((Float.parse(end_time) - Float.parse(start_time))*Float.parse(cost_per_hour)) |> elem(0)
    id = Integer.parse(machine_id) |> elem(0)
    with {:ok, %MachineExpense{} = machineexpense} <- MachineExpense.create_expense(id, amount, job) do
      render(conn, "machineexpense.json", machineexpense: machineexpense)
    end
  end

  @doc """
  Show all machine expenses.
  """
  def show_all_machineexpenses(conn, _params) do
    machineexpenses = MachineExpense.list_machineexpenses()
    render(conn, "index.json", machineexpenses: machineexpenses)
  end

  @doc """
  Process a machine expense by ID.
  """
  def process_expense(conn, %{"id" => expense_id}) do
    machineexpense = MachineExpense.get_machineexpense(expense_id)

    with {:ok, %MachineExpense{} = machineexpense} <- MachineExpense.process_expense(machineexpense, True) do
      render(conn, "show.json", machineexpense: machineexpense)
    end
  end

end
