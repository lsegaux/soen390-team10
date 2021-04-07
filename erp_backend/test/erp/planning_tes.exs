defmodule Erp.PlanningTest do
  use Erp.DataCase

  alias Erp.Planning

  describe "tasks" do
    alias Erp.Planning.Task

    @valid_attrs %{description: "some description", employee_name: "some employee_name", end_time: ~N[2010-04-17 14:00:00], start_time: ~N[2010-04-17 14:00:00], status: true, task_name: "some task_name", task_type: "some task_type"}
    @update_attrs %{description: "some updated description", employee_name: "some updated employee_name", end_time: ~N[2011-05-18 15:01:01], start_time: ~N[2011-05-18 15:01:01], status: false, task_name: "some updated task_name", task_type: "some updated task_type"}
    @invalid_attrs %{description: nil, employee_name: nil, end_time: nil, start_time: nil, status: nil, task_name: nil, task_type: nil}

    def task_fixture(attrs \\ %{}) do
      {:ok, task} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Planning.create_task()

      task
    end

    test "list_tasks/0 returns all tasks" do
      task = task_fixture()
      assert Planning.list_tasks() == [task]
    end

    test "get_task!/1 returns the task with given id" do
      task = task_fixture()
      assert Planning.get_task!(task.id) == task
    end

    test "create_task/1 with valid data creates a task" do
      assert {:ok, %Task{} = task} = Planning.create_task(@valid_attrs)
      assert task.description == "some description"
      assert task.employee_name == "some employee_name"
      assert task.end_time == ~N[2010-04-17 14:00:00]
      assert task.start_time == ~N[2010-04-17 14:00:00]
      assert task.status == true
      assert task.task_name == "some task_name"
      assert task.task_type == "some task_type"
    end

    test "create_task/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Planning.create_task(@invalid_attrs)
    end

    test "update_task/2 with valid data updates the task" do
      task = task_fixture()
      assert {:ok, %Task{} = task} = Planning.update_task(task, @update_attrs)
      assert task.description == "some updated description"
      assert task.employee_name == "some updated employee_name"
      assert task.end_time == ~N[2011-05-18 15:01:01]
      assert task.start_time == ~N[2011-05-18 15:01:01]
      assert task.status == false
      assert task.task_name == "some updated task_name"
      assert task.task_type == "some updated task_type"
    end

    test "update_task/2 with invalid data returns error changeset" do
      task = task_fixture()
      assert {:error, %Ecto.Changeset{}} = Planning.update_task(task, @invalid_attrs)
      assert task == Planning.get_task!(task.id)
    end

    test "delete_task/1 deletes the task" do
      task = task_fixture()
      assert {:ok, %Task{}} = Planning.delete_task(task)
      assert_raise Ecto.NoResultsError, fn -> Planning.get_task!(task.id) end
    end

    test "change_task/1 returns a task changeset" do
      task = task_fixture()
      assert %Ecto.Changeset{} = Planning.change_task(task)
    end
  end
end
