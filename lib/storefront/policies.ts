import {
  FREE_SHIPPING_THRESHOLD,
  shippingMethods,
} from "@/lib/cart/calculations";
import { formatCad } from "@/lib/utils";

export type PolicySection = {
  heading: string;
  paragraphs: string[];
};

export type PolicyDocument = {
  title: string;
  intro: string;
  sections: PolicySection[];
};

const courier = shippingMethods.find((method) => method.id === "courier");
const local = shippingMethods.find((method) => method.id === "local");
const pickup = shippingMethods.find((method) => method.id === "pickup");

/** Operational storefront policies. Counsel should review before launch. */
export const privacyPolicy: PolicyDocument = {
  title: "Privacy Policy",
  intro:
    "This page describes what African Food Warehouse collects on this storefront today. It is an operational notice, not a lawyer-reviewed privacy policy.",
  sections: [
    {
      heading: "Account information",
      paragraphs: [
        "Creating an account sends your name, email, and password to the store’s account service. Business signup also sends the business name, type, and expected order volume you enter.",
        "Signing in stores an HTTP-only session cookie in your browser. The storefront does not put your password in that cookie.",
      ],
    },
    {
      heading: "Shopping information",
      paragraphs: [
        "A guest cart stays on this device. Promo codes, saved addresses, wishlist, and checkout are available only after you sign in.",
        "When you save an address or place an order, we send the address and cart you submitted. Checkout does not create a new saved address if you reuse one already on your account.",
      ],
    },
    {
      heading: "What this page does not claim",
      paragraphs: [
        "This storefront does not sell a separate analytics or advertising program from these pages. Do not treat this notice as a complete list of processors until the store publishes one.",
        "There is no customer order-history list on the account page yet. Your confirmation page is the record of an order you just placed.",
      ],
    },
  ],
};

export const termsOfService: PolicyDocument = {
  title: "Terms of Service",
  intro:
    "These terms describe how this storefront works today. They are not a substitute for a reviewed customer agreement.",
  sections: [
    {
      heading: "Using the store",
      paragraphs: [
        "Prices are shown in Canadian dollars. You need a signed-in account to apply a promo code or place an order.",
        "A guest cart is kept in this browser only. Signing in does not automatically merge that cart into your account.",
      ],
    },
    {
      heading: "Orders and payment",
      paragraphs: [
        "Placing an order sends your signed-in cart and chosen delivery method. If you ship or request local delivery, checkout uses a saved address or saves a new street you enter.",
        "An order can be placed while payment is still pending. Do not treat the confirmation page as proof that a card was charged unless it says payment is complete.",
        "Promo codes can be rejected when they are invalid, expired, or not available on the signed-in cart.",
      ],
    },
    {
      heading: "Wholesale signup",
      paragraphs: [
        "Business signup asks for a business name, type, and expected monthly volume. The signup screen says applications are reviewed and that you can keep shopping at retail pricing while you wait. That review is not a promise that a particular price or approval will be granted.",
      ],
    },
  ],
};

export const shippingPolicy: PolicyDocument = {
  title: "Shipping Policy",
  intro:
    "Delivery choices and prices below are the ones shown at checkout. They are store configuration, not a carrier contract.",
  sections: [
    {
      heading: "Methods",
      paragraphs: [
        courier
          ? `${courier.label}: ${formatCad(courier.price)} — ${courier.description}.`
          : "Courier shipping is offered at checkout.",
        local
          ? `${local.label}: ${formatCad(local.price)} — ${local.description}.`
          : "Local delivery is offered at checkout.",
        pickup
          ? `${pickup.label}: ${pickup.price === 0 ? "Free" : formatCad(pickup.price)} — ${pickup.description}.`
          : "Store pickup is offered at checkout.",
        `In the cart, courier and local delivery show as free once the discounted subtotal reaches ${formatCad(FREE_SHIPPING_THRESHOLD)}. Pickup is already free. The amount charged is the total returned when the order is placed.`,
      ],
    },
    {
      heading: "What you need to check out",
      paragraphs: [
        "Shipping and local delivery need a delivery address on your signed-in account. Pickup does not ask for a street address.",
        "Destination coverage in the checkout form is Canada. Pickup is at 420 Queen St W, Toronto.",
      ],
    },
  ],
};

export const returnsPolicy: PolicyDocument = {
  title: "Returns",
  intro:
    "This storefront does not publish an automatic refund window, restocking fee, or waiver.",
  sections: [
    {
      heading: "If something is wrong with an order",
      paragraphs: [
        "Keep the confirmation page and order number. That page is the record this storefront gives you after checkout.",
        "A return or refund, if the store approves one, follows that order’s payment status. This page does not promise a number of days, a prepaid label, or a refund before payment is complete.",
      ],
    },
    {
      heading: "What is not decided here",
      paragraphs: [
        "Canadian consumer rights are not limited by this page. A reviewed returns policy should replace this notice before launch.",
      ],
    },
  ],
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqIntro =
  "Answers below match the storefront as it works today. They are not a legal policy.";

export const faqItems: FaqItem[] = [
  {
    question: "Do I need an account to check out?",
    answer:
      "Yes. Promo codes and placing an order require a signed-in account. A guest can browse and keep a cart on this device, then sign in to check out.",
  },
  {
    question: "Will I get a confirmation email?",
    answer:
      "This checkout does not tell you that an email was sent. The confirmation page, with your order number, is the record you should keep.",
  },
  {
    question: "Where do I see past orders?",
    answer:
      "Order History in your account does not list past purchases yet. After checkout, use the confirmation page and order number if you need to follow up.",
  },
  {
    question: "How does shipping work?",
    answer:
      "Checkout offers courier, local delivery for the GTA, and free pickup at 420 Queen St W, Toronto. See the shipping policy for the prices shown in the cart.",
  },
  {
    question: "Can I use a saved address?",
    answer:
      "Yes, when you are signed in. Checkout starts from your default saved address. A new address is saved only if you enter a street that is not already on the account.",
  },
  {
    question: "I forgot my password. What happens when I request a reset?",
    answer:
      "The reset form always shows the same confirmation, whether or not that email has an account. If you receive a reset link, open it and choose a new password, then sign in.",
  },
];
