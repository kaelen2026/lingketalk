import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { ignores } from "./base.js";

export default defineConfig([...nextVitals, ...nextTs, ignores]);
