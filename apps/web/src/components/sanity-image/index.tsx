"use client";

import {
  SANITY_STUDIO_API_VERSION,
  SANITY_STUDIO_DATASET,
  SANITY_STUDIO_PROJECT_ID,
} from "@utils";
import NextImage from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { CSSProperties } from "react";
import { ImageProps } from "src/utils/queries/image-field";

export type SanityImageProps = {
  imageField: ImageProps;
  priority?: boolean;
  sizes?: string;
  className?: string;
  loading?: "eager" | "lazy" | undefined;
} & (
  | {
      fill?: true;
      sizes: string;
      width?: never;
      height?: never;
    }
  | {
      fill?: false;
      width?: number;
      height?: number;
    }
);

const clientLike = {
  config() {
    return {
      apiVersion: SANITY_STUDIO_API_VERSION,
      projectId: SANITY_STUDIO_PROJECT_ID,
      dataset: SANITY_STUDIO_DATASET,
      perspective: "published",
      useCdn: true,
      stega: {
        enabled: false,
        studioUrl: "http://localhost:3333/",
      },
    };
  },
};

export function SanityImage({
  imageField,
  priority = false,
  fill = true,
  className,
  width,
  height,
  ...props
}: SanityImageProps) {
  const imageProps = useNextSanityImage(clientLike, imageField);

  if (!imageProps) {
    return null;
  }

  const style: CSSProperties = {};
  if (imageField && "hotspot" in imageField && imageField.hotspot) {
    style.objectPosition = `${imageField.hotspot.x * 100}% ${imageField.hotspot.y * 100}%`;
  }

  const imageWidth = width ?? imageProps.width;
  const imageHeight = height ?? imageProps.height;

  return (
    <NextImage
      {...imageProps}
      width={fill ? undefined : imageWidth}
      height={fill ? undefined : imageHeight}
      alt={imageField?.alt ?? ""}
      placeholder="blur"
      blurDataURL={imageField?.metadata?.lqip || ""}
      priority={priority}
      fill={fill}
      className={className}
      {...props}
      style={style}
    />
  );
}
