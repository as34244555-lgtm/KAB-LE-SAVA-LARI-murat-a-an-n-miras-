using UnrealBuildTool;

public class KabileSavaslariEditor : ModuleRules
{
    public KabileSavaslariEditor(ReadOnlyTargetRules Target) : base(Target)
    {
        PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;

        PrivateDependencyModuleNames.AddRange(new string[]
        {
            "Core",
            "CoreUObject",
            "Engine",
            "UnrealEd",
            "MaterialEditor",
            "AssetTools",
            "EditorScriptingUtilities"
        });
    }
}
