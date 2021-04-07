defmodule ErpWeb.TaskView do
  use ErpWeb, :view
  alias ErpWeb.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json", as: :task)}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      task_name: task.task_name,
      description: task.description,
      start_time: task.start_time,
      end_time: task.end_time,
      employee_name: task.employee_name,
      status: task.status,
      task_type: task.task_type}
  end

end
