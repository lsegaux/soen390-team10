# ./Dockerfile

# Extend from the official Elixir image
FROM ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive 

RUN apt-get update && \
  apt-get install -y postgresql-client

RUN apt-get install -y curl
RUN apt-get install -y wget
RUN apt-get install -y gcc g++ make

RUN curl -sL https://deb.nodesource.com/setup_15.x | bash -
RUN wget https://packages.erlang-solutions.com/erlang-solutions_2.0_all.deb && dpkg -i erlang-solutions_2.0_all.deb
RUN apt-get update

RUN apt-get install -y nodejs
RUN apt-get install -y esl-erlang
RUN apt-get install -y elixir

RUN apt-get install -y build-essential

RUN apt-get install -y python3.6 python python3-pip libssl-dev libffi-dev python3-dev
RUN apt-get install -y software-properties-common

# Set the locale
RUN apt-get -y install locales
RUN sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && \
    locale-gen
ENV LANG en_US.UTF-8  
ENV LANGUAGE en_US:en  
ENV LC_ALL en_US.UTF-8

# Create app directory and copy the Elixir projects into it
RUN mkdir /app
COPY . /app

COPY ./docker_files/repo.ex /app/erp_backend/lib/erp/
COPY ./docker_files/test.exx /app/erp_backend/config/

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