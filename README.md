# Triply ETL for ld-tutorial

This repository contains the TriplyETL configuration for transformations found in RML tutorials.

Follow these steps to run TriplyETL:

1. Install dependencies

   ```sh
   npm i
   ```

2. Create a TriplyDB API Token and set it in a file called `.env`:

   ```sh
   TRIPLYDB_TOKEN={your-token-here}
   ```

3. Transpile:

   ```sh
   npm run build
   ```

   Or, for continuous transpilation:

   ```sh
   npm run dev
   ```

4. Run

   ```sh
   npx etl
   ```
