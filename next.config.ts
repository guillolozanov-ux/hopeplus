import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Una sola calidad alta para todo el sitio: las fotos se veían degradadas al 75 % por defecto
    qualities: [90],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
