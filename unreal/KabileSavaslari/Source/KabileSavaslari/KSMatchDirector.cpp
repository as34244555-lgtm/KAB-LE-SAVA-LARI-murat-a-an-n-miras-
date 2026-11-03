#include "KSMatchDirector.h"

#include "KSCameraPawn.h"
#include "KSHexTileActor.h"
#include "KSRootWidget.h"
#include "KSRulesLibrary.h"
#include "Components/DirectionalLightComponent.h"
#include "Components/ExponentialHeightFogComponent.h"
#include "Components/SkyAtmosphereComponent.h"
#include "Components/SkyLightComponent.h"
#include "Engine/DirectionalLight.h"
#include "Engine/ExponentialHeightFog.h"
#include "Engine/PostProcessVolume.h"
#include "Engine/SkyAtmosphere.h"
#include "Engine/SkyLight.h"
#include "Engine/World.h"
#include "EngineUtils.h"
#include "Kismet/GameplayStatics.h"
#include "Materials/MaterialInterface.h"
#include "Misc/FileHelper.h"
#include "Serialization/JsonReader.h"
#include "Serialization/JsonSerializer.h"

namespace
{
struct FHall
{
    EKSTribeId Tribe;
    int32 Q;
    int32 R;
    bool bCapital;
};

const FHall GHalls[] = {
    { EKSTribeId::Sariklilar, -7, 4, true },
    { EKSTribeId::Sariklilar, -14, 1, false },
    { EKSTribeId::Sariklilar, -6, -3, false },
    { EKSTribeId::Gokhanli, 0, 0, true },
    { EKSTribeId::Gokhanli, 1, -10, false },
    { EKSTribeId::Gokhanli, -8, -8, false },
    { EKSTribeId::Demirhisar, 7, -3, true },
    { EKSTribeId::Demirhisar, 13, 0, false },
    { EKSTribeId::Demirhisar, 4, -9, false },
};

const TCHAR* TribeName(EKSTribeId Tribe)
{
    switch (Tribe)
    {
    case EKSTribeId::Sariklilar: return TEXT("Sarıklılar");
    case EKSTribeId::Gokhanli: return TEXT("Gök-Hanlı");
    case EKSTribeId::Demirhisar: return TEXT("Demir-Hisar");
    default: return TEXT("Boş toprak");
    }
}
}

AKSMatchDirector::AKSMatchDirector()
{
    PrimaryActorTick.bCanEverTick = true;
}

void AKSMatchDirector::BeginPlay()
{
    Super::BeginPlay();
    DressWorld();
    TileMaterial = LoadObject<UMaterialInterface>(nullptr, TEXT("/Game/Materials/M_TilePBR.M_TilePBR"));
    if (!TileMaterial)
    {
        TileMaterial = LoadObject<UMaterialInterface>(nullptr, TEXT("/Engine/EngineDebugMaterials/VertexColorViewMode_ColorOnly.VertexColorViewMode_ColorOnly"));
    }
    if (APlayerController* PC = UGameplayStatics::GetPlayerController(this, 0))
    {
        Hud = CreateWidget<UKSRootWidget>(PC, UKSRootWidget::StaticClass());
    }
    else if (UWorld* World = GetWorld())
    {
        Hud = CreateWidget<UKSRootWidget>(World, UKSRootWidget::StaticClass());
    }
    if (Hud)
    {
        Hud->SetDirector(this);
        Hud->AddToViewport(10);
    }
    Toast = TEXT("Murat Ağa'nın tahtı boş. Bir sancak seç; bina ve asker senin seviyeni geçemez.");
}

void AKSMatchDirector::DressWorld()
{
    UWorld* World = GetWorld();
    if (!World)
    {
        return;
    }
    FActorSpawnParameters Params;
    Params.SpawnCollisionHandlingOverride = ESpawnActorCollisionHandlingMethod::AlwaysSpawn;

    World->SpawnActor<ASkyAtmosphere>(FVector::ZeroVector, FRotator::ZeroRotator, Params);

    ADirectionalLight* Sun = World->SpawnActor<ADirectionalLight>(FVector(0.f, 0.f, 800.f), FRotator(-42.f, 28.f, 0.f), Params);
    if (Sun)
    {
        if (UDirectionalLightComponent* SunLight = Cast<UDirectionalLightComponent>(Sun->GetLightComponent()))
        {
            SunLight->SetMobility(EComponentMobility::Movable);
            SunLight->SetIntensity(12.f);
            SunLight->SetAtmosphereSunLight(true);
            SunLight->SetCastShadows(true);
            SunLight->SetLightColor(FLinearColor(1.f, 0.82f, 0.62f));
        }
    }

    ASkyLight* Sky = World->SpawnActor<ASkyLight>(FVector::ZeroVector, FRotator::ZeroRotator, Params);
    if (Sky && Sky->GetLightComponent())
    {
        Sky->GetLightComponent()->SetMobility(EComponentMobility::Movable);
        Sky->GetLightComponent()->SetRealTimeCapture(true);
        Sky->GetLightComponent()->SetIntensity(1.15f);
        Sky->GetLightComponent()->RecaptureSky();
    }

    AExponentialHeightFog* Fog = World->SpawnActor<AExponentialHeightFog>(FVector::ZeroVector, FRotator::ZeroRotator, Params);
    if (Fog && Fog->GetComponent())
    {
        Fog->GetComponent()->SetFogDensity(0.018f);
        Fog->GetComponent()->SetFogHeightFalloff(0.18f);
        Fog->GetComponent()->SetVolumetricFog(true);
        Fog->GetComponent()->SetFogInscatteringColor(FLinearColor(0.72f, 0.48f, 0.32f));
    }

    APostProcessVolume* Post = World->SpawnActor<APostProcessVolume>(FVector::ZeroVector, FRotator::ZeroRotator, Params);
    if (Post)
    {
        Post->bUnbound = true;
        Post->Settings.bOverride_BloomIntensity = true;
        Post->Settings.BloomIntensity = 0.55f;
        Post->Settings.bOverride_VignetteIntensity = true;
        Post->Settings.VignetteIntensity = 0.42f;
        Post->Settings.bOverride_AutoExposureBias = true;
        Post->Settings.AutoExposureBias = 0.85f;
        Post->Settings.bOverride_ColorSaturation = true;
        Post->Settings.ColorSaturation = FVector4(1.12f, 1.05f, 0.96f, 1.f);
    }
}

void AKSMatchDirector::Tick(float DeltaSeconds)
{
    Super::Tick(DeltaSeconds);
    if (Screen != EKSScreen::Play)
    {
        return;
    }
    IncomeTimer += DeltaSeconds;
    if (IncomeTimer > 6.f)
    {
        IncomeTimer = 0.f;
        int32 Halls = 0;
        for (AKSHexTileActor* Tile : Tiles)
        {
            if (Tile && Tile->GetData().Owner == PlayerTribe && Tile->GetData().Slot == EKSBuildingSlot::Hall)
            {
                ++Halls;
            }
        }
        Gold += 4 + Halls * 3;
    }
    AiTimer += DeltaSeconds;
    if (AiTimer > 14.f)
    {
        AiTimer = 0.f;
        for (AKSHexTileActor* Tile : Tiles)
        {
            if (!Tile || Tile->GetData().Owner == PlayerTribe || Tile->GetData().Owner == EKSTribeId::Neutral)
            {
                continue;
            }
            if (!OwnsNeighbor(Tile))
            {
                continue;
            }
            if (FMath::FRand() > 0.35f)
            {
                continue;
            }
            Toast = FString::Printf(TEXT("%s karakolundan akın geldi."), TribeName(Tile->GetData().Owner));
            if (Army > 1)
            {
                Army -= 1;
            }
            break;
        }
    }
}

void AKSMatchDirector::ShowMenu()
{
    Screen = EKSScreen::Menu;
}

void AKSMatchDirector::ShowTribePick()
{
    Screen = EKSScreen::Pick;
    Toast = TEXT("Üç kabilenin hepsini yönetmezsin. Tek bir sancak seç.");
}

void AKSMatchDirector::ChooseTribe(EKSTribeId Tribe)
{
    if (Tribe == EKSTribeId::Neutral || Tribe == EKSTribeId::Player)
    {
        return;
    }
    PlayerTribe = Tribe;
    Gold = 160;
    Level = 1;
    Xp = 0;
    Army = 8;
    Screen = EKSScreen::Play;
    Toast = FString::Printf(TEXT("%s sancağını aldın. Hançerin izini bu toprakta sür."), TribeName(Tribe));
    BuildMap();
    FocusCamera();
}

void AKSMatchDirector::ClearMap()
{
    for (AKSHexTileActor* Tile : Tiles)
    {
        if (Tile)
        {
            Tile->Destroy();
        }
    }
    Tiles.Empty();
    Selected = nullptr;
}

void AKSMatchDirector::BuildMap()
{
    ClearMap();
    int32 OriginQ = 0;
    int32 OriginR = 0;
    for (const FHall& Hall : GHalls)
    {
        if (Hall.Tribe == PlayerTribe && Hall.bCapital)
        {
            OriginQ = Hall.Q;
            OriginR = Hall.R;
        }
    }
    constexpr int32 Radius = 8;
    for (int32 Q = OriginQ - Radius; Q <= OriginQ + Radius; ++Q)
    {
        for (int32 R = OriginR - Radius; R <= OriginR + Radius; ++R)
        {
            if (UKSRulesLibrary::HexDistance(OriginQ, OriginR, Q, R) > Radius)
            {
                continue;
            }
            FKSHexTileData Data;
            Data.Q = Q;
            Data.R = R;
            Data.Id = FString::Printf(TEXT("%d,%d"), Q, R);
            Data.Biome = UKSRulesLibrary::BiomeAt(Q, R);
            Data.Owner = EKSTribeId::Neutral;
            Data.Slot = EKSBuildingSlot::None;
            Data.Level = 0;
            Data.Garrison = 2 + UKSRulesLibrary::HexDistance(0, 0, Q, R) / 4;
            for (const FHall& Hall : GHalls)
            {
                if (UKSRulesLibrary::HexDistance(Q, R, Hall.Q, Hall.R) <= 1)
                {
                    Data.Owner = Hall.Tribe;
                    Data.Garrison = Hall.bCapital ? 8 : 5;
                    if (Hall.Q == Q && Hall.R == R)
                    {
                        Data.Slot = EKSBuildingSlot::Hall;
                        Data.Level = 1;
                        Data.Label = FString::Printf(TEXT("%s %s"), TribeName(Hall.Tribe), Hall.bCapital ? TEXT("merkezi") : TEXT("karakolu"));
                    }
                }
            }
            if (Data.Label.IsEmpty())
            {
                const TCHAR* Land = Data.Biome == EKSBiome::Desert ? TEXT("Çöl") : (Data.Biome == EKSBiome::Ice ? TEXT("Buz") : TEXT("Orman"));
                Data.Label = FString::Printf(TEXT("%s geçidi"), Land);
            }
            const FVector World = UKSRulesLibrary::AxialToWorld(Q, R, 230.f);
            FActorSpawnParameters Params;
            Params.SpawnCollisionHandlingOverride = ESpawnActorCollisionHandlingMethod::AlwaysSpawn;
            AKSHexTileActor* Tile = GetWorld()->SpawnActor<AKSHexTileActor>(World, FRotator::ZeroRotator, Params);
            if (Tile)
            {
                Tile->SetupTile(Data, PlayerTribe, TileMaterial);
                Tiles.Add(Tile);
            }
        }
    }
}

void AKSMatchDirector::FocusCamera()
{
    for (const FHall& Hall : GHalls)
    {
        if (Hall.Tribe == PlayerTribe && Hall.bCapital)
        {
            if (APawn* Pawn = UGameplayStatics::GetPlayerPawn(this, 0))
            {
                if (AKSCameraPawn* Camera = Cast<AKSCameraPawn>(Pawn))
                {
                    Camera->FocusOn(UKSRulesLibrary::AxialToWorld(Hall.Q, Hall.R, 230.f) + FVector(0.f, 0.f, 80.f));
                }
            }
            break;
        }
    }
}

void AKSMatchDirector::SelectTile(AKSHexTileActor* Tile)
{
    if (Screen != EKSScreen::Play || !Tile)
    {
        return;
    }
    if (Selected)
    {
        Selected->SetSelected(false);
        Selected->RefreshLook(PlayerTribe);
    }
    Selected = Tile;
    Selected->SetSelected(true);
    Selected->RefreshLook(PlayerTribe);
    Toast = FString::Printf(TEXT("%s · garnizon %d"), *Tile->GetData().Label, Tile->GetData().Garrison);
}

void AKSMatchDirector::BuildOnSelected(EKSBuildingSlot Slot, int32 GoldCost)
{
    if (!Selected || Selected->GetData().Owner != PlayerTribe)
    {
        Toast = TEXT("Önce kendi toprağından bir altıgen seç.");
        return;
    }
    if (Selected->GetData().Slot != EKSBuildingSlot::None && Selected->GetData().Slot != Slot)
    {
        Toast = TEXT("Bu toprakta başka bir yapı var.");
        return;
    }
    const int32 Next = Selected->GetData().Level + 1;
    if (!UKSRulesLibrary::CanUpgradeTo(Next, Level))
    {
        Toast = TEXT("Bina seviyesi senin seviyeni geçemez.");
        return;
    }
    const int32 Cost = UKSRulesLibrary::BuildingGoldCost(GoldCost, Next);
    if (Gold < Cost)
    {
        Toast = FString::Printf(TEXT("Altın yetmiyor. Gerekli: %d"), Cost);
        return;
    }
    Gold -= Cost;
    Selected->GetDataMutable().Slot = Slot;
    Selected->GetDataMutable().Level = Next;
    Selected->RefreshLook(PlayerTribe);
    Toast = FString::Printf(TEXT("Yapı %d. seviyeye çıktı."), Next);
}

void AKSMatchDirector::TrainArmy()
{
    if (Gold < 25)
    {
        Toast = TEXT("Birlik için 25 altın gerekir.");
        return;
    }
    Gold -= 25;
    Army += 1;
    Toast = FString::Printf(TEXT("Yeni birlik yemin etti. Ordu: %d"), Army);
}

void AKSMatchDirector::AttackSelected()
{
    if (!Selected || Selected->GetData().Owner == PlayerTribe)
    {
        Toast = TEXT("Rakip veya boş bir altıgen seç.");
        return;
    }
    if (!OwnsNeighbor(Selected))
    {
        Toast = TEXT("Yalnızca kendi toprağına komşu yere yürüyebilirsin.");
        return;
    }
    if (Army < 1)
    {
        Toast = TEXT("Yürüyecek birliğin kalmadı.");
        return;
    }
    const FKSBattleOutcome Battle = UKSRulesLibrary::ResolveBattle(
        PlayerTribe,
        Army,
        FMath::Max(1, Level / 2),
        Level,
        Selected->GetData().Owner == EKSTribeId::Neutral ? EKSTribeId::Demirhisar : Selected->GetData().Owner,
        FMath::Max(1, Selected->GetData().Garrison),
        Selected->GetData().Biome,
        EKSBattleStance::Assault,
        Selected->GetData().Slot == EKSBuildingSlot::Tower,
        Selected->GetData().Slot == EKSBuildingSlot::Hall,
        1);
    if (Battle.bPlayerWon)
    {
        Selected->GetDataMutable().Owner = PlayerTribe;
        Selected->GetDataMutable().Garrison = FMath::Max(1, Battle.PlayerRemaining / 4);
        if (Selected->GetData().Slot == EKSBuildingSlot::Hall)
        {
            Selected->GetDataMutable().Slot = EKSBuildingSlot::Hall;
        }
        Gold += Battle.GoldLoot;
        Army = FMath::Max(1, Battle.PlayerRemaining);
        GrantXp(Battle.XpReward);
        Selected->RefreshLook(PlayerTribe);
        Toast = FString::Printf(TEXT("Zafer. +%d altın, +%d deneyim."), Battle.GoldLoot, Battle.XpReward);
    }
    else
    {
        Army = FMath::Max(0, Battle.PlayerRemaining);
        GrantXp(12);
        Toast = TEXT("Saflar dağıldı. Miras bu gece yaralı.");
    }
}

bool AKSMatchDirector::OwnsNeighbor(const AKSHexTileActor* Tile) const
{
    if (!Tile)
    {
        return false;
    }
    const int32 Q = Tile->GetData().Q;
    const int32 R = Tile->GetData().R;
    const int32 Dq[] = { 1, 1, 0, -1, -1, 0 };
    const int32 Dr[] = { 0, -1, -1, 0, 1, 1 };
    for (int32 i = 0; i < 6; ++i)
    {
        if (const AKSHexTileActor* Next = FindTile(Q + Dq[i], R + Dr[i]))
        {
            if (Next->GetData().Owner == PlayerTribe)
            {
                return true;
            }
        }
    }
    return false;
}

AKSHexTileActor* AKSMatchDirector::FindTile(int32 Q, int32 R) const
{
    for (AKSHexTileActor* Tile : Tiles)
    {
        if (Tile && Tile->GetData().Q == Q && Tile->GetData().R == R)
        {
            return Tile;
        }
    }
    return nullptr;
}

void AKSMatchDirector::GrantXp(int32 Amount)
{
    Xp += Amount;
    while (Level < 100 && Xp >= UKSRulesLibrary::XpToNextLevel(Level))
    {
        Xp -= UKSRulesLibrary::XpToNextLevel(Level);
        Level += 1;
        Toast = FString::Printf(TEXT("Seviye %d · %s"), Level, *ScrollTitle(Level));
    }
}

FString AKSMatchDirector::ScrollTitle(int32 ScrollLevel) const
{
    FString Json;
    const FString Path = FPaths::ProjectContentDir() / TEXT("DataTables/DT_Scrolls.json");
    if (FFileHelper::LoadFileToString(Json, *Path))
    {
        TSharedPtr<FJsonValue> Root;
        const TSharedRef<TJsonReader<>> Reader = TJsonReaderFactory<>::Create(Json);
        if (FJsonSerializer::Deserialize(Reader, Root) && Root.IsValid() && Root->Type == EJson::Array)
        {
            for (const TSharedPtr<FJsonValue>& Item : Root->AsArray())
            {
                const TSharedPtr<FJsonObject> Obj = Item->AsObject();
                if (Obj.IsValid() && Obj->GetIntegerField(TEXT("level")) == ScrollLevel)
                {
                    return Obj->GetStringField(TEXT("title"));
                }
            }
        }
    }
    if (ScrollLevel == 40) return TEXT("Gölge Tapınağı");
    if (ScrollLevel == 100) return TEXT("Gölge Elçisi");
    return FString::Printf(TEXT("Parşömen %d"), ScrollLevel);
}

FText AKSMatchDirector::GetTitle() const
{
    if (Screen == EKSScreen::Pick) return FText::FromString(TEXT("Hangi sancağı alacaksın?"));
    if (Screen == EKSScreen::Menu) return FText::FromString(TEXT("Kanlı Taht"));
    return FText::FromString(TEXT("Kabile Savaşları: Murat Ağa'nın Mirası"));
}

FText AKSMatchDirector::GetBody() const
{
    if (Screen == EKSScreen::Pick)
    {
        return FText::FromString(TEXT("Sarıklılar ateşi, Gök-Hanlı gölgeyi, Demir-Hisar zırhı tutar. Birini seç. Diğer ikisi karakollarından ara sıra sana yürür."));
    }
    if (Screen == EKSScreen::Menu)
    {
        return FText::FromString(TEXT("Mor kabzalı hançer tahta saplı. Üç kabile birbirini suçluyor. WASD ile gez, tekerlek ile yaklaş, altıgene tıkla."));
    }
    return FText::FromString(TEXT("Yüzyıllardır süren Büyük Barış, Murat Ağa'nın gece yarısı öldürülmesiyle bozuldu. Sen vârisin kalemini taşıyorsun."));
}

FText AKSMatchDirector::GetStatus() const
{
    const FString SelectedName = Selected ? Selected->GetData().Label : TEXT("seçilmedi");
    return FText::FromString(FString::Printf(
        TEXT("%s  ·  Seviye %d  ·  XP %d/%d  ·  Altın %d  ·  Ordu %d  ·  %s"),
        TribeName(PlayerTribe),
        Level,
        Xp,
        UKSRulesLibrary::XpToNextLevel(Level),
        Gold,
        Army,
        *SelectedName));
}

FText AKSMatchDirector::GetToast() const
{
    return FText::FromString(Toast);
}
