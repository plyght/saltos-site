import nextConfig from "eslint-config-next";
import nextTypescript from "eslint-config-next/typescript";

const config = [
  ...nextConfig,
  ...nextTypescript,
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];

export default config;
