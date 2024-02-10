
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clh667k5z6pgp01t8764r5pol/master",
    documents: "src/graphql/*.graphql",
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        './src/generated/graphql.ts': {
            // preset: 'client',
            plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
        },
    },
    overwrite: true,
};

export default config;