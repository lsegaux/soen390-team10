defmodule ErpWeb.TaskControllerTest do
  use ErpWeb.ConnCase

  alias Erp.Planning

  @create_attrs %{description: "some description", employee_name: "some employee_name", end_time: ~N[2010-04-17 14:00:00], start_time: ~N[2010-04-17 14:00:00], status: true, task_name: "some task_name", task_type: "some task_type"}
  @update_attrs %{description: "some updated description", employee_name: "some updated employee_name", end_time: ~N[2011-05-18 15:01:01], start_time: ~N[2011-05-18 15:01:01], status: false, task_name: "some updated task_name", task_type: "some updated task_type"}
  @invalid_attrs %{description: nil, employee_name: nil, end_time: nil, start_time: nil, status: nil, task_name: nil, task_type: nil}

  def fixture(:task) do
    {:ok, task} = Planning.create_task(@create_attrs)
    task
  end

  describe "index" do
    test "lists all tasks", %{conn: conn} do
      conn = get(conn, Routes.task_path(conn, :index))
      assert html_response(conn, 200) =~ "Listing Tasks"
    end
  end

  describe "new task" do
    test "renders form", %{conn: conn} do
      conn = get(conn, Routes.task_path(conn, :new))
      assert html_response(conn, 200) =~ "New Task"
    end
  end

  describe "create task" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, Routes.task_path(conn, :create), task: @create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == Routes.task_path(conn, :show, id)

      conn = get(conn, Routes.task_path(conn, :show, id))
      assert html_response(conn, 200) =~ "Show Task"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.task_path(conn, :create), task: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Task"
    end
  end

  describe "edit task" do
    setup [:create_task]

    test "renders form for editing chosen task", %{conn: conn, task: task} do
      conn = get(conn, Routes.task_path(conn, :edit, task))
      assert html_response(conn, 200) =~ "Edit Task"
    end
  end

  describe "update task" do
    setup [:create_task]

    test "redirects when data is valid", %{conn: conn, task: task} do
      conn = put(conn, Routes.task_path(conn, :update, task), task: @update_attrs)
      assert redirected_to(conn) == Routes.task_path(conn, :show, task)

      conn = get(conn, Routes.task_path(conn, :show, task))
      assert html_response(conn, 200) =~ "some updated description"
    end

    test "renders errors when data is invalid", %{conn: conn, task: task} do
      conn = put(conn, Routes.task_path(conn, :update, task), task: @invalid_attrs)
      assert html_response(conn, 200) =~ "Edit Task"
    end
  end

  describe "delete task" do
    setup [:create_task]

    test "deletes chosen task", %{conn: conn, task: task} do
      conn = delete(conn, Routes.task_path(conn, :delete, task))
      assert redirected_to(conn) == Routes.task_path(conn, :index)
      assert_error_sent 404, fn ->
        get(conn, Routes.task_path(conn, :show, task))
      end
    end
  end

  defp create_task(_) do
    task = fixture(:task)
    %{task: task}
  end
end
