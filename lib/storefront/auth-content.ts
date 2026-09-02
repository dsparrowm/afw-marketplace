/** Auth card copy — Figma `29:15` login / `28:1161` signup */

export const authContent = {
  brandSubtitle: "Your account for authentic African food in Canada.",
  tabs: {
    login: "Log In",
    signup: "Sign Up",
  },
  social: {
    apple: "Continue with Apple",
    google: "Continue with Google",
    divider: "or",
  },
  login: {
    emailLabel: "Email Address",
    emailPlaceholder: "adaeze@okaforfoods.ca",
    passwordLabel: "Password",
    forgotPassword: "Forgot password?",
    submit: "Login",
    bottomPrompt: "Don't have an account?",
    bottomLink: "Sign Up",
  },
  signup: {
    nameLabel: "Full Name",
    namePlaceholder: "Adaeze Okafor",
    emailLabel: "Email Address",
    emailPlaceholder: "adaeze@okaforfoods.ca",
    passwordLabel: "Password",
    accountTypeLabel: "Account Type",
    personal: "Personal",
    business: "Business / Wholesale",
    businessNameLabel: "Business Name",
    businessNamePlaceholder: "Okafor Foods & Catering",
    businessTypeLabel: "Business Type",
    orderVolumeLabel: "Expected Monthly Order Volume",
    businessInfo:
      "Business accounts are reviewed and approved within 1 business day — you can keep shopping at retail pricing while you wait.",
    consent: "I agree to the Terms & Privacy Policy",
    submitPersonal: "Sign Up",
    submitBusiness: "Submit Application",
    bottomPrompt: "Already have an account?",
    bottomLink: "Log In",
  },
  businessTypes: [
    "Restaurant / Catering",
    "Grocery / Retail",
    "Food Distributor",
    "Other",
  ] as const,
  orderVolumes: [
    { value: "small" as const, label: "Small (< $500)" },
    { value: "medium" as const, label: "Medium ($500-$2k)" },
    { value: "large" as const, label: "Large ($2k+)" },
  ],
} as const;
