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
- [Story Points Breakdown](#story-points-breakdown)
- [Requirements](#requirements)

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
* [Naming Conventions](https://hexdocs.pm/elixir/naming-conventions.html)
* [Syntax Reference](https://hexdocs.pm/elixir/syntax-reference.html)
* [Writing Documentation](https://hexdocs.pm/elixir/master/writing-documentation.html)
* Refactoring: Redundant code, un-efficient code, code deviating from above-mentioned conventions, code that throws errors or warnings.

## Plugins
* [Bamboo](https://hexdocs.pm/bamboo/Bamboo.Email.html)
* [Material UI](https://material-ui.com/)

## Documents
- [Archived Sprint 1 Documents](https://drive.google.com/drive/u/0/folders/1PYLe4AInMEFgJ4qN0cyOelUjCYGQu3Zq)
- [Archived Sprint 2 Documents](https://drive.google.com/drive/folders/1_UYQV3Wgerz2gDL7s9Q_Hzbu__w_OZe5?usp=sharing)
- [Sprint 3 Documents](https://drive.google.com/drive/folders/1B6jLjwRVpNGaXUyqIHjrhuUsk8yG5dlL?usp=sharing)
  - [Defects Tracking Report](https://docs.google.com/document/d/1BcYrnfd4Y4iT6bJVwd17okzYh-a8vdtIOCb-UB6DALU/edit?usp=sharing)
  - [Functional and Non-Functional Requirements by Sprint](https://docs.google.com/document/d/1Xa1G2cgjGcb52q1HJ05BqpITo3Nu8N6lh9V74oW9NGo/edit?usp=sharing)
  - [Software Architecture Document](https://docs.google.com/document/d/1CULgub9wpv8Vj4_SjcoRbXKTclCF5k4S2K-lXWwttLo/edit?usp=sharing)
  - [Testing Plan](https://docs.google.com/document/d/13DhI4AxX7JT8-5F-fWVhLI-BLDLOXj27-mrw3pmfESo/edit?usp=sharing)
  - [Risk Management and Assessment](https://drive.google.com/file/d/1g39MxZvHYq4Gg1h9cxwC3Qpqdhs_33co/view?usp=sharing)

## Story Points Breakdown
* Low Priority = 3 story points
* Medium Priority = 5 story points
* High Priority = 8 story points

