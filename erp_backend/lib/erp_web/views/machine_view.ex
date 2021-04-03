defmodule ErpWeb.MachineView do

  use ErpWeb, :view
  alias ErpWeb.MachineView

  def render("index.json", %{machines: machines}) do
    %{data: render_many(machines, MachineView, "machine.json")}
  end

  def render("machine.json", %{machine: machine}) do
    %{machine_id: machine.machine_id,
      plant_id: machine.plant_id,
      job: machine.job,
      status: machine.status},
      start_time: machine.start_time,
      end_time: machine.end_time,
      cost_per_hour: machine.cost_per_hour
  end

  def render("show.json", %{machine: machine}) do
    %{data: render_one(machine, MachineView, "machine.json")}
  end

end
