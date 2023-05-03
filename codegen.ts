
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clh667k5z6pgp01t8764r5pol/master",
  documents: "src/graphql/*.graphql",
  generates: {
    "src/generated/": {
      preset: "client",
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
