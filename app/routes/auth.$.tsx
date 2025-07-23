import type { LoaderFunctionArgs } from "@remix-run/node";
import { shopifyData } from "../shopify.server";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  await shopifyData(context).authenticate.admin(request);

  return null;
};
