#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "KSTypes.h"
#include "KSMatchDirector.generated.h"

class AKSHexTileActor;
class AKSCameraPawn;
class UKSRootWidget;
class UMaterialInterface;

UENUM()
enum class EKSScreen : uint8
{
    Intro,
    Menu,
    Pick,
    Play
};

UCLASS()
class KABILESAVASLARI_API AKSMatchDirector : public AActor
{
    GENERATED_BODY()

public:
    AKSMatchDirector();

    void ShowMenu();
    void ShowTribePick();
    void ChooseTribe(EKSTribeId Tribe);
    void SelectTile(AKSHexTileActor* Tile);
    void BuildOnSelected(EKSBuildingSlot Slot, int32 GoldCost);
    void TrainArmy();
    void AttackSelected();

    bool IsPlaying() const { return Screen == EKSScreen::Play; }
    FText GetTitle() const;
    FText GetBody() const;
    FText GetStatus() const;
    FText GetToast() const;

    virtual void Tick(float DeltaSeconds) override;

protected:
    virtual void BeginPlay() override;

private:
    void DressWorld();
    void ClearMap();
    void BuildMap();
    void FocusCamera();
    FString ScrollTitle(int32 Level) const;
    void GrantXp(int32 Amount);
    AKSHexTileActor* FindTile(int32 Q, int32 R) const;
    bool OwnsNeighbor(const AKSHexTileActor* Tile) const;

    UPROPERTY()
    TObjectPtr<UKSRootWidget> Hud;

    UPROPERTY()
    TObjectPtr<UMaterialInterface> TileMaterial;

    UPROPERTY()
    TArray<TObjectPtr<AKSHexTileActor>> Tiles;

    UPROPERTY()
    TObjectPtr<AKSHexTileActor> Selected;

    EKSScreen Screen = EKSScreen::Intro;
    EKSTribeId PlayerTribe = EKSTribeId::Neutral;
    int32 Gold = 160;
    int32 Level = 1;
    int32 Xp = 0;
    int32 Army = 8;
    FString Toast;
    float AiTimer = 0.f;
    float IncomeTimer = 0.f;
};
