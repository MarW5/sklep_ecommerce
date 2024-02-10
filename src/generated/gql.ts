/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation CreateProductReview($review: ReviewCreateInput!) {\n  review: createReview(data: $review) {\n    id\n    stage\n  }\n}": types.CreateProductReviewDocument,
    "query GetProductList {\n  products {\n    id\n    name\n    price\n    slug\n    images {\n      url\n    }\n  }\n}\n\nquery GetProductDetailsBySlug($slug: String) {\n  product(where: {slug: $slug}) {\n    slug\n    name\n    price\n    description\n    images {\n      url\n    }\n  }\n}\n\nquery GetProductsSlugs {\n  products {\n    slug\n  }\n}": types.GetProductListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateProductReview($review: ReviewCreateInput!) {\n  review: createReview(data: $review) {\n    id\n    stage\n  }\n}"): (typeof documents)["mutation CreateProductReview($review: ReviewCreateInput!) {\n  review: createReview(data: $review) {\n    id\n    stage\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProductList {\n  products {\n    id\n    name\n    price\n    slug\n    images {\n      url\n    }\n  }\n}\n\nquery GetProductDetailsBySlug($slug: String) {\n  product(where: {slug: $slug}) {\n    slug\n    name\n    price\n    description\n    images {\n      url\n    }\n  }\n}\n\nquery GetProductsSlugs {\n  products {\n    slug\n  }\n}"): (typeof documents)["query GetProductList {\n  products {\n    id\n    name\n    price\n    slug\n    images {\n      url\n    }\n  }\n}\n\nquery GetProductDetailsBySlug($slug: String) {\n  product(where: {slug: $slug}) {\n    slug\n    name\n    price\n    description\n    images {\n      url\n    }\n  }\n}\n\nquery GetProductsSlugs {\n  products {\n    slug\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;