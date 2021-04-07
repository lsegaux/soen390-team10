defmodule Erp.Machine do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, warn: false

  alias Erp.Repo
  alias Erp.Machine

  @derive {Jason.Encoder, only: [:machine_id, :plant_id, :job, :status, :start_time, :end_time, :cost_per_hour]}
  @primary_key {:machine_id, :integer, []}
  @derive {Phoenix.Param, key: :machine_id}
  schema "machines" do
    field :plant_id, :id
    field :job, :string
    field :status, :string
    field :start_time, :time
    field :end_time, :time
    field :cost_per_hour, :float

    timestamps()
  end

  @doc false
  def changeset(machine, attrs) do
    machine
    |> cast(attrs, [:job, :status, :start_time, :end_time, :cost_per_hour])
    |> validate_required([:job, :status, :start_time, :end_time, :cost_per_hour])
    |> unique_constraint(:machine_id)
    |> foreign_key_constraint(:plant_id)
  end

  @doc """
  Gets a single machine by ID
  Raises `Ecto.NoResultsError` if the machine does not exist.
  ## Examples
      iex> get_machine!(123)
      %Machine{}
      iex> get_user!(asdjas)
      ** (Ecto.NoResultsError)
  """
  def get_machine!(id), do: Repo.get!(Machine, id)

  @doc """
  Returns the list of machines.
  ## Examples
      iex> list_machines()
      [%machine{}, ...]
  """
  def list_machines() do
    Repo.all(Machine)
  end

    @doc """
  Gets list of machines by plant ID.
  Raises `Ecto.NoResultsError` if the User does not exist.
  ## Examples
      iex> get_machines_by_plant_id!(123)
      %User{}
      iex> get_machines_by_plant_id!(asdjansd)
      ** (Ecto.NoResultsError)
  """
  def get_machines_by_plant_id(id) do
    query = from(m in Machine, where: m.plant_id == ^id, select: [:machine_id, :plant_id, :cost_per_hour, :end_time, :job, :start_time, :status])
    Repo.all(query)
  end

  @doc """
  Updates a machine status
  ## Examples
      iex> update_status(machine, %{field: new_value})
      {:ok, %Machine{}}
      iex> update_status(machine, %{field: bad_value})
      {:error, %Ecto.Changeset{}}
  """
  def update_status(%Machine{} = machine, status) do
    machine
    |> Machine.changeset(%{status: status})
    |> Repo.update()
  end
end
