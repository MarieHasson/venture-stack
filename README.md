# VentureStack

VentureStack is a production-ready foundation for building multi-tenant SaaS products with React, Django, GraphQL, and AWS. It combines a web application, backend API, administration tools, background workers, reusable packages, infrastructure as code, and local documentation in one monorepo.

Repository: [github.com/MarieHasson/venture-stack](https://github.com/MarieHasson/venture-stack)

## Highlights

- Authentication, email verification, password recovery, social login, passkeys, and two-factor authentication
- Multi-tenant organizations, invitations, roles, and permissions
- Stripe payments, subscriptions, and billing workflows
- Transactional email templates and in-app notifications
- Django administration and a React management dashboard
- GraphQL API with generated TypeScript clients
- Background jobs with Celery and AWS Lambda options
- Contentful, Sentry, OpenAI, and object-storage integrations
- Docker-based local development and AWS CDK infrastructure
- CI/CD support for GitHub and Bitbucket

## Technology

| Area | Main tools |
| --- | --- |
| Web | React, TypeScript, Vite, Apollo Client, React Router, Tailwind CSS |
| API | Python, Django, Graphene, Django REST Framework |
| Data | PostgreSQL, Redis |
| Workers | Celery, AWS Lambda |
| Infrastructure | AWS CDK, Docker, Nx |
| Tooling | pnpm, Jest, Storybook, Ruff, Black, ESLint |

## Requirements

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/en/download/) 20 or newer
- [pnpm](https://pnpm.io/installation) 9 or newer
- WSL 2 when developing on Windows

Python 3.11 and [uv](https://docs.astral.sh/uv/getting-started/installation/) are optional unless you run the backend or workers directly outside Docker.

## Quick start

Clone the repository and enter the project directory:

```bash
git clone git@github.com:MarieHasson/venture-stack.git
cd venture-stack
```

Install dependencies:

```bash
pnpm install
```

Create local environment files:

```bash
cp .env.shared .env
cp packages/backend/.env.shared packages/backend/.env
```

Review the copied values before starting services. Some optional integrations require credentials from their respective providers.

Start the complete local stack:

```bash
pnpm saas up
```

The default local services are:

| Service | Address |
| --- | --- |
| Web application | http://localhost:3000 |
| Backend API | http://localhost:5001 |
| Django admin | http://admin.localhost:5001 |
| Mailcatcher | http://localhost:1080 |
| Documentation | http://localhost:3006 |
| Worker trigger server | http://localhost:3005 |

Stop all services with:

```bash
pnpm saas down
```

## Common commands

```bash
# Start one part of the stack
pnpm saas backend up
pnpm saas webapp up
pnpm saas docs up

# Run quality checks
pnpm saas lint
pnpm saas test

# View all CLI commands
pnpm saas --help
```

## Repository layout

```text
packages/
├── backend/          Django API and administration
├── contentful/       Content synchronization tooling
├── infra/            AWS infrastructure packages
├── internal/         CLI, shared tooling, and documentation
├── mcp-server/       MCP server package
├── webapp/           Main React application
├── webapp-libs/      Reusable frontend feature libraries
└── workers/          Asynchronous job handlers
```

## Configuration

Shared defaults live in `.env.shared` files. Keep real secrets in untracked `.env` files or a managed secret store. The most important top-level settings include:

- `PROJECT_NAME`: short deployment identifier
- `AWS_DEFAULT_REGION`: target AWS region
- `SB_DOMAIN_WEB_APP`: web application hostname
- `SB_DOMAIN_API`: backend hostname
- `SB_DOMAIN_DOCS`: documentation hostname
- `SB_DOMAIN_CDN`: static asset hostname

Use provider-specific keys only when enabling optional services such as Stripe, Contentful, Sentry, or OpenAI.

## Documentation

The maintained documentation source is in [`packages/internal/docs/docs`](./packages/internal/docs/docs). Run it locally with:

```bash
pnpm saas docs up
```

Additional package notes are available in the relevant package directories, including the backend, workers, translations, SSO, rate limiting, and MCP server.

## Deployment

VentureStack supports several deployment paths:

- AWS using the CDK packages under `packages/infra`
- Render using `render.yaml` and the CLI setup command
- A Docker-based VPS deployment

Read the deployment guides in [`packages/internal/docs/docs/deployment`](./packages/internal/docs/docs/deployment) and [`packages/internal/docs/docs/aws`](./packages/internal/docs/docs/aws) before provisioning production resources.

## Security

Do not commit credentials or production environment files. Report vulnerabilities privately according to [SECURITY.md](./SECURITY.md).

## Contributing

Contributions should follow [CONTRIBUTING.md](./CONTRIBUTING.md) and the [Code of Conduct](./CODE_OF_CONDUCT.md).

## License

This project is available under the [MIT License](./LICENSE).
