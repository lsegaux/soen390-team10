defmodule ErpWeb.MachineExpenseView do

  use ErpWeb, :view
  alias ErpWeb.MachineExpenseView

  def render("index.json", %{machineexpenses: machineexpenses}) do
    %{data: render_many(machineexpenses, MachineExpenseView, "machineexpense.json", as: :machineexpense)}
  end

  def render("machineexpense.json", %{machineexpense: machineexpense}) do
    %{machine_id: machineexpense.machine_id,
      amount: machineexpense.amount,
      processed: machineexpense.processed,
      job: machineexpense.job,
      inserted_at: machineexpense.inserted_at}
  end

  def render("show.json", %{machineexpense: machineexpense}) do
    %{data: render_one(machineexpense, MachineExpenseView, "machineexpense.json", as: :machineexpense)}
  end

end
