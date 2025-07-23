import "@shopify/shopify-app-remix/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import { DrizzleSessionStoragePostgres } from "@shopify/shopify-app-session-storage-drizzle";

import { satcDb } from "./db.server";
import { sessionModel } from "../db/schema";
import type { AppLoadContext } from "@remix-run/cloudflare";
import type { Env } from "../load-context";

export const shopifyDataByEnv = (env: Env, request?: Request) => {
  const shopifyAppData = {
    apiKey: env.SHOPIFY_API_KEY,
    apiSecretKey: env.SHOPIFY_API_SECRET || "",
    apiVersion: ApiVersion.October24,
    scopes: env.SCOPES?.split(","),
    appUrl: env.SHOPIFY_APP_URL || "",
    authPathPrefix: "/auth",
    sessionStorage: new DrizzleSessionStoragePostgres(
      satcDb(env),
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
  };

  return shopifyApp({
    ...(shopifyAppData as any),

    hooks: {
      afterAuth: async ({ session }) => {
        console.log("afterAuth", session.shop);
        const provShopifyData = shopifyApp(shopifyAppData as any);
        await provShopifyData.registerWebhooks({
          session: session as any,
        });
      },
    },
  });
};

export const shopifyData = (context: AppLoadContext, request?: Request) => {
  return shopifyDataByEnv(context.cloudflare.env, request);
};

export const apiVersion = ApiVersion.January25;
