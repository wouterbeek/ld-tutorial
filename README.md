# Triply ETL for ld-tutorial

This repository contains the TriplyETL configuration for transformations found in RML tutorials.

Follow these steps to run TriplyETL:

1. Follow the prerequisites documented at [this link](https://docs.triply.cc/triply-etl/generic/getting-started/#prerequisites).

2. Install dependencies

   ```sh
   npm i
   ```

3. Create a TriplyDB API Token and set it in a file called `.env`:

   ```sh
   TRIPLYDB_TOKEN={your-token-here}
   ```

4. Transpile:

   ```sh
   npm run build
   ```

   Or, for continuous transpilation:

   ```sh
   npm run dev
   ```

5. Run

   ```sh
   npx etl
   ```
