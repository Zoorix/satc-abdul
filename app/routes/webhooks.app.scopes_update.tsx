import type { ActionFunctionArgs } from "@remix-run/node";
import { shopify } from "../shopify.server";
import { drizzleDb } from "app/db.server";
import { sessionModel } from "db/schema";
import { eq } from "drizzle-orm";

export const action = async ({ request, context }: ActionFunctionArgs) => {
    const { payload, session, topic, shop } = await shopify(context).authenticate.webhook(request);
    console.log(`Received ${topic} webhook for ${shop}`);   

    const current = payload.current as string[];    
    if (session) {
        await drizzleDb.update(sessionModel).set({
            scope: current.toString(),
        }).where(eq(sessionModel.id, session.id));
    }
    return new Response();
};
