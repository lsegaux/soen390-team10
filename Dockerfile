# ./Dockerfile

# Extend from the official Elixir image
FROM elixir:latest

RUN apt-get update && \
  apt-get install -y postgresql-client

RUN curl -sL https://deb.nodesource.com/setup_15.x | bash -
RUN apt-get install -y nodejs

# Create app directory and copy the Elixir projects into it
RUN mkdir /app
COPY . /app

WORKDIR /app

# Install hex package manager
# By using --force, we don’t need to type “Y” to confirm the installation
RUN mix local.hex --force

RUN echo $(ls)
WORKDIR ./erp_backend
RUN  echo $(ls)
# Compile the project
RUN mix deps.get --force
RUN mix local.rebar --force
RUN mix do compile
RUN echo $(ls)
WORKDIR ../erp_frontend
RUN npm install
WORKDIR ../erp_backend

CMD ["/app/erp_backend/entrypoint.sh"]
