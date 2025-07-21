import type { ActionFunctionArgs } from "@remix-run/node";
import { shopify } from "../shopify.server";
import { drizzleDb } from "app/db.server";
import { sessionModel } from "db/schema";
import { eq } from "drizzle-orm";



export const action = async ({ request, context }: ActionFunctionArgs) => {
  const { shop, session, topic } = await shopify(context).authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);

  // Webhook requests can trigger multiple times and after an app has already been uninstalled.
  // If this webhook already ran, the session may have been deleted previously.
  if (session) {
    await drizzleDb(context.cloudflare.env.DATABASE_URL!).delete(sessionModel).where(eq(sessionModel.shop, shop));
  }

  return new Response();
};
