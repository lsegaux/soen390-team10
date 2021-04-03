# Script for populating the database. You can run it as:
#
#     mix run priv/repo/task-seeds.exs
#


alias Erp.Repo
alias Erp.Planning.Task


data = [
  %{
    "task_name" => "Fix Order #02314",
    "task_type" => "Warranty",
    "description" => "Warranty claim for order #02314 was approved and needs to be taken care of",
    "start_time" => ~N[2021-03-30 23:00:07],
    "end_time" => ~N[2021-04-05 23:00:07],
    "employee_name" => "Jerry Seinfield",
    "status" => true,
  },
  %{
    "task_name" => "Discuss payroll with Jerry",
    "task_type" => "Administrative",
    "description" => "Jerry had an issue with his payroll, I'm going to help him out",
    "start_time" => ~N[2021-04-07 23:00:07],
    "end_time" => ~N[2021-05-05 23:00:07],
    "employee_name" => "Adam Sandler",
    "status" => true,
  },
  %{
    "task_name" => "Monthly inventory with staff",
    "task_type" => "Inventory",
    "description" => "The inventory session that takes place every month to verify that our inventory corresponds with out expected values",
    "start_time" => ~N[2021-03-30 23:00:07],
    "end_time" => ~N[2021-04-10 23:00:07],
    "employee_name" => "Jennifer Aniston",
    "status" => true,
  }
]

Enum.each data, fn(task) ->

  task_name = Map.get(task, "task_name")
  task_type= Map.get(task, "task_type")
  description = Map.get(task, "description")
  start_time = Map.get(task, "start_time")
  end_time = Map.get(task, "end_time")
  employee_name = Map.get(task, "employee_name")
  status = Map.get(task, "status")

  Repo.insert! %Task{
    task_name: task_name,
    task_type: task_type,
    description: description,
    start_time: start_time,
    end_time: end_time,
    employee_name: employee_name,
    status: status,
  }
end
