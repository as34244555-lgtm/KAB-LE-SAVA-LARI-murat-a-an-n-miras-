#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "KSTypes.h"
#include "KSHexGridActor.generated.h"

/**
 * Sahneye bırakıldığında hex haritayı (başkentler, rakip karakollar, yan kabileler,
 * 40. seviye Gölge Tapınağı ve 100. seviye Elçi Kalesi) otomatik oluşturan aktör.
 */
UCLASS()
class KABILESAVASLARI_API AKSHexGridActor : public AActor
{
    GENERATED_BODY()

public:
    AKSHexGridActor();

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "KabileSavaslari|HexMap")
    int32 ExploreRadius = 10;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "KabileSavaslari|HexMap")
    float HexSizeCm = 118.0f;

    UPROPERTY(BlueprintReadOnly, Category = "KabileSavaslari|HexMap")
    TArray<FKSHexTileData> Tiles;

    UFUNCTION(BlueprintCallable, Category = "KabileSavaslari|HexMap")
    void GenerateInitialGrid();

protected:
    virtual void BeginPlay() override;
};
