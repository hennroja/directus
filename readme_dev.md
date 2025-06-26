## Quick start for Devs 🐰

Create /api/.env and paste:
```
HOST="0.0.0.0"
PORT=8055

DB_CLIENT="pg"
DB_HOST="localhost"
DB_PORT=5100
DB_PASSWORD="secret"
DB_DATABASE="postgres"
DB_USER="postgres"
POSTGRES_URL="postgresql://postgres:secret@localhost:5111/postgres"

ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="d1r3ctu5"
```

Run Docker Compose and enable posgis
```
docker compose -f 'docker-compose.yml' up -d --build 'postgres'
psql postgres://postgres@localhost:5100/postgres 
pw is secret
CREATE EXTENSION postgis;
```

Run the commands:
```
corepack enable pnpm
pnpm install
pnpm build
pnpm --filter api cli bootstrap
```


(optional) If you want to use VS Code:
in vs code in debugger create .vscode/launch.json
´´´
{
	"version": "0.2.0",
	"configurations": [

		{
			"type": "node",
			"request": "launch",
			"name": "Debug Api",
			"skipFiles": ["<node_internals>/**"],
			"cwd": "${workspaceFolder}/api",
			"runtimeExecutable": "pnpm",
			"runtimeArgs": ["run", "dev"],
			"experimentalNetworking": "off"
		}
	]
}
´´´
