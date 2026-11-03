#include "KabileSavaslariEditor.h"

#include "AssetToolsModule.h"
#include "EditorAssetLibrary.h"
#include "Factories/MaterialFactoryNew.h"
#include "MaterialEditingLibrary.h"
#include "Materials/Material.h"
#include "Materials/MaterialExpressionScalarParameter.h"
#include "Materials/MaterialExpressionVectorParameter.h"
#include "Containers/Ticker.h"
#include "Modules/ModuleManager.h"

namespace
{
void EnsureTileMaterial()
{
    const FString AssetPath = TEXT("/Game/Materials/M_TilePBR");
    if (UEditorAssetLibrary::DoesAssetExist(AssetPath))
    {
        return;
    }

    IAssetTools& AssetTools = FModuleManager::LoadModuleChecked<FAssetToolsModule>(TEXT("AssetTools")).Get();
    UMaterialFactoryNew* Factory = NewObject<UMaterialFactoryNew>();
    UMaterial* Material = Cast<UMaterial>(AssetTools.CreateAsset(
        TEXT("M_TilePBR"),
        TEXT("/Game/Materials"),
        UMaterial::StaticClass(),
        Factory));
    if (!Material)
    {
        return;
    }

    UMaterialExpressionVectorParameter* Color = Cast<UMaterialExpressionVectorParameter>(
        UMaterialEditingLibrary::CreateMaterialExpression(Material, UMaterialExpressionVectorParameter::StaticClass(), -350, -40));
    UMaterialExpressionScalarParameter* Rough = Cast<UMaterialExpressionScalarParameter>(
        UMaterialEditingLibrary::CreateMaterialExpression(Material, UMaterialExpressionScalarParameter::StaticClass(), -350, 120));
    if (Color)
    {
        Color->ParameterName = TEXT("BaseColor");
        Color->DefaultValue = FLinearColor(0.45f, 0.32f, 0.18f);
        UMaterialEditingLibrary::ConnectMaterialProperty(Color, TEXT(""), MP_BaseColor);
    }
    if (Rough)
    {
        Rough->ParameterName = TEXT("Roughness");
        Rough->DefaultValue = 0.62f;
        UMaterialEditingLibrary::ConnectMaterialProperty(Rough, TEXT(""), MP_Roughness);
    }
    Material->TwoSided = true;
    UMaterialEditingLibrary::RecompileMaterial(Material);
    UEditorAssetLibrary::SaveLoadedAsset(Material, false);
}
}

class FKabileSavaslariEditorModule : public IModuleInterface
{
public:
    virtual void StartupModule() override
    {
        FTSTicker::GetCoreTicker().AddTicker(FTickerDelegate::CreateLambda([](float)
        {
            EnsureTileMaterial();
            return false;
        }), 2.f);
    }
};

IMPLEMENT_MODULE(FKabileSavaslariEditorModule, KabileSavaslariEditor);
