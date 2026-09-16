"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap-setup";

const PIXEL_SPEED = 55;

export type AnnouncementBarClientProps = {
  messages: string[];
};

export function AnnouncementBarClient({ messages }: AnnouncementBarClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track || messages.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const halfWidth = track.scrollWidth / 2;
        if (halfWidth <= 0) return;

        const tween = gsap.to(track, {
          x: -halfWidth,
          duration: halfWidth / PIXEL_SPEED,
          ease: "none",
          repeat: -1,
        });

        const container = containerRef.current;
        if (!container) return;

        const pause = () => tween.pause();
        const play = () => tween.play();

        container.addEventListener("mouseenter", pause);
        container.addEventListener("mouseleave", play);
        container.addEventListener("focusin", pause);
        container.addEventListener("focusout", play);

        return () => {
          container.removeEventListener("mouseenter", pause);
          container.removeEventListener("mouseleave", play);
          container.removeEventListener("focusin", pause);
          container.removeEventListener("focusout", play);
        };
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: messages },
  );

  if (messages.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="bg-announcement text-announcement-foreground"
    >
      <ul className="sr-only">
        {messages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>

      <div className="mx-auto flex h-[31px] max-w-[1440px] items-center overflow-hidden px-4 lg:h-10">
        <p className="hidden w-full text-center text-[11px] font-semibold tracking-wide motion-reduce:block lg:text-sm">
          {messages[0]}
        </p>

        <div
          ref={trackRef}
          className="flex w-max whitespace-nowrap text-[11px] font-semibold tracking-wide will-change-transform motion-reduce:hidden lg:text-sm"
          aria-hidden
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {messages.map((message) => (
                <span
                  key={`${copy}-${message}`}
                  className="inline-flex items-center px-8"
                >
                  {message}
                  <span className="mx-8 opacity-50" aria-hidden>
                    •
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
