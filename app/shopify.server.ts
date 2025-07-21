import "@shopify/shopify-app-remix/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import { DrizzleSessionStoragePostgres } from "@shopify/shopify-app-session-storage-drizzle";

import { drizzleDb } from "./db.server";
import { sessionModel } from "../db/schema";
import type { AppLoadContext } from "@remix-run/cloudflare";

export const shopify = (context: AppLoadContext) =>
  shopifyApp({
    apiKey: context.cloudflare.env.SHOPIFY_API_KEY,
    apiSecretKey: context.cloudflare.env.SHOPIFY_API_SECRET || "",
    apiVersion: ApiVersion.October24,
    scopes: context.cloudflare.env.SCOPES?.split(","),
    appUrl: context.cloudflare.env.SHOPIFY_APP_URL || "",
    authPathPrefix: "/auth",
    sessionStorage: new DrizzleSessionStoragePostgres(
      drizzleDb,
      sessionModel as any,
    ),
    distribution: AppDistribution.AppStore,
    future: {
      unstable_newEmbeddedAuthStrategy: true,
      removeRest: true,
    },
    ...(process.env.SHOP_CUSTOM_DOMAIN
      ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
      : {}),
  });

export default shopify;
export const apiVersion = ApiVersion.January25;

// export const addDocumentResponseHeaders = (
//   response: Response,
//   request: Request,
// ) => {
//   return shopify.addDocumentResponseHeaders(response, request);
// };
// export const authenticate = shopify.authenticate;
// export const unauthenticated = shopify.unauthenticated;
// export const login = shopify.login;
// export const registerWebhooks = shopify.registerWebhooks;
// export const sessionStorage = shopify.sessionStorage;
