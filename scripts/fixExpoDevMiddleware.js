const fs = require("fs");
const path = require("path");

const workspaceRoot = process.cwd();
const source = path.join(
  workspaceRoot,
  "node_modules",
  "@react-native",
  "dev-middleware",
  "dist",
  "inspector-proxy",
  "CdpDebugLogging.js"
);
const target = path.join(
  workspaceRoot,
  "node_modules",
  "expo",
  "node_modules",
  "@react-native",
  "dev-middleware",
  "dist",
  "inspector-proxy",
  "CdpDebugLogging.js"
);

function ensureNestedCdpDebugLogging() {
  if (!fs.existsSync(source)) {
    console.log("[postinstall] Source file not found, skipping Expo middleware fix.");
    return;
  }

  const targetDir = path.dirname(target);
  if (!fs.existsSync(targetDir)) {
    console.log("[postinstall] Target directory not found, skipping Expo middleware fix.");
    return;
  }

  if (!fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log("[postinstall] Restored missing Expo dev-middleware file.");
    return;
  }

  console.log("[postinstall] Expo dev-middleware file already present.");
}

ensureNestedCdpDebugLogging();
