export type AdminSettingsSection =
  | "store-details"
  | "payments"
  | "shipping"
  | "taxes"
  | "notifications"
  | "legal";

export type AdminSettingsNavItem = {
  id: AdminSettingsSection;
  label: string;
};

export type AdminStoreDetails = {
  storeName: string;
  storeUrl: string;
  contactEmail: string;
  phoneNumber: string;
  businessAddress: string;
  currency: string;
  timezone: string;
};

export const adminSettingsNav: AdminSettingsNavItem[] = [
  { id: "store-details", label: "Store Details" },
  { id: "payments", label: "Payments" },
  { id: "shipping", label: "Shipping" },
  { id: "taxes", label: "Taxes" },
  { id: "notifications", label: "Notifications" },
  { id: "legal", label: "Legal" },
];

export const adminCurrencyOptions = [
  "CAD ($) - Canadian Dollar",
  "USD ($) - US Dollar",
] as const;

export const adminTimezoneOptions = [
  "Eastern Time (ET) - Toronto",
  "Pacific Time (PT) - Vancouver",
] as const;

/** Defaults from Figma `72:1811` */
export const adminStoreDetailsDefaults: AdminStoreDetails = {
  storeName: "African Food Warehouse",
  storeUrl: "africanfoodwarehouse.ca",
  contactEmail: "operations@africanfoodwarehouse.ca",
  phoneNumber: "+1 (416) 555-0192",
  businessAddress: "Unit 4, 1200 Finch Ave West, Toronto, ON M3J 2E5",
  currency: "CAD ($) - Canadian Dollar",
  timezone: "Eastern Time (ET) - Toronto",
};

export type AdminPaymentSettings = {
  provider: string;
  live: boolean;
};

export type AdminTaxRate = {
  id: string;
  province: string;
  gstPercent: number;
  pstPercent: number;
  isActive: boolean;
};

/** Canadian provinces/territories for tax rates */
export const adminProvinceOptions = [
  { code: "AB", label: "Alberta (AB)" },
  { code: "BC", label: "British Columbia (BC)" },
  { code: "MB", label: "Manitoba (MB)" },
  { code: "NB", label: "New Brunswick (NB)" },
  { code: "NL", label: "Newfoundland and Labrador (NL)" },
  { code: "NS", label: "Nova Scotia (NS)" },
  { code: "NT", label: "Northwest Territories (NT)" },
  { code: "NU", label: "Nunavut (NU)" },
  { code: "ON", label: "Ontario (ON)" },
  { code: "PE", label: "Prince Edward Island (PE)" },
  { code: "QC", label: "Quebec (QC)" },
  { code: "SK", label: "Saskatchewan (SK)" },
  { code: "YT", label: "Yukon (YT)" },
] as const;
