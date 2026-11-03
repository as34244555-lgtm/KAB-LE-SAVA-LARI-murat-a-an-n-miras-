#include "KSHexGridActor.h"
#include "KSRulesLibrary.h"

AKSHexGridActor::AKSHexGridActor()
{
    PrimaryActorTick.bCanEverTick = false;
    RootComponent = CreateDefaultSubobject<USceneComponent>(TEXT("Root"));
}

void AKSHexGridActor::BeginPlay()
{
    Super::BeginPlay();
    if (Tiles.Num() == 0)
    {
        GenerateInitialGrid();
    }
}

void AKSHexGridActor::GenerateInitialGrid()
{
    Tiles.Empty();
    for (int32 Q = -ExploreRadius; Q <= ExploreRadius; ++Q)
    {
        for (int32 R = -ExploreRadius; R <= ExploreRadius; ++R)
        {
            if (UKSRulesLibrary::HexDistance(0, 0, Q, R) > ExploreRadius)
            {
                continue;
            }
            FKSHexTileData Tile;
            Tile.Id = FString::Printf(TEXT("%d,%d"), Q, R);
            Tile.Q = Q;
            Tile.R = R;
            Tile.Biome = UKSRulesLibrary::BiomeAt(Q, R);
            Tile.Owner = EKSTribeId::Neutral;
            Tile.Level = 0;
            Tile.Garrison = 2 + UKSRulesLibrary::HexDistance(0, 0, Q, R) / 4;
            Tile.Label = Tile.Biome == EKSBiome::Desert ? TEXT("Çöl geçidi")
                : (Tile.Biome == EKSBiome::Ice ? TEXT("Buz geçidi") : TEXT("Orman geçidi"));
            Tiles.Add(Tile);
        }
    }
}
