import { NextResponse } from "next/server";
import { exportSalesReport } from "@/lib/api/reports";

/** Proxies GET /admin/reports/sales/export as a staff-session CSV download. */
export async function GET() {
  try {
    // groupBy is required by staging export; omit from/to (exclusive `to` drops today).
    const { body, contentType, filename } = await exportSalesReport(
      { groupBy: "day" },
      { auth: "session" },
    );

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": contentType.includes("csv")
          ? contentType
          : "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to export sales ledger.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
