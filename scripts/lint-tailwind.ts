import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { Scanner } from "@tailwindcss/oxide";
import { __unstable__loadDesignSystem as loadDesignSystem } from "tailwindcss";

interface Diagnostic {
  filePath: string;
  line: number;
  col: number;
  position: number;
  length: number;
  original: string;
  canonical: string;
}

function getLineAndCol(
  content: string,
  offset: number,
): { line: number; col: number } {
  let line = 1;
  let col = 1;
  for (let i = 0; i < offset && i < content.length; i++) {
    if (content[i] === "\n") {
      line++;
      col = 1;
    } else {
      col++;
    }
  }
  return { line, col };
}

function collectSourceFiles(dir: string): string[] {
  const results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectSourceFiles(fullPath));
    } else if (
      entry.isFile() &&
      (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) &&
      !entry.name.endsWith(".d.ts")
    ) {
      results.push(fullPath);
    }
  }
  return results;
}

async function main() {
  const isFix = process.argv.includes("--fix");
  const projectRoot = process.cwd();
  const cssPath = path.resolve(projectRoot, "src/global.css");

  if (!fs.existsSync(cssPath)) {
    console.error(`Tailwind entry stylesheet not found: ${cssPath}`);
    process.exit(1);
  }

  const css = fs.readFileSync(cssPath, "utf8");

  const ds = await loadDesignSystem(css, {
    base: path.dirname(cssPath),
    loadStylesheet: async (id: string, base: string) => {
      let resolved: string;
      if (id.startsWith("tailwindcss/")) {
        const fileUrl = import.meta.resolve(id);
        resolved = fileURLToPath(fileUrl);
      } else if (id.startsWith("file://")) {
        resolved = fileURLToPath(id);
      } else {
        resolved = path.resolve(base, id);
      }
      const content = await fs.promises.readFile(resolved, "utf8");
      return {
        path: resolved,
        base: path.dirname(resolved),
        content,
      };
    },
  });

  const scanner = new Scanner({});
  const srcDir = path.resolve(projectRoot, "src");
  const files = collectSourceFiles(srcDir);

  const allDiagnostics: Diagnostic[] = [];

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const extension = path.extname(file).replace(/^\./, "");
    const candidates = scanner.getCandidatesWithPositions({
      content,
      extension,
    });

    const fileDiagnostics: Diagnostic[] = [];

    for (const item of candidates) {
      const canonical = ds.canonicalizeCandidates([item.candidate])[0];
      if (canonical && canonical !== item.candidate) {
        const { line, col } = getLineAndCol(content, item.position);
        fileDiagnostics.push({
          filePath: file,
          line,
          col,
          position: item.position,
          length: item.candidate.length,
          original: item.candidate,
          canonical,
        });
      }
    }

    if (isFix && fileDiagnostics.length > 0) {
      // Sort in reverse order by position to prevent offset shifting
      fileDiagnostics.sort((a, b) => b.position - a.position);
      let newContent = content;
      for (const diag of fileDiagnostics) {
        const before = newContent.slice(0, diag.position);
        const after = newContent.slice(diag.position + diag.length);
        newContent = before + diag.canonical + after;
      }
      fs.writeFileSync(file, newContent, "utf8");
      console.log(
        `Fixed ${fileDiagnostics.length.toString()} non-canonical class(es) in ${path.relative(projectRoot, file)}`,
      );
    } else {
      allDiagnostics.push(...fileDiagnostics);
    }
  }

  if (isFix) {
    console.log("Tailwind class canonicalization complete.");
    return;
  }

  if (allDiagnostics.length > 0) {
    console.error(
      `Found ${allDiagnostics.length.toString()} non-canonical Tailwind CSS class(es):`,
    );
    for (const diag of allDiagnostics) {
      const relativePath = path.relative(projectRoot, diag.filePath);
      console.error(
        `  ${relativePath}:${diag.line.toString()}:${diag.col.toString()} - [suggestCanonicalClasses] '${diag.original}' can be written as '${diag.canonical}'`,
      );
    }
    console.error(
      "\nRun `npm run lint:tailwind --fix` to auto-fix these issues.",
    );
    process.exit(1);
  }

  console.log("All Tailwind CSS classes are canonical.");
}

void main();
