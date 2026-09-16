"use server";

import { revalidatePath } from "next/cache";

import {
  mapApiStoreSettingsToDetails,
  mapStoreDetailsToUpdateBody,
} from "@/lib/admin/map-admin-settings";
import { getAdminStoreSettings, updateAdminStoreSettings } from "@/lib/api/settings";
import type { AdminStoreDetails } from "@/lib/mocks/admin-settings";

export type SaveStoreSettingsResult =
  | { ok: true; details: AdminStoreDetails }
  | { ok: false; error: string };

export async function saveStoreSettingsAction(
  details: AdminStoreDetails,
): Promise<SaveStoreSettingsResult> {
  try {
    const previous = await getAdminStoreSettings();
    const body = mapStoreDetailsToUpdateBody(details, previous);
    const updated = await updateAdminStoreSettings(body);
    revalidatePath("/admin/settings");

    return {
      ok: true,
      details: mapApiStoreSettingsToDetails(updated),
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to save store settings.",
    };
  }
}
