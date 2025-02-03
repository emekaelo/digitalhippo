import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});
const rulesDir = path.join(__dirname, "scripts", "eslint", "rules");
const ext = ".cjs";
const ruleFiles = fs.readdirSync(rulesDir).filter((p) => p.endsWith(ext));

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      local: {
        rules: Object.fromEntries(
          ruleFiles.map((p) => {
            return [p.slice(0, -ext.length), require(path.join(rulesDir, p))];
          }),
        ),
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/explicit-any": "off",
    },
  },
];

export default eslintConfig;
