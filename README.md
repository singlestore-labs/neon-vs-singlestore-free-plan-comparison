# Neon vs SingleStore: Free Plan Comparison

This repository provides a simple benchmark comparing Neon’s Free Plan and SingleStore’s Free Shared Tier. It includes Drizzle ORM entities, a data generation tool, and a local app to run and test queries against both databases.

## Getting Started

1. Install dependencies by running the following command in the project root:

```sh
npm i
```

2. Generate data by running the following command in the ./apps/data-generator directory:

```sh
npm run start
```

3. [Set up a Free Shared Tier workspace in SingleStore.](https://portal.singlestore.com/intention/cloud?utm_source=yaroslav&utm_medium=github&utm_campaign=general-technical&utm_content=neon-vs-singlestore-free-plan-comparison-35m-rows).
4. Create a `.env` file in `./packages/singlestore` based on the `./packages/singlestore/.env.example` file.
5. Download the [SingleStore SSL certificate](https://portal.singlestore.com/static/ca/singlestore_bundle.pem) and place it in the `./packages/singlestore` directory.
6. Push the SingleStore database schema by running the following command in the `./packages/singlestore` directory:

```sh
npm run push
```

7. Load data into the SingleStore database by running the following command in the `./packages/singlestore` directory:

```sh
npm run data:load
```

8. Start the SingleStore benchmark by running the following command in the `./packages/singlestore` direcotry:

```sh
npm run benchmark:start
```

9. Set up a free workspace in Neon.
10. Create a `.env` file in `./packages/neon` based on the `./packages/neon/.env.example` file.
11. Push the Neon database schema by running the following command in the `./packages/neon` directory:

```sh
npm run push
```

12. Load data into the Neon database by running the following command in the `./packages/neon` directory:

```sh
npm run data:load
```

13. Start the Neon benchmark by running the following command in the `./packages/neon` direcotry:

```sh
npm run benchmark:start
```

13. Build the benchmark app by running the following command in the `./apps/benchmark` directory:

```sh
npm run build
```

14. Start the benchmark app by running the following command in the `./apps/benchmark` directory:

```sh
npm run start
```

15. Open [http://localhost:3000](http://localhost:3000) in your browser.
