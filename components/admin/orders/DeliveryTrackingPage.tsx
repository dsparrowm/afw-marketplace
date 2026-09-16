"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  Copy,
  Package,
  Search,
  X,
} from "lucide-react";
import {
  saveShipmentTrackingAction,
  updateOrderStatusAction,
  updateShipmentStatusAction,
} from "@/lib/admin/order-delivery-actions";
import type {
  AdminDeliveryTracking,
  DeliveryTimelineStep,
} from "@/lib/mocks/admin-delivery-tracking";
import type {
  ApiUpdateOrderStatusBody,
  ApiUpdateShipmentBody,
} from "@/types/api";
import { cn } from "@/lib/utils";

const ORDER_STATUSES: {
  value: ApiUpdateOrderStatusBody["status"];
  label: string;
}[] = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
  { value: "refunded", label: "Refunded" },
];

const SHIPMENT_STATUSES: {
  value: NonNullable<ApiUpdateShipmentBody["status"]>;
  label: string;
}[] = [
  { value: "pending", label: "Pending" },
  { value: "out_for_delivery", label: "Out for delivery" },
  { value: "delivered", label: "Delivered" },
];

const fieldClassName =
  "h-[37px] w-full rounded-md border border-border bg-muted/40 px-3.5 text-sm text-foreground focus-visible:bg-card focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

export type DeliveryTrackingPageProps = {
  delivery: AdminDeliveryTracking;
  loadError?: string | null;
};

/** Admin delivery tracking — Figma `79:348` / main `79:380` */
export function DeliveryTrackingPage({
  delivery,
  loadError = null,
}: DeliveryTrackingPageProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [shipmentMenuOpen, setShipmentMenuOpen] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const statusMenuRef = useRef<HTMLDivElement>(null);
  const shipmentMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(event: MouseEvent) {
      const target = event.target as Node;
      if (
        statusMenuRef.current &&
        !statusMenuRef.current.contains(target)
      ) {
        setStatusMenuOpen(false);
      }
      if (
        shipmentMenuRef.current &&
        !shipmentMenuRef.current.contains(target)
      ) {
        setShipmentMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function refresh() {
    router.refresh();
  }

  async function copyWaybill() {
    if (!delivery.tracking.waybill || delivery.tracking.waybill === "—") {
      setStatusMessage("No tracking number to copy.");
      return;
    }
    try {
      await navigator.clipboard.writeText(delivery.tracking.waybill);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setStatusMessage("Could not copy tracking number.");
    }
  }

  const method =
    delivery.deliveryMethodCode === "local_delivery" ||
    delivery.deliveryMethodCode === "pickup" ||
    delivery.deliveryMethodCode === "ship"
      ? delivery.deliveryMethodCode
      : "ship";

  return (
    <div className="mx-auto max-w-[1180px] px-8 py-6 pb-12">
      {loadError ? (
        <p
          className="mb-4 rounded-md border border-admin-status-delayed bg-admin-status-delayed px-4 py-3 text-sm text-admin-status-delayed-foreground"
          role="alert"
        >
          {loadError}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5">
            {delivery.breadcrumb.map((crumb, index) => (
              <li
                key={`${crumb.label}-${index}`}
                className="flex items-center gap-1.5"
              >
                {index > 0 ? <span aria-hidden>/</span> : null}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-foreground hover:underline"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex items-center gap-2">
          <label className="relative hidden w-[240px] sm:block">
            <span className="sr-only">Search inventory</span>
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              type="search"
              placeholder="Search inventory, shipments..."
              className="h-9 w-full rounded-md border border-border bg-card pr-3 pl-9 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            />
          </label>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:bg-muted"
            aria-label="Notifications"
          >
            <Bell className="size-[18px]" />
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[1.75rem] font-semibold tracking-tight text-foreground">
            {delivery.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {delivery.subtitle}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (
              !delivery.tracking.waybill ||
              delivery.tracking.waybill === "—"
            ) {
              setStatusMessage("Add tracking before opening carrier tools.");
              return;
            }
            setStatusMessage(
              `Tracking number ${delivery.tracking.waybill} ready to look up with ${delivery.tracking.carrier}.`,
            );
          }}
          className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          <Package className="size-4" aria-hidden />
          Track Shipment
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <InfoCard title="Customer Details">
          <p className="font-medium text-foreground">{delivery.customer.name}</p>
          <p className="text-sm text-muted-foreground">
            {delivery.customer.email}
          </p>
          <p className="text-sm text-muted-foreground">
            {delivery.customer.phone}
          </p>
        </InfoCard>
        <InfoCard title="Delivery Method">
          <p className="font-medium text-foreground">
            {delivery.deliveryMethod.carrier}
          </p>
          <p className="text-sm text-muted-foreground">
            {delivery.deliveryMethod.service}
          </p>
          <p className="text-sm text-muted-foreground">
            {delivery.deliveryMethod.estDelivery}
          </p>
        </InfoCard>
        <InfoCard title="Shipping Address">
          <p className="text-sm text-foreground">
            {delivery.shippingAddress.line1}
          </p>
          <p className="text-sm text-foreground">
            {delivery.shippingAddress.line2}
          </p>
          <p className="text-sm text-foreground">
            {delivery.shippingAddress.country}
          </p>
        </InfoCard>
      </div>

      <section className="mt-5 rounded-xl border border-border bg-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Courier Dispatch &amp; Live Tracking
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {delivery.tracking.summary}
            </p>
          </div>
          <span
            className={cn(
              "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium",
              delivery.tracking.statusTone === "delivered" ||
                delivery.tracking.statusTone === "shipped"
                ? "bg-admin-status-active text-admin-status-active-foreground"
                : delivery.tracking.statusTone === "cancelled"
                  ? "bg-admin-status-delayed text-admin-status-delayed-foreground"
                  : delivery.tracking.statusTone === "processing"
                    ? "bg-admin-status-packaging text-admin-status-packaging-foreground"
                    : "bg-admin-status-pending text-admin-status-pending-foreground",
            )}
          >
            {delivery.tracking.statusLabel}
          </span>
        </div>

        <div className="mt-5 rounded-lg border border-border bg-muted/30 px-4 py-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs text-muted-foreground">Carrier</p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {delivery.tracking.carrier}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                Waybill Tracking Number
              </p>
              <div className="mt-1 flex items-center gap-2">
                <p className="text-sm font-medium text-admin-status-positive">
                  {delivery.tracking.waybill}
                </p>
                <button
                  type="button"
                  onClick={copyWaybill}
                  className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label={copied ? "Copied" : "Copy tracking number"}
                >
                  <Copy className="size-3.5" />
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Dispatched At</p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {delivery.tracking.dispatchedAt}
              </p>
            </div>
          </div>
        </div>

        <DeliveryTimeline steps={delivery.timeline} />
      </section>

      <div className="mt-5 flex flex-wrap gap-3">
        <div className="relative" ref={statusMenuRef}>
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              setShipmentMenuOpen(false);
              setStatusMenuOpen((open) => !open);
            }}
            className="inline-flex h-10 items-center gap-2 rounded-md bg-brand-green px-5 text-sm font-medium text-brand-green-foreground disabled:opacity-60"
          >
            Update Status
            <ChevronDown className="size-3.5" aria-hidden />
          </button>
          {statusMenuOpen ? (
            <div
              role="menu"
              className="absolute bottom-full left-0 z-20 mb-2 min-w-[180px] rounded-md border border-border bg-card py-1 shadow-lg"
            >
              {ORDER_STATUSES.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="menuitem"
                  disabled={pending || delivery.orderStatus === option.value}
                  className="flex w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted disabled:opacity-50"
                  onClick={() => {
                    setStatusMenuOpen(false);
                    setActionError(null);
                    setStatusMessage(null);
                    startTransition(async () => {
                      const result = await updateOrderStatusAction({
                        orderId: delivery.id,
                        status: option.value,
                      });
                      if (!result.ok) {
                        setActionError(result.error);
                        return;
                      }
                      setStatusMessage(`Order status set to ${option.label}.`);
                      refresh();
                    });
                  }}
                >
                  {option.label}
                  {delivery.orderStatus === option.value ? " · current" : ""}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <button
          type="button"
          disabled={pending}
          onClick={() => setTrackingOpen(true)}
          className="inline-flex h-10 items-center rounded-md border border-brand-green bg-card px-5 text-sm font-medium text-brand-green hover:bg-muted disabled:opacity-60"
        >
          {delivery.hasShipment ? "Edit Tracking" : "Add Tracking"}
        </button>

        <div className="relative" ref={shipmentMenuRef}>
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              if (!delivery.hasShipment) {
                setStatusMessage("Add tracking before updating shipment status.");
                return;
              }
              setStatusMenuOpen(false);
              setShipmentMenuOpen((open) => !open);
            }}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-brand-green bg-card px-5 text-sm font-medium text-brand-green hover:bg-muted disabled:opacity-60"
          >
            Save Delivery Details
            <ChevronDown className="size-3.5" aria-hidden />
          </button>
          {shipmentMenuOpen ? (
            <div
              role="menu"
              className="absolute bottom-full left-0 z-20 mb-2 min-w-[200px] rounded-md border border-border bg-card py-1 shadow-lg"
            >
              {SHIPMENT_STATUSES.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="menuitem"
                  disabled={pending}
                  className="flex w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted disabled:opacity-50"
                  onClick={() => {
                    setShipmentMenuOpen(false);
                    setActionError(null);
                    setStatusMessage(null);
                    startTransition(async () => {
                      const result = await updateShipmentStatusAction({
                        orderId: delivery.id,
                        status: option.value,
                      });
                      if (!result.ok) {
                        setActionError(result.error);
                        return;
                      }
                      setStatusMessage(
                        `Shipment status set to ${option.label}.`,
                      );
                      refresh();
                    });
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {actionError ? (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {actionError}
        </p>
      ) : null}
      {statusMessage ? (
        <p className="mt-4 text-sm text-muted-foreground" role="status">
          {statusMessage}
        </p>
      ) : null}

      <TrackingDialog
        open={trackingOpen}
        delivery={delivery}
        method={method}
        onClose={() => setTrackingOpen(false)}
        onSaved={(message) => {
          setTrackingOpen(false);
          setActionError(null);
          setStatusMessage(message);
          refresh();
        }}
        onError={(message) => setActionError(message)}
      />
    </div>
  );
}

function TrackingDialog({
  open,
  delivery,
  method,
  onClose,
  onSaved,
  onError,
}: {
  open: boolean;
  delivery: AdminDeliveryTracking;
  method: "ship" | "local_delivery" | "pickup";
  onClose: () => void;
  onSaved: (message: string) => void;
  onError: (message: string) => void;
}) {
  const titleId = useId();
  const [courierName, setCourierName] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    setCourierName(
      delivery.hasShipment && delivery.tracking.carrier !== "—"
        ? delivery.tracking.carrier === delivery.deliveryMethod.service
          ? ""
          : delivery.tracking.carrier
        : "",
    );
    setTrackingNumber(
      delivery.tracking.waybill !== "—" ? delivery.tracking.waybill : "",
    );
  }, [open, delivery]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2
              id={titleId}
              className="text-lg font-semibold text-foreground"
            >
              {delivery.hasShipment ? "Edit Tracking" : "Add Tracking"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {delivery.orderNumber} · {delivery.deliveryMethod.service}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <form
          className="mt-5 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            startTransition(async () => {
              const result = await saveShipmentTrackingAction({
                orderId: delivery.id,
                method,
                hasShipment: delivery.hasShipment,
                courierName,
                trackingNumber,
              });
              if (!result.ok) {
                onError(result.error);
                return;
              }
              onSaved(
                delivery.hasShipment
                  ? "Tracking details updated."
                  : "Shipment tracking created.",
              );
            });
          }}
        >
          <label className="block space-y-1.5">
            <span className="text-sm text-muted-foreground">Courier name</span>
            <input
              className={fieldClassName}
              value={courierName}
              onChange={(event) => setCourierName(event.target.value)}
              placeholder="e.g. Canada Post"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm text-muted-foreground">
              Waybill / tracking number
            </span>
            <input
              className={fieldClassName}
              value={trackingNumber}
              onChange={(event) => setTrackingNumber(event.target.value)}
              placeholder="e.g. CP123456789CA"
            />
          </label>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 items-center rounded-md px-4 text-sm font-medium text-foreground hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending}
              className="inline-flex h-9 items-center rounded-md bg-brand-green px-4 text-sm font-medium text-brand-green-foreground hover:bg-brand-green/90 disabled:opacity-60"
            >
              {pending ? "Saving…" : "Save Tracking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="text-xs font-medium text-muted-foreground">{title}</h2>
      <div className="mt-3 space-y-1">{children}</div>
    </div>
  );
}

function DeliveryTimeline({ steps }: { steps: DeliveryTimelineStep[] }) {
  return (
    <div className="mt-8">
      <div className="flex items-center" aria-hidden>
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <div
              key={step.id}
              className={cn("flex items-center", isLast ? "" : "flex-1")}
            >
              <TimelineNode step={step} />
              {!isLast ? (
                <div
                  className={cn(
                    "mx-2 h-1 flex-1 rounded-full",
                    step.status === "complete" ? "bg-brand-green" : "bg-border",
                  )}
                />
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {steps.map((step) => (
          <div key={`${step.id}-label`}>
            <p
              className={cn(
                "text-sm font-medium",
                step.status === "current"
                  ? "text-primary"
                  : step.status === "upcoming"
                    ? "text-muted-foreground"
                    : "text-foreground",
              )}
            >
              {step.label}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{step.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineNode({ step }: { step: DeliveryTimelineStep }) {
  if (step.status === "complete") {
    return (
      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-admin-status-active text-admin-status-active-foreground">
        <CheckCircle2 className="size-4" />
      </span>
    );
  }

  if (step.status === "current") {
    return (
      <span className="relative inline-flex size-7 shrink-0 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
        <span className="relative size-3 rounded-full bg-primary ring-4 ring-primary/20" />
      </span>
    );
  }

  return (
    <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-card">
      <span className="size-2 rounded-full bg-muted-foreground/40" />
    </span>
  );
}
