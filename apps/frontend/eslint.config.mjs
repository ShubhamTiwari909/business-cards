import { defineConfig } from "eslint/config";
import { nextJsConfig } from "@repo/eslint-config/next-js";
import { config as baseConfig } from "@repo/eslint-config/base"
import { config as reactInternalConfig } from "@repo/eslint-config/react-internal"


const eslintConfig = defineConfig([
  ...nextJsConfig,
  ...baseConfig,
  ...reactInternalConfig

]);

export default eslintConfig;
