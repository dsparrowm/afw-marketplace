# 08 — Auth (Login & Signup)

## Goal

Implement login and signup flows matching Figma auth frames.

## Figma References

| Variant | Node ID | Cache |
| --- | --- | --- |
| Login | `29:15` | `figma-cache/storefront/auth-login/` |
| Signup | `28:1161` | `figma-cache/storefront/auth-signup/` |

Both use the `auth-login-signup` frame name with different content.

## Routes

- `app/(auth)/login/page.tsx`
- `app/(auth)/signup/page.tsx`
- Or single `/auth` page with tab toggle (match Figma tab pattern)

## Login (`29:15`)

Auth card (480px wide, centered):

- Logo + brand subtitle
- Tabs: Log In | Sign Up
- Social auth: Continue with Apple, Continue with Google
- Divider: "or"
- Fields: Email, Password
- "Forgot password" link
- Login submit button
- Bottom switch: "Don't have an account? Sign Up"

## Signup (`28:1161`)

Extended auth card:

- Same header and social auth
- Fields: Full Name, Email, Password
- Account type toggle: Personal | Business / Wholesale
- Business fields (visible when Business selected):
  - Business Name
  - Business Type (dropdown)
  - Expected Monthly Order Volume (Small / Medium / Large selector)
  - Info box: "Business accounts are reviewed and approved within 1 business day..."
- Consent checkbox: Terms & Privacy Policy
- Submit: "Submit Application" (business) or "Sign Up" (personal)
- Bottom switch: "Already have an account? Log In"

## Components

```
components/account/
  AuthLayout.tsx
  AuthCard.tsx
  AuthTabs.tsx
  SocialAuthButtons.tsx
  LoginForm.tsx
  SignupForm.tsx
  AccountTypeToggle.tsx
  BusinessDetailsFields.tsx
```

## Implementation Steps

1. Read `auth-login/metadata.xml` and `auth-signup/metadata.xml`
2. Create auth layout (centered card, no storefront shell)
3. Implement tab switching between login and signup
4. Implement login form with validation
5. Implement signup form with personal/business toggle
6. Social auth buttons — UI only until OAuth backend confirmed
7. Wire login to session creation (`lib/auth/`)
8. Redirect to `returnUrl` or `/account/orders` after login

## Acceptance Criteria

- [ ] Login form validates email and password
- [ ] Signup shows/hides business fields based on account type toggle
- [ ] Tab switch between login and signup works
- [ ] Social auth buttons render per Figma (functional wiring deferred)
- [ ] Successful login creates session and redirects
- [ ] Layout matches Figma auth card at 1200px viewport
