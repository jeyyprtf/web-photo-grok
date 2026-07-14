import "server-only";
import type { Locale } from "./i18n";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  id: () => import("@/dictionaries/id.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["en"]>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
