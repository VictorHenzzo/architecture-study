# architecture-study

# Connect to database
docker exec -it 338a6c91ce81 psql -U postgres

# Create schemas
docker cp create.sql 338a6c91ce81:/tmp/create.sql
docker exec -i 338a6c91ce81 psql -U postgres -d app -f /tmp/create.sql