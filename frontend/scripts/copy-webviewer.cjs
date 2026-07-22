const fs = require("fs");
const path = require("path");

const source = path.resolve(
  __dirname,
  "../node_modules/@pdftron/webviewer/public"
);

const destination = path.resolve(
  __dirname,
  "../public/WebViewer/lib"
);

if (!fs.existsSync(source)) {
  console.error(`WebViewer source folder does not exist: ${source}`);
  process.exit(1);
}

fs.mkdirSync(destination, { recursive: true });

fs.cpSync(source, destination, {
  recursive: true,
  force: true,
});

console.log("WebViewer files copied successfully.");