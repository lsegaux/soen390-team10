# Script for populating the database. You can run it as:
#
#     mix run priv/repo/machine-seeds.exs
#


alias Erp.Repo
alias Erp.Scheduling.Machine

data = [
  %{
    "ID" => 0,
    "plantID" => 0,
    "job" => "Assembling Wheels",
    "status" => "Available",
    "start_time" => ~T[00:00:00],
    "end_time" => ~T[14:00:00],
    "cost_per_hour" => 10.00,
    "production_per_hour" => 10
  },
  %{
    "ID" => 1,
    "plantID" => 0,
    "job" => "Assembling Frames",
    "status" => "Available",
    "start_time" => ~T[00:00:00],
    "end_time" => ~T[14:00:00],
    "cost_per_hour" => 15.00,
    "production_per_hour" => 5
  },%{
    "ID" => 2,
    "plantID" => 0,
    "job" => "Assembling Seats",
    "status" => "Available",
    "start_time" => ~T[00:00:00],
    "end_time" => ~T[14:00:00],
    "cost_per_hour" => 12.00,
    "production_per_hour" => 15
  },%{
    "ID" => 3,
    "plantID" => 0,
    "job" => "Assembling Pedals",
    "status" => "Available",
    "start_time" => ~T[16:00:00],
    "end_time" => ~T[22:00:00],
    "cost_per_hour" => 10.50,
    "production_per_hour" => 25
  },%{
    "ID" => 4,
    "plantID" => 0,
    "job" => "Packaging",
    "status" => "Available",
    "start_time" => ~T[05:00:00],
    "end_time" => ~T[18:00:00],
    "cost_per_hour" => 15.00,
    "production_per_hour" => 25
  },
  %{
    "ID" => 5,
    "plantID" => 1,
    "job" => "Assembling Wheels",
    "status" => "Available",
    "start_time" => ~T[00:00:00],
    "end_time" => ~T[14:00:00],
    "cost_per_hour" => 10.00,
    "production_per_hour" => 10
  },
  %{
    "ID" => 6,
    "plantID" => 1,
    "job" => "Assembling Frames",
    "status" => "Available",
    "start_time" => ~T[00:00:00],
    "end_time" => ~T[14:00:00],
    "cost_per_hour" => 15.00,
    "production_per_hour" => 5
  },%{
    "ID" => 7,
    "plantID" => 1,
    "job" => "Assembling Seats",
    "status" => "Available",
    "start_time" => ~T[00:00:00],
    "end_time" => ~T[14:00:00],
    "cost_per_hour" => 12.00,
    "production_per_hour" => 15
  },%{
    "ID" => 8,
    "plantID" => 1,
    "job" => "Assembling Pedals",
    "status" => "Available",
    "start_time" => ~T[00:00:00],
    "end_time" => ~T[14:00:00],
    "cost_per_hour" => 10.50,
    "production_per_hour" => 25
  },%{
    "ID" => 9,
    "plantID" => 1,
    "job" => "Packaging",
    "status" => "Available",
    "start_time" => ~T[05:00:00],
    "end_time" => ~T[18:00:00],
    "cost_per_hour" => 15.00,
    "production_per_hour" => 25
  },
  %{
    "ID" => 10,
    "plantID" => 2,
    "job" => "Assembling Wheels",
    "status" => "Available",
    "start_time" => ~T[00:00:00],
    "end_time" => ~T[14:00:00],
    "cost_per_hour" => 10.00,
    "production_per_hour" => 10
  },
  %{
    "ID" => 11,
    "plantID" => 2,
    "job" => "Assembling Frames",
    "status" => "Available",
    "start_time" => ~T[00:00:00],
    "end_time" => ~T[14:00:00],
    "cost_per_hour" => 15.00,
    "production_per_hour" => 5
  },%{
    "ID" => 12,
    "plantID" => 2,
    "job" => "Assembling Seats",
    "status" => "Available",
    "start_time" => ~T[00:00:00],
    "end_time" => ~T[14:00:00],
    "cost_per_hour" => 12.00,
    "production_per_hour" => 15
  },%{
    "ID" => 13,
    "plantID" => 2,
    "job" => "Assembling Pedals",
    "status" => "Available",
    "start_time" => ~T[00:00:00],
    "end_time" => ~T[14:00:00],
    "cost_per_hour" => 10.50,
    "production_per_hour" => 25
  },%{
    "ID" => 14,
    "plantID" => 2,
    "job" => "Packaging",
    "status" => "Available",
    "start_time" => ~T[05:00:00],
    "end_time" => ~T[18:00:00],
    "cost_per_hour" => 15.00,
    "production_per_hour" => 25
  },
]

Enum.each data, fn(machine) ->

  machine_id = Map.get(machine, "ID")
  plant_id = Map.get(machine, "plantID")
  job = Map.get(machine, "job")
  status = Map.get(machine, "status")
  start_time = Map.get(machine, "start_time")
  end_time = Map.get(machine, "end_time")
  cost_per_hour = Map.get(machine, "cost_per_hour")
  production_per_hour = Map.get(machine, "production_per_hour")

  Repo.insert! %Machine{
    machine_id: machine_id,
    plant_id: plant_id,
    job: job,
    status: status,
    start_time: start_time,
    end_time: end_time,
    cost_per_hour: cost_per_hour,
    production_per_hour: production_per_hour
  }
end
