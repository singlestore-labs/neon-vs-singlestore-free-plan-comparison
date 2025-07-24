#!/bin/bash

source "$(dirname "$0")/../.env"

pg_dump --schema-only --no-comments --no-owner --no-tablespaces "$NEON_DB_URL" > "schema.sql"
