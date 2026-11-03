using UnrealBuildTool;

public class KabileSavaslari : ModuleRules
{
    public KabileSavaslari(ReadOnlyTargetRules Target) : base(Target)
    {
        PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;

        PublicDependencyModuleNames.AddRange(new string[]
        {
            "Core",
            "CoreUObject",
            "Engine",
            "InputCore",
            "EnhancedInput",
            "UMG",
            "Slate",
            "SlateCore",
            "Json",
            "JsonUtilities",
            "ProceduralMeshComponent"
        });
    }
}
