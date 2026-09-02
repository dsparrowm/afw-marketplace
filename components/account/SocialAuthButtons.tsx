"use client";

import { AuthProviderIcon } from "@/components/icons/AuthProviderIcon";
import { Button } from "@/components/ui/button";
import { authContent } from "@/lib/storefront/auth-content";

/** Apple + Google auth buttons — UI only until OAuth backend confirmed */
export function SocialAuthButtons() {
  return (
    <div className="space-y-3" data-figma-node="29:25">
      <Button
        type="button"
        variant="outline"
        className="h-11 w-full justify-center gap-3 rounded-xl text-sm font-medium"
        disabled
        title="Social sign-in coming soon"
      >
        <AuthProviderIcon provider="apple" size={16} />
        {authContent.social.apple}
      </Button>
      <Button
        type="button"
        variant="outline"
        className="h-11 w-full justify-center gap-3 rounded-xl text-sm font-medium"
        disabled
        title="Social sign-in coming soon"
      >
        <AuthProviderIcon provider="google" size={16} />
        {authContent.social.google}
      </Button>
    </div>
  );
}
