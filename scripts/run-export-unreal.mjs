import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { execFileSync } from "node:child_process";
import { join, resolve } from "node:path";
import { createServer } from "vite";

const ROOT = resolve(process.cwd());
const UE_PROJECT_DIR = join(ROOT, "unreal", "KabileSavaslari");
const CONTENT_DIR = join(UE_PROJECT_DIR, "Content");
const DATA_DIR = join(CONTENT_DIR, "DataTables");
const MODELS_DIR = join(CONTENT_DIR, "Models");
const PBR_DIR = join(CONTENT_DIR, "Materials", "PBR");
const HDRI_DIR = join(CONTENT_DIR, "HDRI");
const ART_DIR = join(CONTENT_DIR, "UI", "Art");
const PUBLIC_MODELS_DIR = join(ROOT, "public", "models");
const PUBLIC_PBR_DIR = join(ROOT, "public", "pbr");
const PUBLIC_HDRI_DIR = join(ROOT, "public", "hdri");
const PUBLIC_ART_DIR = join(ROOT, "public", "art");
const ZIP_OUTPUT = join(ROOT, "public", "kabile-savaslari-unreal-engine-5.zip");

function copyDirIfPresent(src, dest, skipFiles = new Set()) {
  if (!existsSync(src)) return;
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    if (skipFiles.has(entry)) continue;
    const from = join(src, entry);
    const to = join(dest, entry);
    const st = statSync(from);
    if (st.isDirectory()) {
      copyDirIfPresent(from, to, skipFiles);
    } else {
      cpSync(from, to);
    }
  }
}

const server = await createServer({
  root: ROOT,
  logLevel: "error",
  server: { middlewareMode: true },
});

try {
  const mod = await server.ssrLoadModule(join(ROOT, "src/unrealExporter.ts"));
  const tables = mod.generateUnrealTables();

  for (const dir of [DATA_DIR, MODELS_DIR, PBR_DIR, HDRI_DIR, ART_DIR]) {
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });
  }

  for (const table of tables) {
    writeFileSync(join(DATA_DIR, `${table.name}.csv`), table.csv, "utf8");
    writeFileSync(join(DATA_DIR, `${table.name}.json`), table.json, "utf8");
  }

  copyDirIfPresent(PUBLIC_MODELS_DIR, MODELS_DIR, new Set(["soldier.glb"]));
  copyDirIfPresent(PUBLIC_PBR_DIR, PBR_DIR);
  copyDirIfPresent(PUBLIC_HDRI_DIR, HDRI_DIR);
  if (existsSync(join(PUBLIC_ART_DIR, "throne.png"))) {
    cpSync(join(PUBLIC_ART_DIR, "throne.png"), join(ART_DIR, "throne.png"));
  }
  if (existsSync(join(PUBLIC_ART_DIR, "heroes.png"))) {
    cpSync(join(PUBLIC_ART_DIR, "heroes.png"), join(ART_DIR, "heroes.png"));
  }

  writeFileSync(
    join(UE_PROJECT_DIR, "import_assets_in_editor.py"),
    `# Unreal Engine 5 Editor Python Script
# Unreal Editor icinde: Tools -> Execute Python Script... ile bu dosyayi secin.
import os
import unreal

project_dir = unreal.Paths.project_dir()
content_fs = os.path.join(project_dir, "Content")

asset_tools = unreal.AssetToolsHelpers.get_asset_tools()
tasks = []

for root, _, files in os.walk(os.path.join(content_fs, "Models")):
    for f in files:
        if f.endswith(".gltf"):
            rel = os.path.relpath(root, os.path.join(content_fs, "Models")).replace("\\\\", "/")
            dest = "/Game/ImportedModels/" + rel
            task = unreal.AssetImportTask()
            task.filename = os.path.join(root, f)
            task.destination_path = dest
            task.automated = True
            task.save = True
            task.replace_existing = True
            tasks.append(task)

if tasks:
    asset_tools.import_asset_tasks(tasks)
    unreal.log("Kabile Savaslari 3B glTF modelleri /Game/ImportedModels altina aktarildi.")
`,
    "utf8",
  );

  rmSync(ZIP_OUTPUT, { force: true });
  execFileSync("zip", ["-r", "-q", ZIP_OUTPUT, "KabileSavaslari"], {
    cwd: join(ROOT, "unreal"),
  });

  console.log(
    `Unreal Engine 5 paketi hazir: ${UE_PROJECT_DIR} (${tables.length} DataTable) -> ${ZIP_OUTPUT}`,
  );
} finally {
  await server.close();
}
