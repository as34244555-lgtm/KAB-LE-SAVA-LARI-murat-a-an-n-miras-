#pragma once

#include "CoreMinimal.h"
#include "Kismet/BlueprintFunctionLibrary.h"
#include "KSTypes.h"
#include "KSRulesLibrary.generated.h"

/**
 * Kabile Savaşları: Murat Ağa'nın Mirası
 * Blueprint ve C++ tarafından çağrılabilen temel oyun kuralları:
 * - Seviye eğrisi ve "bina/asker seviyesi oyuncu seviyesini geçemez" kuralı
 * - Taş-kâğıt-makas: Sarıklılar > Demir-Hisar > Gök-Hanlı > Sarıklılar
 * - Hex koordinat matematiği ve deterministik iklim gürültüsü
 * - Savaş çözümleyici
 */
UCLASS()
class KABILESAVASLARI_API UKSRulesLibrary : public UBlueprintFunctionLibrary
{
    GENERATED_BODY()

public:
    /** Bir sonraki seviye için gereken XP: 24 + L*15 + L^1.08 * 2 */
    UFUNCTION(BlueprintPure, Category = "KabileSavaslari|Progression")
    static int32 XpToNextLevel(int32 CurrentLevel);

    /** Bina veya asker seviyesini oyuncu seviyesi ile sınırlar (temel kural). */
    UFUNCTION(BlueprintPure, Category = "KabileSavaslari|Progression")
    static int32 CapEntityLevel(int32 EntityLevel, int32 PlayerLevel);

    /** Oyuncu bu seviyeye yükseltebilir mi? */
    UFUNCTION(BlueprintPure, Category = "KabileSavaslari|Progression")
    static bool CanUpgradeTo(int32 NextEntityLevel, int32 PlayerLevel);

    /** Seviyeye göre hikâye atmosferi (1: Barış, 2-39: Şüphe, 40-88: Gölge Tapınağı, 89-100: Hesaplaşma). */
    UFUNCTION(BlueprintPure, Category = "KabileSavaslari|Narrative")
    static EKSAtmosphere AtmosphereForLevel(int32 PlayerLevel);

    /** Bina altın maliyeti: Base * 1.28^(NextLevel - 1) */
    UFUNCTION(BlueprintPure, Category = "KabileSavaslari|Economy")
    static int32 BuildingGoldCost(int32 BaseGoldCost, int32 NextLevel);

    /** Bina elmas maliyeti: Base + max(0, NextLevel - 1) */
    UFUNCTION(BlueprintPure, Category = "KabileSavaslari|Economy")
    static int32 BuildingDiamondCost(int32 BaseDiamondCost, int32 NextLevel);

    /** Taş-kâğıt-makas çarpanı (1.35x üstünlük, 1/1.35x zayıflık). */
    UFUNCTION(BlueprintPure, Category = "KabileSavaslari|Combat")
    static float RpsMultiplier(EKSTribeId Attacker, EKSTribeId Defender);

    /** İklim uyumu: Çöl -> Sarıklılar, Orman -> Gök-Hanlı, Buz -> Demir-Hisar. */
    UFUNCTION(BlueprintPure, Category = "KabileSavaslari|Combat")
    static float BiomeAffinity(EKSTribeId Tribe, EKSBiome Biome);

    /** Hex eksenel (q, r) koordinatını Unreal dünya (X, Y, Z=0) konumuna çevirir (1 Unreal birimi = 1 cm). */
    UFUNCTION(BlueprintPure, Category = "KabileSavaslari|HexMap")
    static FVector AxialToWorld(int32 Q, int32 R, float HexSizeCm = 118.0f);

    /** İki hex arasındaki eksenel mesafe. */
    UFUNCTION(BlueprintPure, Category = "KabileSavaslari|HexMap")
    static int32 HexDistance(int32 AQ, int32 AR, int32 BQ, int32 BR);

    /** Deterministik 0..1 hash (web sürümüyle birebir aynı tohum). */
    UFUNCTION(BlueprintPure, Category = "KabileSavaslari|HexMap")
    static float Hash01(int32 Q, int32 R, int32 Salt = 0);

    /** Deterministik iklim seçimi. */
    UFUNCTION(BlueprintPure, Category = "KabileSavaslari|HexMap")
    static EKSBiome BiomeAt(int32 Q, int32 R);

    /** Hızlı savaş çözümleyici (Blueprint'ten çağrılabilir). */
    UFUNCTION(BlueprintCallable, Category = "KabileSavaslari|Combat")
    static FKSBattleOutcome ResolveBattle(
        EKSTribeId PlayerTribe,
        int32 PlayerArmyCount,
        int32 PlayerUnitLevel,
        int32 PlayerLevel,
        EKSTribeId EnemyTribe,
        int32 EnemyGarrison,
        EKSBiome FieldBiome,
        EKSBattleStance Stance,
        bool bHasTower,
        bool bHasHall,
        int32 FlankingCount
    );
};
