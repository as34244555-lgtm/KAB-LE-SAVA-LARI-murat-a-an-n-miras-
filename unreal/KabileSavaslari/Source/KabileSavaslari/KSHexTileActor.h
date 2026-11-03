#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "KSTypes.h"
#include "KSHexTileActor.generated.h"

class UProceduralMeshComponent;
class UMaterialInstanceDynamic;
class UPointLightComponent;

UCLASS()
class KABILESAVASLARI_API AKSHexTileActor : public AActor
{
    GENERATED_BODY()

public:
    AKSHexTileActor();

    void SetupTile(const FKSHexTileData& InData, EKSTribeId PlayerTribe, UMaterialInterface* MasterMaterial);
    void SetSelected(bool bInSelected);
    void RefreshLook(EKSTribeId PlayerTribe);

    const FKSHexTileData& GetData() const { return Data; }
    FKSHexTileData& GetDataMutable() { return Data; }

private:
    void BuildGround(const FLinearColor& Color, float Height);
    void BuildStructure(const FLinearColor& Color);

    UPROPERTY(VisibleAnywhere)
    TObjectPtr<UProceduralMeshComponent> Ground;

    UPROPERTY(VisibleAnywhere)
    TObjectPtr<UProceduralMeshComponent> Structure;

    UPROPERTY(VisibleAnywhere)
    TObjectPtr<UPointLightComponent> HearthLight;

    UPROPERTY()
    TObjectPtr<UMaterialInstanceDynamic> GroundMid;

    UPROPERTY()
    TObjectPtr<UMaterialInstanceDynamic> StructureMid;

    FKSHexTileData Data;
    bool bSelected = false;
    float HexRadius = 210.f;
};
