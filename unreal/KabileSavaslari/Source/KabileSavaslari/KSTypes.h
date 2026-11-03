#pragma once

#include "CoreMinimal.h"
#include "Engine/DataTable.h"
#include "KSTypes.generated.h"

UENUM(BlueprintType)
enum class EKSTribeId : uint8
{
    Sariklilar UMETA(DisplayName = "Sarıklılar"),
    Gokhanli UMETA(DisplayName = "Gök-Hanlı"),
    Demirhisar UMETA(DisplayName = "Demir-Hisar"),
    Neutral UMETA(DisplayName = "Tarafsız"),
    Player UMETA(DisplayName = "Vâris")
};

UENUM(BlueprintType)
enum class EKSBiome : uint8
{
    Desert UMETA(DisplayName = "Çöl"),
    Forest UMETA(DisplayName = "Orman"),
    Ice UMETA(DisplayName = "Buz")
};

UENUM(BlueprintType)
enum class EKSBuildingSlot : uint8
{
    None UMETA(DisplayName = "Boş"),
    Hall UMETA(DisplayName = "Divan"),
    Resource UMETA(DisplayName = "Ocak"),
    Camp UMETA(DisplayName = "Kışla"),
    Tower UMETA(DisplayName = "Kule"),
    Market UMETA(DisplayName = "Pazar"),
    Forge UMETA(DisplayName = "Demirhane")
};

UENUM(BlueprintType)
enum class EKSUnitClass : uint8
{
    Bomber UMETA(DisplayName = "Bombacı (Sarıklılar)"),
    Skirmisher UMETA(DisplayName = "Avcı / Kritik (Gök-Hanlı)"),
    Guardian UMETA(DisplayName = "Muhafız / Zırh (Demir-Hisar)")
};

UENUM(BlueprintType)
enum class EKSBattleStance : uint8
{
    Assault UMETA(DisplayName = "Hücum"),
    Ambush UMETA(DisplayName = "Pusu"),
    Hold UMETA(DisplayName = "Kalkan")
};

UENUM(BlueprintType)
enum class EKSAtmosphere : uint8
{
    Peace UMETA(DisplayName = "Barış (Seviye 1)"),
    Suspicion UMETA(DisplayName = "Şüphe (Seviye 2-39)"),
    Shadow UMETA(DisplayName = "Gölge Tapınağı (Seviye 40-88)"),
    Reckoning UMETA(DisplayName = "Hesaplaşma / Elçi (Seviye 89-100)")
};

USTRUCT(BlueprintType)
struct FKSTribeRow : public FTableRowBase
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Id;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Name;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Epithet;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Temperament;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString PrimaryColorHex;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString SecondaryColorHex;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString AccentColorHex;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString UnitClass;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString CombatRole;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString BeatsTribe;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString LosesToTribe;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString AccusesTribe;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Accusation;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Voice;
};

USTRUCT(BlueprintType)
struct FKSUnitRow : public FTableRowBase
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Id;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Tribe;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Name;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString UnitClass;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Lore;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 BaseCost = 40;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 BaseHp = 70;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 BaseAttack = 20;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 BaseDefense = 10;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    float CritChance = 0.08f;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    float Aoe = 0.0f;
};

USTRUCT(BlueprintType)
struct FKSBuildingRow : public FTableRowBase
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Id;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Name;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Lore;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 BaseGoldCost = 40;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 BaseDiamondUpgrade = 1;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 GoldPerTick = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 UnlockLevel = 1;
};

USTRUCT(BlueprintType)
struct FKSScrollRow : public FTableRowBase
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 Level = 1;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Title;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Body;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Misdirection;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Tone;
};

USTRUCT(BlueprintType)
struct FKSQuestRow : public FTableRowBase
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Id;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Title;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Giver;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 UnlockLevel = 1;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString MemoryOfMurat;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Objective;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 GoldReward = 60;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 XpReward = 35;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 DiamondReward = 1;
};

USTRUCT(BlueprintType)
struct FKSSideTribeRow : public FTableRowBase
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Id;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 UnlockLevel = 10;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Name;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Relation;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Memory;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Clue;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    bool bIsShadowCult = false;
};

USTRUCT(BlueprintType)
struct FKSLandmarkRow : public FTableRowBase
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 Q = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 R = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Kind;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString SideId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Title;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 UnlockLevel = 10;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString QuestId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 Garrison = 8;
};

USTRUCT(BlueprintType)
struct FKSHallRow : public FTableRowBase
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Tribe;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 Q = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 R = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    bool bIsCapital = false;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Label;
};

USTRUCT(BlueprintType)
struct FKSHexTileData
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Id;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 Q = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 R = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    EKSBiome Biome = EKSBiome::Forest;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    EKSTribeId Owner = EKSTribeId::Neutral;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    EKSBuildingSlot Slot = EKSBuildingSlot::None;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 Level = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 Garrison = 2;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FString Label;
};

USTRUCT(BlueprintType)
struct FKSBattleOutcome
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    bool bPlayerWon = false;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 GoldLoot = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 XpReward = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 PlayerRemaining = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    int32 EnemyRemaining = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    TArray<FString> Log;
};
