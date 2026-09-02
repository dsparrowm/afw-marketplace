export type AccountType = "personal" | "business";

export type OrderVolume = "small" | "medium" | "large";

export type Customer = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  accountType: AccountType;
  businessName?: string;
  businessType?: string;
  orderVolume?: OrderVolume;
  taxId?: string;
  /** Business wholesale access pending admin approval */
  businessApproved?: boolean;
  emailVerified?: boolean;
};

export type AuthSession = {
  customer: Customer;
  createdAt: string;
};
