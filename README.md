# <p align="center">SOEN Team 10 Minicap Project.</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/60011793/111355331-a3049880-865d-11eb-9716-58cc795aff6a.PNG">
</p>

## Table of Contents

- [Docker Setup](#docker-setup)
- [Quick Start](#quick-start)
- [Coding Conventions](#code-conventions)
- [Plugins](#plugins)
- [Documents](#documents)
- [Design Patterns](#design-patterns)
- [Story Points Breakdown](#story-points-breakdown)

## Docker Setup

`sudo docker-compose build`
`sudo docker-compose up`

## Quick Start

- Install [Elixir](https://elixir-lang.org/install.html)
- Install [PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
- Install [Node.js](https://nodejs.org/en/download/)
- Clone repo
- `cd` into `soen390-team10` and then into `erp_frontend`
- Install Node dependencies with `npm install`
- `cd ..` and `cd` into `erp_backend` to enter the backend folder
- Install dependencies with `mix deps.get`
- If your PostgreSQL username, password and database are all set to default values (they're all `"postgres"`), you can skip the following step. If you've made changes to those default values (different user, db name or password, then you need to follow the next step)
- Override the config values by adding the following code to `dev.secret.exs`.

```elixir
config :erp, Erp.Repo,
  username: "custom_username",
  password: "custom_password",
  database: "custom_db_name"
```

Obviously, change the strings to the proper values, and remove the ones you don't need to override.

Also, **make sure** to run `git update-index --skip-worktree config/dev.secret.exs` to ignore future changes to that file.

- Create and migrate your database with `mix ecto.setup`
- Start the Phoenix endpoint with `mix phx.server`
- Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## Code Conventions

- [Naming Conventions](https://hexdocs.pm/elixir/naming-conventions.html)
- [Syntax Reference](https://hexdocs.pm/elixir/syntax-reference.html)
- [Writing Documentation](https://hexdocs.pm/elixir/master/writing-documentation.html)
- Refactoring: Redundant code, un-efficient code, code deviating from above-mentioned conventions, code that throws errors or warnings.

## Plugins

- [Bamboo](https://hexdocs.pm/bamboo/Bamboo.Email.html)
- [Material UI](https://material-ui.com/)

## Documents

- [Archived Sprint 1 Documents](https://drive.google.com/drive/u/0/folders/1PYLe4AInMEFgJ4qN0cyOelUjCYGQu3Zq)
- [Archived Sprint 2 Documents](https://drive.google.com/drive/folders/1_UYQV3Wgerz2gDL7s9Q_Hzbu__w_OZe5?usp=sharing)
- [Archived Sprint 3 Documents](https://drive.google.com/drive/folders/1sL3-K02DejM-9btZ6wOhdOBM3AuiVuSn)
- [Sprint 4 Documents](https://drive.google.com/drive/folders/153e6PfOgdsG60jTNcYihBsS9oi7OymQE?usp=sharing)
  - [Defects Tracking Report](https://docs.google.com/document/d/1FibHTtkQDGktG1p-40c_oIVrbjTqZuFTpsGr1rOTkfs/edit?usp=sharing)
  - [Software Architecture Document](https://docs.google.com/document/d/1DygnyLZ3quXJxfKDcE8rJowTrgndBHpDG5mB0Bly4zE/edit?usp=sharing)
  - [Testing Plan](https://docs.google.com/document/d/1Vl59DCKibHDG8qfXTiec_GBnYHlUoAMhFKLu5Qk_CL4/edit?usp=sharing)
  - [Risk Management and Assessment](https://drive.google.com/file/d/1pHEhs5PbWUEEeXiR84owgbOdhvITNRME/view?usp=sharing)

## Design Patterns

- [Model-View-Controller (Structural)](https://github.com/lsegaux/soen390-team10/tree/main/erp_backend/lib/erp_web)
- [The Pipeline (Architectural)](https://github.com/lsegaux/soen390-team10/blob/main/erp_backend/lib/erp/email.ex)
  - [Explanation](https://mattpruitt.com/articles/the-pipeline)
- [State (Behavioral)](https://github.com/lsegaux/soen390-team10/blob/main/erp_backend/lib/erp/accounts/accounts.ex)
  - [Explanation](https://refactoring.guru/design-patterns/state)
- [Data Mapper (Architectural)](https://github.com/lsegaux/soen390-team10/blob/main/erp_backend/lib/erp/accounts/user.ex)
  - [Explanation](https://github.com/elixir-ecto/ecto)

## Testing
* [Testing Plan](https://docs.google.com/document/d/1Vl59DCKibHDG8qfXTiec_GBnYHlUoAMhFKLu5Qk_CL4/edit?usp=sharing)
---
* [Backend Testing System](https://github.com/lsegaux/soen390-team10/tree/main/erp_backend/test)
---
* [Frontend Testing System](https://github.com/lsegaux/soen390-team10/tree/main/erp_frontend/cypress)
---
## Story Points Breakdown

- Low Priority = 3 story points
- Medium Priority = 5 story points
- High Priority = 8 story points
