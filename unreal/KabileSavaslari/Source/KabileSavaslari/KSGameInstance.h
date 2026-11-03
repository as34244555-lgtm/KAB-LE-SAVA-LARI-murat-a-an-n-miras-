#pragma once

#include "CoreMinimal.h"
#include "Engine/GameInstance.h"
#include "KSTypes.h"
#include "KSGameInstance.generated.h"

/**
 * Oyuncu ilerlemesini, seçilen tek sancağı (Sarıklılar / Gök-Hanlı / Demir-Hisar),
 * 1..100 parşömen günlüğünü, ordu sayısını (army) ve birim dökümünü (roster) tutar.
 */
UCLASS(BlueprintType, Blueprintable)
class KABILESAVASLARI_API UKSGameInstance : public UGameInstance
{
    GENERATED_BODY()

public:
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "KabileSavaslari|Save")
    FString PlayerName = TEXT("Vâris");

    /** Oyuncu üç kabilenin hepsini yönetmez; tek bir sancak seçer. */
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "KabileSavaslari|Save")
    EKSTribeId ChosenTribe = EKSTribeId::Neutral;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "KabileSavaslari|Save")
    int32 PlayerLevel = 1;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "KabileSavaslari|Save")
    int32 Xp = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "KabileSavaslari|Save")
    int32 Gold = 160;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "KabileSavaslari|Save")
    int32 Diamond = 5;

    /** Toplam asker sayısı (web sürümündeki army). */
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "KabileSavaslari|Save")
    int32 Army = 12;

    /** Birim dökümü (web sürümündeki roster). */
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "KabileSavaslari|Save")
    TMap<FString, int32> Roster;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "KabileSavaslari|Save")
    int32 UnitLevel = 1;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "KabileSavaslari|Save")
    TArray<int32> CollectedScrolls;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "KabileSavaslari|Save")
    bool bShadowTempleRevealed = false;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "KabileSavaslari|Save")
    bool bFinaleRevealed = false;

    UFUNCTION(BlueprintCallable, Category = "KabileSavaslari|Progression")
    void ChooseTribe(EKSTribeId NewTribe);

    UFUNCTION(BlueprintCallable, Category = "KabileSavaslari|Progression")
    bool AddXp(int32 Amount);
};
