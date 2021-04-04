# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Erp.Repo.insert!(%Erp.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
Code.require_file("priv/repo/plant-seeds.exs")
Code.require_file("priv/repo/product-seeds.exs")
Code.require_file("priv/repo/part-seeds.exs")
Code.require_file("priv/repo/material-seeds.exs")
Code.require_file("priv/repo/users-seed.exs")
Code.require_file("priv/repo/orders-seed.exs")
Code.require_file("priv/repo/clientclaim-seeds.exs")
Code.require_file("priv/repo/vendorclaim-seeds.exs")
Code.require_file("priv/repo/box-seeds.exs")
Code.require_file("priv/repo/machine-seeds.exs")
