import fs from "node:fs";
import process from "node:process";
import path from "node:path";

import * as catppuccinPack from "@iconify-json/catppuccin";
import * as lucidePack from "@iconify-json/lucide";

const iconPacks = [catppuccinPack, lucidePack];

iconPacks.forEach((pack) => {
  const icons: string[] = [];
  const size = pack.info.height;

  Object.keys(pack.icons.icons).forEach((name) => {
    let content = pack.icons.icons[name].body.trim();
    content = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${content}</svg>`;

    const data = Buffer.from(content).toString("base64");
    icons.push(`  "${name}":\n    url(data:image/svg+xml;base64,${data}),`);
  });

  const output = `$${pack.icons.prefix}: (\n${icons.join("\n")}\n);\n`;
  fs.writeFileSync(path.join(process.cwd(), `src/scss/icons/${pack.icons.prefix}.scss`), output);
});
