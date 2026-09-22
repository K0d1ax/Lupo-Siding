import { ConvexReactClient } from "convex/react";

/**
 * The Convex deployment URL is supplied by the Convex CLI in `.env.local`
 * (VITE_CONVEX_URL) and must also be set for production in
 * Settings → Environment. When it is missing the site still renders and the
 * quote wizard falls back to local draft storage instead of crashing.
 */
const url = import.meta.env.VITE_CONVEX_URL as string | undefined;

export const convexClient = url ? new ConvexReactClient(url) : null;

export const isBackendConnected = convexClient !== null;
