/** Marketplace backend API shapes — confirmed from staging 2026-09-02 */

export type ApiPaginatedMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ApiPaginatedResponse<T> = {
  data: T[];
  meta: ApiPaginatedMeta;
};

export type ApiPriceTier = {
  id: string;
  variantId: string;
  minQuantity: number;
  /** Staging returns `price`; older docs used `unitPrice`. */
  price?: string | number;
  unitPrice?: string | number;
  label?: string | null;
};

export type ApiProductVariant = {
  id: string;
  productId: string;
  label: string;
  sku: string;
  barcode: string | null;
  unitRetailPrice: string | number;
  stockQuantity: number;
  lowStockThreshold: number | null;
  status: "active" | "hidden" | string;
  weight: number | null;
  priceTiers?: ApiPriceTier[];
};

export type ApiProduct = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  categoryId: string;
  images: string[];
  status: "active" | "hidden" | "pre_order" | string;
  countryOfOrigin: string | null;
  brand: string | null;
  isWholesaleEligible: boolean;
  lowStockThreshold: number | null;
  isOrganic?: boolean;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
  variants?: ApiProductVariant[];
};

export type ApiCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parentId: string | null;
  mpath: string;
  isActive: boolean;
  sortOrder: number;
  children?: ApiCategory[];
};

export type ApiLoginResponse = {
  accessToken: string;
  refreshToken: string;
};

/** Alias — customer auth returns the same token pair shape as staff. */
export type ApiCustomerAuthTokens = ApiLoginResponse;

/** POST /auth/customer/login */
export type ApiCustomerLoginBody = {
  email: string;
  password: string;
};

/** POST /auth/customer/signup */
export type ApiCustomerSignupBody = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  accountType?: "retail" | "wholesale";
  businessName?: string;
  businessType?: string;
  expectedOrderVolume?: string;
};

export type ApiHealthResponse = {
  status: string;
  database: string;
};

export type ListProductsParams = {
  page?: number;
  limit?: number;
  categoryId?: string;
  status?: "active" | "hidden" | "pre_order";
  isWholesaleEligible?: boolean;
  search?: string;
};

export type CreateCategoryDto = {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  isActive?: boolean;
  sortOrder?: number;
};

export type CreateProductDto = {
  name: string;
  slug: string;
  categoryId: string;
  description?: string;
  images?: string[];
  countryOfOrigin?: string;
  brand?: string;
  isWholesaleEligible?: boolean;
  lowStockThreshold?: number;
};

export type CreateVariantDto = {
  label: string;
  sku: string;
  barcode?: string;
  unitRetailPrice: number;
  stockQuantity?: number;
  lowStockThreshold?: number;
  weight?: number;
};

export type CreatePriceTierDto = {
  minQuantity: number;
  price: number;
  label?: string;
};

export type UpdateProductDto = {
  name?: string;
  slug?: string;
  description?: string;
  categoryId?: string;
  images?: string[];
  countryOfOrigin?: string;
  brand?: string;
  isWholesaleEligible?: boolean;
  lowStockThreshold?: number;
};

export type UpdateVariantDto = {
  label?: string;
  sku?: string;
  barcode?: string;
  unitRetailPrice?: number;
  lowStockThreshold?: number;
  weight?: number;
  status?: "active" | "hidden" | "pre_order";
};

export type AdjustStockDto = {
  delta: number;
};

export type UpdateProductStatusDto = {
  status: "active" | "hidden" | "pre_order";
};

export type ApiOrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded"
  | string;

export type ApiPaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded"
  | string;

export type ApiCustomerSummary = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  accountType: string;
  hasAccount: boolean;
  createdAt: string;
  erasedAt: string | null;
};

export type ApiOrderItem = {
  id: string;
  orderId: string;
  variantId: string;
  quantity: number;
  unitPriceAtOrder: string | number;
  lineTotal: string | number;
  variant?: {
    id: string;
    label: string;
    sku: string;
    product?: {
      id: string;
      name: string;
      slug: string;
    };
  };
};

export type ApiPayment = {
  id: string;
  orderId: string;
  provider: string;
  amount: string | number;
  currency: string;
  status: ApiPaymentStatus;
  providerReference: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ApiShipment = {
  id: string;
  orderId: string;
  method?: string;
  courierName?: string | null;
  trackingNumber?: string | null;
  status?: string;
  destinationSummary?: string | null;
  estimatedDeliveryAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type ApiDeliveryAddress = {
  id?: string;
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  province?: string | null;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;
};

export type ApiOrder = {
  id: string;
  orderNumber: number | string;
  customerId: string;
  type: "retail" | "wholesale" | string;
  status: ApiOrderStatus;
  paymentStatus: ApiPaymentStatus;
  subtotal: string | number;
  taxTotal: string | number;
  shippingTotal: string | number;
  discountTotal: string | number;
  total: string | number;
  deliveryMethod: "ship" | "local_delivery" | "pickup" | string;
  deliveryAddressId: string | null;
  promoCode: string | null;
  placedVia: string;
  createdAt: string;
  updatedAt: string;
  customer?: ApiCustomerSummary | null;
  deliveryAddress?: ApiDeliveryAddress | null;
  items?: ApiOrderItem[];
  shipment?: ApiShipment | null;
  payments?: ApiPayment[];
};

export type ListOrdersParams = {
  page?: number;
  limit?: number;
  status?: ApiOrderStatus;
  search?: string;
};

/** PATCH /admin/orders/{id}/status */
export type ApiUpdateOrderStatusBody = {
  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "refunded";
};

/** POST /admin/delivery/shipments */
export type ApiCreateShipmentBody = {
  orderId: string;
  method: "ship" | "local_delivery" | "pickup";
  courierName?: string;
  trackingNumber?: string;
};

/** PATCH /admin/delivery/shipments/{orderId} */
export type ApiUpdateShipmentBody = {
  courierName?: string;
  trackingNumber?: string;
  status?: "pending" | "out_for_delivery" | "delivered";
};

export type ApiCustomerAddress = {
  id: string;
  label?: string | null;
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  province?: string | null;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;
};

export type ApiCustomer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  accountType: string;
  hasAccount: boolean;
  googleId?: string | null;
  createdAt: string;
  erasedAt: string | null;
  addresses?: ApiCustomerAddress[];
  orders?: ApiOrder[];
  wholesaleAccount?: unknown;
};

export type ListCustomersParams = {
  page?: number;
  limit?: number;
  search?: string;
};

export type ApiPromotionDiscountType =
  | "percentage"
  | "fixed"
  | "free_shipping"
  | string;

export type ApiPromotionScope =
  | "store_wide"
  | "category"
  | "product"
  | string;

export type ApiPromotion = {
  id: string;
  code: string;
  discountType: ApiPromotionDiscountType;
  discountValue: string | number;
  scope: ApiPromotionScope;
  scopeIds: string[];
  startsAt: string;
  endsAt: string;
  usageLimit: number | null;
  usageCount: number;
};

export type ListPromotionsParams = {
  page?: number;
  limit?: number;
};

/** POST /admin/promotions */
export type ApiCreatePromotionBody = {
  code: string;
  discountType: "percentage" | "fixed" | "free_shipping";
  discountValue: number;
  scope?: "store_wide" | "category" | "product";
  scopeIds?: string[];
  startsAt: string;
  endsAt: string;
  usageLimit?: number;
};

/** PATCH /admin/promotions/{id} */
export type ApiUpdatePromotionBody = {
  code?: string;
  discountType?: "percentage" | "fixed" | "free_shipping";
  discountValue?: number;
  scope?: "store_wide" | "category" | "product";
  scopeIds?: string[];
  startsAt?: string;
  endsAt?: string;
  usageLimit?: number;
};

export type ApiDashboardLowStockItem = {
  id: string;
  productId: string;
  label: string;
  sku: string;
  stockQuantity: number;
  lowStockThreshold: number | null;
  status: string;
  product?: {
    id: string;
    name: string;
    slug: string;
  } | null;
};

export type ApiDashboardRecentOrder = {
  id: string;
  orderNumber: number | string;
  customerId: string;
  type: string;
  status: string;
  paymentStatus: string;
  total: string | number;
  deliveryMethod: string;
  createdAt: string;
  updatedAt: string;
  customer?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
};

export type ApiDashboardSummary = {
  today: {
    orderCount: number;
    revenue: number;
  };
  pendingWholesaleApprovals: number;
  lowStock: {
    count: number;
    items: ApiDashboardLowStockItem[];
  };
  recentOrders: ApiDashboardRecentOrder[];
};

/** GET /admin/settings */
export type ApiStoreSettings = {
  id: string;
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string | null;
  province: string | null;
  postalCode: string | null;
  country: string;
  pickupEnabled: boolean;
  pickupAddressLine1: string | null;
  pickupAddressLine2: string | null;
  pickupCity: string | null;
  pickupProvince: string | null;
  pickupPostalCode: string | null;
  pickupInstructions: string | null;
  freeShippingThreshold: string | number | null;
  refundApprovalThreshold: string | number | null;
  announcementText: string | null;
  updatedAt: string;
};

/** PATCH /admin/settings — UpdateStoreSettingsDto */
export type ApiUpdateStoreSettingsBody = {
  businessName?: string;
  businessEmail?: string;
  businessPhone?: string;
  addressLine1?: string;
  addressLine2?: string | null;
  city?: string;
  province?: string;
  postalCode?: string;
  country?: string;
  pickupEnabled?: boolean;
  pickupAddressLine1?: string | null;
  pickupAddressLine2?: string | null;
  pickupCity?: string | null;
  pickupProvince?: string | null;
  pickupPostalCode?: string | null;
  pickupInstructions?: string | null;
  freeShippingThreshold?: number;
};

/** GET /admin/staff/permissions item */
export type ApiPermission = {
  id: string;
  key: string;
};

/** Nested role on staff user assignment */
export type ApiStaffRoleSummary = {
  id: string;
  name: string;
};

export type ApiStaffRoleAssignment = {
  userId: string;
  roleId: string;
  role: ApiStaffRoleSummary;
};

/** GET /admin/staff item */
export type ApiStaffUser = {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  twoFactorEnabled?: boolean;
  roles: ApiStaffRoleAssignment[];
};

export type ListStaffParams = {
  page?: number;
  limit?: number;
  search?: string;
};

/** GET /admin/staff/roles item */
export type ApiStaffRole = {
  id: string;
  name: string;
  permissions: Array<{
    roleId: string;
    permissionId: string;
    permission: ApiPermission;
  }>;
};

/** POST /admin/staff — CreateStaffUserDto */
export type ApiCreateStaffUserBody = {
  email: string;
  password: string;
  name: string;
  roleIds?: string[];
};

/** PATCH /admin/staff/{id} — UpdateStaffUserDto */
export type ApiUpdateStaffUserBody = {
  name?: string;
  isActive?: boolean;
  password?: string;
  roleIds?: string[];
};

/** GET /admin/settings/payment */
export type ApiPaymentSettings = {
  provider: string;
  live: boolean;
};

/** GET /admin/settings/tax-rates item */
export type ApiTaxRate = {
  id: string;
  province: string;
  gstRate: number | string;
  pstRate: number | string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

/** POST /admin/settings/tax-rates */
export type ApiCreateTaxRateBody = {
  province: string;
  gstRate: number;
  pstRate?: number;
  isActive?: boolean;
};

/** PATCH /admin/settings/tax-rates/{id} */
export type ApiUpdateTaxRateBody = {
  province?: string;
  gstRate?: number;
  pstRate?: number;
  isActive?: boolean;
};

/** GET /admin/reports/sales period row */
export type ApiSalesReportPoint = {
  period: string;
  orderCount: number;
  revenue: number | string;
  retailRevenue?: number | string;
  wholesaleRevenue?: number | string;
};

/** GET /admin/reports/sales query */
export type ListSalesReportParams = {
  groupBy?: "day" | "week" | "month";
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
};

/** GET /public/categories node */
export type ApiPublicCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  children?: ApiPublicCategory[];
};

/** Nested category on public product payloads */
export type ApiPublicCategoryRef = {
  id: string;
  name: string;
  slug: string;
};

/** GET /public/products list item */
export type ApiPublicProductSummary = {
  id: string;
  slug: string;
  name: string;
  images: string[];
  brand: string | null;
  countryOfOrigin: string | null;
  isOrganic?: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  price: number | string;
  stockStatus: string;
  bulkPricingHint?: {
    minQuantity: number;
    price: number | string;
  } | null;
  category: ApiPublicCategoryRef;
};

/** GET /public/products/{slug} variant */
export type ApiPublicProductVariant = {
  id: string;
  label: string;
  sku: string;
  unitRetailPrice: number | string;
  weight?: number | null;
  stockStatus: string;
  priceTiers?: Array<{
    minQuantity: number;
    price: number | string;
    label?: string | null;
  }>;
};

/** GET /public/products/{slug} */
export type ApiPublicProductDetail = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  images: string[];
  brand: string | null;
  countryOfOrigin: string | null;
  isOrganic?: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  category: ApiPublicCategoryRef;
  variants: ApiPublicProductVariant[];
};

/** GET /public/products query */
export type ListPublicProductsParams = {
  page?: number;
  limit?: number;
  categorySlug?: string;
  search?: string;
};

/** Nested product on a public cart line */
export type ApiCartLineProduct = {
  id: string;
  slug: string;
  name: string;
  images: string[];
  categoryId?: string;
};

/** GET /public/cart item */
export type ApiCartItem = {
  id: string;
  variantId: string;
  variantLabel: string;
  sku: string;
  product: ApiCartLineProduct;
  quantity: number;
  unitPrice: number | string;
  lineTotal: number | string;
  dealId?: string | null;
  dealApplied?: boolean;
};

/** GET /public/cart */
export type ApiCart = {
  items: ApiCartItem[];
  subtotal: number | string;
  promoCode: string | null;
  promoApplied: boolean;
  discountTotal: number | string;
  total: number | string;
};

/** POST /public/cart/items */
export type ApiAddCartItemBody = {
  variantId: string;
  quantity: number;
  dealId?: string;
};

/** PATCH /public/cart/items/{itemId} */
export type ApiUpdateCartItemBody = {
  quantity: number;
};

/** POST /public/cart/promo-code */
export type ApiApplyPromoCodeBody = {
  code: string;
};

/** Public delivery method on checkout */
export type ApiDeliveryMethod = "ship" | "local_delivery" | "pickup";

/** POST /public/cart/checkout */
export type ApiCheckoutBody = {
  deliveryMethod: ApiDeliveryMethod;
  deliveryAddressId?: string;
};

/** POST /public/cart/checkout response */
export type ApiCheckoutResult = {
  orderId: string;
  orderNumber: number;
  total: number | string;
  clientSecret: string | null;
};

/** POST /public/orders/{orderId}/payment/retry response */
export type ApiPaymentRetryResult = {
  clientSecret: string | null;
};

/** GET/POST /public/addresses */
export type ApiPublicAddress = {
  id: string;
  customerId: string;
  label: string | null;
  line1: string;
  line2: string | null;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

/** POST /public/addresses */
export type ApiCreateAddressBody = {
  label?: string;
  line1: string;
  line2?: string;
  city: string;
  province: string;
  postalCode: string;
  country?: string;
  isDefault?: boolean;
};

/** PATCH /public/addresses/{addressId} */
export type ApiUpdateAddressBody = {
  label?: string;
  line1?: string;
  line2?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  country?: string;
  isDefault?: boolean;
};

/** GET /public/announcement */
export type ApiPublicAnnouncement = {
  text: string | null;
};

/** Nested product on a public wishlist line */
export type ApiWishlistLineProduct = {
  id: string;
  slug: string;
  name: string;
  images: string[];
};

/** GET /public/wishlist item */
export type ApiWishlistItem = {
  id: string;
  variantId: string;
  variantLabel: string;
  sku: string;
  product: ApiWishlistLineProduct;
};

/** GET /public/wishlist */
export type ApiWishlist = {
  items: ApiWishlistItem[];
};

/** POST /public/wishlist/items */
export type ApiAddWishlistItemBody = {
  variantId: string;
};
