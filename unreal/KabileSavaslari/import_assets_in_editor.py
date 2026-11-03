# Unreal Engine 5 Editor Python Script
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
            rel = os.path.relpath(root, os.path.join(content_fs, "Models")).replace("\\", "/")
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
