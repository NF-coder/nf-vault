import type { DecorationProvider } from "../types";
import { getImageDecorations } from "../providers/image/getImageDecorations";
import { getMarkerDecorations } from "../providers/marker/getMarkerDecorations";

export const decorationProviders: readonly DecorationProvider[] = [
  getImageDecorations,
  getMarkerDecorations
];