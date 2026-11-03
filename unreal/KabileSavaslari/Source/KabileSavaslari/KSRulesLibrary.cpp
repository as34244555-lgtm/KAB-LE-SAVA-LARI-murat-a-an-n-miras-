#include "KSRulesLibrary.h"
#include "Math/UnrealMathUtility.h"

int32 UKSRulesLibrary::XpToNextLevel(int32 CurrentLevel)
{
    if (CurrentLevel >= 100)
    {
        return 999999;
    }
    const int32 Clamped = FMath::Clamp(CurrentLevel, 1, 100);
    return FMath::RoundToInt(24.0f + Clamped * 15.0f + FMath::Pow(static_cast<float>(Clamped), 1.08f) * 2.0f);
}

int32 UKSRulesLibrary::CapEntityLevel(int32 EntityLevel, int32 PlayerLevel)
{
    return FMath::Min(EntityLevel, FMath::Clamp(PlayerLevel, 1, 100));
}

bool UKSRulesLibrary::CanUpgradeTo(int32 NextEntityLevel, int32 PlayerLevel)
{
    return NextEntityLevel <= PlayerLevel && NextEntityLevel <= 100;
}

EKSAtmosphere UKSRulesLibrary::AtmosphereForLevel(int32 PlayerLevel)
{
    if (PlayerLevel >= 89)
    {
        return EKSAtmosphere::Reckoning;
    }
    if (PlayerLevel >= 40)
    {
        return EKSAtmosphere::Shadow;
    }
    if (PlayerLevel >= 2)
    {
        return EKSAtmosphere::Suspicion;
    }
    return EKSAtmosphere::Peace;
}

int32 UKSRulesLibrary::BuildingGoldCost(int32 BaseGoldCost, int32 NextLevel)
{
    return FMath::RoundToInt(BaseGoldCost * FMath::Pow(1.28f, FMath::Max(0, NextLevel - 1)));
}

int32 UKSRulesLibrary::BuildingDiamondCost(int32 BaseDiamondCost, int32 NextLevel)
{
    return BaseDiamondCost + FMath::Max(0, NextLevel - 1);
}

float UKSRulesLibrary::RpsMultiplier(EKSTribeId Attacker, EKSTribeId Defender)
{
    constexpr float Mult = 1.35f;
    if (Attacker == EKSTribeId::Sariklilar && Defender == EKSTribeId::Demirhisar) return Mult;
    if (Attacker == EKSTribeId::Demirhisar && Defender == EKSTribeId::Gokhanli) return Mult;
    if (Attacker == EKSTribeId::Gokhanli && Defender == EKSTribeId::Sariklilar) return Mult;

    if (Defender == EKSTribeId::Sariklilar && Attacker == EKSTribeId::Demirhisar) return 1.0f / Mult;
    if (Defender == EKSTribeId::Demirhisar && Attacker == EKSTribeId::Gokhanli) return 1.0f / Mult;
    if (Defender == EKSTribeId::Gokhanli && Attacker == EKSTribeId::Sariklilar) return 1.0f / Mult;

    return 1.0f;
}

float UKSRulesLibrary::BiomeAffinity(EKSTribeId Tribe, EKSBiome Biome)
{
    if (Tribe == EKSTribeId::Sariklilar)
    {
        return Biome == EKSBiome::Desert ? 1.22f : (Biome == EKSBiome::Ice ? 0.82f : 1.0f);
    }
    if (Tribe == EKSTribeId::Gokhanli)
    {
        return Biome == EKSBiome::Forest ? 1.22f : (Biome == EKSBiome::Desert ? 0.88f : 1.0f);
    }
    if (Tribe == EKSTribeId::Demirhisar)
    {
        return Biome == EKSBiome::Ice ? 1.22f : (Biome == EKSBiome::Forest ? 0.88f : 1.0f);
    }
    return 1.0f;
}

FVector UKSRulesLibrary::AxialToWorld(int32 Q, int32 R, float HexSizeCm)
{
    const float X = HexSizeCm * 1.7320508f * (static_cast<float>(Q) + static_cast<float>(R) * 0.5f);
    const float Y = HexSizeCm * 1.5f * static_cast<float>(R);
    return FVector(X, Y, 0.0f);
}

int32 UKSRulesLibrary::HexDistance(int32 AQ, int32 AR, int32 BQ, int32 BR)
{
    const int32 DQ = FMath::Abs(AQ - BQ);
    const int32 DR = FMath::Abs(AR - BR);
    const int32 DS = FMath::Abs((AQ + AR) - (BQ + BR));
    return FMath::Max3(DQ, DR, DS);
}

float UKSRulesLibrary::Hash01(int32 Q, int32 R, int32 Salt)
{
    uint32 N = static_cast<uint32>((Q + Salt * 17) * 374761393 + (R - Salt * 9) * 668265263);
    N = (N ^ (N >> 13)) * 1274126177u;
    N = N ^ (N >> 16);
    return static_cast<float>(N) / 4294967296.0f;
}

static float ValueNoise(int32 Q, int32 R, float Scale, int32 Salt)
{
    const float FQ = static_cast<float>(Q) / Scale;
    const float FR = static_cast<float>(R) / Scale;
    const int32 Q0 = FMath::FloorToInt(FQ);
    const int32 R0 = FMath::FloorToInt(FR);
    const float TX = FQ - Q0;
    const float TY = FR - R0;
    const float A = UKSRulesLibrary::Hash01(Q0, R0, Salt);
    const float B = UKSRulesLibrary::Hash01(Q0 + 1, R0, Salt);
    const float C = UKSRulesLibrary::Hash01(Q0, R0 + 1, Salt);
    const float D = UKSRulesLibrary::Hash01(Q0 + 1, R0 + 1, Salt);
    const float U = TX * TX * (3.0f - 2.0f * TX);
    const float V = TY * TY * (3.0f - 2.0f * TY);
    return A * (1.0f - U) * (1.0f - V) + B * U * (1.0f - V) + C * (1.0f - U) * V + D * U * V;
}

EKSBiome UKSRulesLibrary::BiomeAt(int32 Q, int32 R)
{
    const float Temp = ValueNoise(Q, R, 4.2f, 1) * 0.62f + ValueNoise(Q, R, 1.7f, 4) * 0.38f;
    const float Moist = ValueNoise(Q + 40, R - 12, 5.1f, 2);
    EKSBiome Biome = EKSBiome::Forest;
    if (Temp < 0.36f || (Temp < 0.45f && Moist < 0.32f))
    {
        Biome = EKSBiome::Ice;
    }
    else if (Temp > 0.64f || (Temp > 0.55f && Moist < 0.38f))
    {
        Biome = EKSBiome::Desert;
    }

    const float Anomaly = Hash01(Q, R, 11);
    if (Anomaly < 0.07f) Biome = EKSBiome::Desert;
    else if (Anomaly < 0.14f) Biome = EKSBiome::Ice;
    else if (Anomaly < 0.21f) Biome = EKSBiome::Forest;
    return Biome;
}

FKSBattleOutcome UKSRulesLibrary::ResolveBattle(
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
    int32 FlankingCount)
{
    FKSBattleOutcome Out;
    const int32 CappedUnitLevel = CapEntityLevel(PlayerUnitLevel, PlayerLevel);
    const float PlayerMul = 1.0f + (CappedUnitLevel - 1) * 0.12f;

    float BaseHp = 70.0f, BaseAtk = 24.0f, BaseDef = 10.0f, Crit = 0.1f, Aoe = 0.0f;
    if (PlayerTribe == EKSTribeId::Sariklilar) { BaseHp = 70.f; BaseAtk = 28.f; BaseDef = 8.f; Crit = 0.08f; Aoe = 0.45f; }
    else if (PlayerTribe == EKSTribeId::Gokhanli) { BaseHp = 55.f; BaseAtk = 22.f; BaseDef = 6.f; Crit = 0.28f; Aoe = 0.0f; }
    else if (PlayerTribe == EKSTribeId::Demirhisar) { BaseHp = 110.f; BaseAtk = 16.f; BaseDef = 22.f; Crit = 0.04f; Aoe = 0.0f; }

    const int32 StartPlayerCount = FMath::Max(1, PlayerArmyCount);
    const int32 StartEnemyCount = FMath::Max(1, EnemyGarrison);

    float PlayerMaxHp = FMath::RoundToFloat(BaseHp * PlayerMul * StartPlayerCount);
    float PlayerHp = PlayerMaxHp;
    float PlayerAtk = BaseAtk * PlayerMul;
    float PlayerDef = BaseDef * PlayerMul;

    const float EnemyPower = 1.0f + FMath::Pow(static_cast<float>(PlayerLevel) / 12.0f, 1.15f) * 0.22f;
    float EnemyMaxHp = FMath::RoundToFloat(75.0f * EnemyPower * StartEnemyCount * (bHasHall ? 1.12f : 1.0f));
    float EnemyHp = EnemyMaxHp;
    float EnemyAtk = 20.0f * EnemyPower;
    float EnemyDef = 12.0f * EnemyPower * BiomeAffinity(EnemyTribe, FieldBiome) * (bHasTower ? 1.2f : 1.0f) * (bHasHall ? 1.08f : 1.0f);

    float StanceAtk = 1.0f, StanceDef = 1.0f, ExtraCrit = 0.0f;
    if (Stance == EKSBattleStance::Assault)
    {
        StanceAtk = PlayerTribe == EKSTribeId::Sariklilar ? 1.26f : 1.16f;
        StanceDef = 0.88f;
    }
    else if (Stance == EKSBattleStance::Ambush)
    {
        StanceAtk = 1.02f;
        StanceDef = 0.9f;
        ExtraCrit = PlayerTribe == EKSTribeId::Gokhanli ? 0.2f : 0.12f;
    }
    else
    {
        StanceAtk = 0.88f;
        StanceDef = PlayerTribe == EKSTribeId::Demirhisar ? 1.3f : 1.18f;
    }

    const float Flank = 1.0f + FMath::Min(4, FlankingCount) * 0.06f;
    const float PlayerBiomeMul = BiomeAffinity(PlayerTribe, FieldBiome);
    const float PlayerRps = RpsMultiplier(PlayerTribe, EnemyTribe);
    const float EnemyRps = RpsMultiplier(EnemyTribe, PlayerTribe);

    int32 CurPlayerCount = StartPlayerCount;
    int32 CurEnemyCount = StartEnemyCount;

    for (int32 Round = 1; Round <= 14 && PlayerHp > 0.f && EnemyHp > 0.f; ++Round)
    {
        const float PagerCrit = (FMath::FRand() < (Crit + ExtraCrit)) ? 1.6f : 1.0f;
        const float RawPlayer = PlayerAtk * PlayerRps * PagerCrit * (1.0f + Aoe) * StanceAtk * PlayerBiomeMul * Flank * FMath::Max(1.0f, CurPlayerCount * 0.35f);
        const float DealtToEnemy = FMath::Max(4.0f, RawPlayer - EnemyDef * 0.55f);
        EnemyHp = FMath::Max(0.0f, EnemyHp - FMath::RoundToFloat(DealtToEnemy));
        CurEnemyCount = EnemyHp <= 0.f ? 0 : FMath::Max(1, FMath::RoundToInt(StartEnemyCount * (EnemyHp / EnemyMaxHp)));
        Out.Log.Add(FString::Printf(TEXT("Tur %d: Birliklerin %d hasar vurdu."), Round, FMath::RoundToInt(DealtToEnemy)));

        if (EnemyHp <= 0.f) break;

        const float RawEnemy = EnemyAtk * EnemyRps * FMath::Max(1.0f, CurEnemyCount * 0.35f);
        const float DealtToPlayer = FMath::Max(4.0f, RawEnemy - (PlayerDef * StanceDef) * 0.55f);
        PlayerHp = FMath::Max(0.0f, PlayerHp - FMath::RoundToFloat(DealtToPlayer));
        CurPlayerCount = PlayerHp <= 0.f ? 0 : FMath::Max(1, FMath::RoundToInt(StartPlayerCount * (PlayerHp / PlayerMaxHp)));
        Out.Log.Add(FString::Printf(TEXT("Tur %d: Rakip %d hasarla karşılık verdi."), Round, FMath::RoundToInt(DealtToPlayer)));
    }

    Out.bPlayerWon = EnemyHp <= 0.f && PlayerHp > 0.f;
    Out.PlayerRemaining = CurPlayerCount;
    Out.EnemyRemaining = CurEnemyCount;
    Out.GoldLoot = Out.bPlayerWon ? (40 + PlayerLevel * 8) : 8;
    Out.XpReward = Out.bPlayerWon ? (38 + PlayerLevel * 8) : 14;
    return Out;
}
