"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

const DEFAULT_IMAGE = "/images/property/colive-property-default.webp";

type PropertyImageProps = Omit<ImageProps, "src" | "onError"> & { src?: string };

// Property photo that falls back to the Colive default image when it's missing or fails to load
// (many QA gallery files don't exist on qa.colive.com).
export default function PropertyImage({ src, alt, ...props }: PropertyImageProps) {
  const [failedSrc, setFailedSrc] = useState<string>();

  return <Image {...props} alt={alt} src={!src || src === failedSrc ? DEFAULT_IMAGE : src} onError={() => setFailedSrc(src)} />;
}
