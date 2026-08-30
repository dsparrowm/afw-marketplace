import Image from "next/image";
import { cn } from "@/lib/utils";

export type FigmaImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

/** Renders a committed Figma export from public/. Do not use for placeholders. */
export function FigmaImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
}: FigmaImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={cn("shrink-0 object-contain", className)}
    />
  );
}
