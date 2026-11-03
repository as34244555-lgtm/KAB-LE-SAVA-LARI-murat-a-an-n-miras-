#include "KSHexTileActor.h"

#include "Components/PointLightComponent.h"
#include "ProceduralMeshComponent.h"

namespace
{
void AddPrism(
    TArray<FVector>& Vertices,
    TArray<int32>& Triangles,
    TArray<FVector>& Normals,
    TArray<FVector2D>& UV,
    TArray<FColor>& Colors,
    const FVector& Center,
    float Radius,
    float BottomZ,
    float TopZ,
    const FColor& Color,
    int32 Sides)
{
    const int32 VertexStart = Vertices.Num();
    const int32 TriangleStart = Triangles.Num();
    const int32 Base = Vertices.Num();
    for (int32 i = 0; i < Sides; ++i)
    {
        const float Ang = FMath::DegreesToRadians(60.f * i - 30.f);
        const FVector Offset(FMath::Cos(Ang) * Radius, FMath::Sin(Ang) * Radius, 0.f);
        Vertices.Add(Center + Offset + FVector(0.f, 0.f, TopZ));
        UV.Add(FVector2D(0.5f + 0.5f * FMath::Cos(Ang), 0.5f + 0.5f * FMath::Sin(Ang)));
        Colors.Add(Color);
        Normals.Add(FVector::UpVector);
    }
    const int32 CenterIndex = Vertices.Num();
    Vertices.Add(Center + FVector(0.f, 0.f, TopZ + 6.f));
    UV.Add(FVector2D(0.5f, 0.5f));
    Colors.Add(Color);
    Normals.Add(FVector::UpVector);
    for (int32 i = 0; i < Sides; ++i)
    {
        Triangles.Add(CenterIndex);
        Triangles.Add(Base + i);
        Triangles.Add(Base + (i + 1) % Sides);
    }

    const int32 WallBase = Vertices.Num();
    for (int32 i = 0; i < Sides; ++i)
    {
        const float Ang = FMath::DegreesToRadians(60.f * i - 30.f);
        const FVector Offset(FMath::Cos(Ang) * Radius, FMath::Sin(Ang) * Radius, 0.f);
        const FVector Normal = Offset.GetSafeNormal();
        Vertices.Add(Center + Offset + FVector(0.f, 0.f, TopZ));
        Vertices.Add(Center + Offset + FVector(0.f, 0.f, BottomZ));
        UV.Add(FVector2D(i / float(Sides), 0.f));
        UV.Add(FVector2D(i / float(Sides), 1.f));
        Colors.Add(Color);
        Colors.Add(FColor(Color.R / 2, Color.G / 2, Color.B / 2));
        Normals.Add(Normal);
        Normals.Add(Normal);
    }
    for (int32 i = 0; i < Sides; ++i)
    {
        const int32 A = WallBase + i * 2;
        const int32 B = WallBase + ((i + 1) % Sides) * 2;
        Triangles.Add(A);
        Triangles.Add(B);
        Triangles.Add(A + 1);
        Triangles.Add(A + 1);
        Triangles.Add(B);
        Triangles.Add(B + 1);
    }

    const int32 AddedVerts = Vertices.Num() - VertexStart;
    const int32 AddedTris = Triangles.Num() - TriangleStart;
    Vertices.Reserve(Vertices.Num() + AddedVerts);
    UV.Reserve(UV.Num() + AddedVerts);
    Colors.Reserve(Colors.Num() + AddedVerts);
    Normals.Reserve(Normals.Num() + AddedVerts);
    Triangles.Reserve(Triangles.Num() + AddedTris);
    for (int32 i = 0; i < AddedVerts; ++i)
    {
        Vertices.Add(Vertices[VertexStart + i]);
        UV.Add(UV[VertexStart + i]);
        Colors.Add(Colors[VertexStart + i]);
        Normals.Add(-Normals[VertexStart + i]);
    }
    for (int32 i = 0; i < AddedTris; i += 3)
    {
        Triangles.Add(Triangles[TriangleStart + i] + AddedVerts);
        Triangles.Add(Triangles[TriangleStart + i + 2] + AddedVerts);
        Triangles.Add(Triangles[TriangleStart + i + 1] + AddedVerts);
    }
}
}

AKSHexTileActor::AKSHexTileActor()
{
    PrimaryActorTick.bCanEverTick = false;
    Ground = CreateDefaultSubobject<UProceduralMeshComponent>(TEXT("Ground"));
    SetRootComponent(Ground);
    Ground->SetCastShadow(true);
    Ground->bUseComplexAsSimpleCollision = true;
    Structure = CreateDefaultSubobject<UProceduralMeshComponent>(TEXT("Structure"));
    Structure->SetupAttachment(Ground);
    Structure->SetCastShadow(true);
    Structure->SetCollisionEnabled(ECollisionEnabled::NoCollision);
    HearthLight = CreateDefaultSubobject<UPointLightComponent>(TEXT("Hearth"));
    HearthLight->SetupAttachment(Ground);
    HearthLight->SetRelativeLocation(FVector(0.f, 0.f, 180.f));
    HearthLight->SetIntensity(0.f);
    HearthLight->SetAttenuationRadius(700.f);
    HearthLight->SetCastShadows(true);
}

void AKSHexTileActor::SetupTile(const FKSHexTileData& InData, EKSTribeId PlayerTribe, UMaterialInterface* MasterMaterial)
{
    Data = InData;
    if (MasterMaterial)
    {
        GroundMid = UMaterialInstanceDynamic::Create(MasterMaterial, this);
        StructureMid = UMaterialInstanceDynamic::Create(MasterMaterial, this);
        Ground->SetMaterial(0, GroundMid);
        Structure->SetMaterial(0, StructureMid);
    }
    RefreshLook(PlayerTribe);
}

void AKSHexTileActor::SetSelected(bool bInSelected)
{
    bSelected = bInSelected;
}

void AKSHexTileActor::RefreshLook(EKSTribeId PlayerTribe)
{
    FLinearColor Tint(0.28f, 0.36f, 0.22f);
    float Height = 28.f;
    if (Data.Biome == EKSBiome::Desert)
    {
        Tint = FLinearColor(0.72f, 0.48f, 0.24f);
        Height = 18.f + FMath::Fmod(FMath::Abs(Data.Q * 13 + Data.R * 7), 16.f);
    }
    else if (Data.Biome == EKSBiome::Ice)
    {
        Tint = FLinearColor(0.62f, 0.74f, 0.86f);
        Height = 36.f + FMath::Fmod(FMath::Abs(Data.Q * 5 + Data.R), 22.f);
    }
    else
    {
        Tint = FLinearColor(0.16f, 0.34f, 0.18f);
        Height = 24.f + FMath::Fmod(FMath::Abs(Data.R * 9), 14.f);
    }
    if (Data.Owner == PlayerTribe && PlayerTribe != EKSTribeId::Neutral)
    {
        Tint = FMath::Lerp(Tint, FLinearColor(0.85f, 0.68f, 0.28f), 0.35f);
    }
    else if (Data.Owner == EKSTribeId::Sariklilar)
    {
        Tint = FMath::Lerp(Tint, FLinearColor(0.72f, 0.16f, 0.12f), 0.45f);
    }
    else if (Data.Owner == EKSTribeId::Gokhanli)
    {
        Tint = FMath::Lerp(Tint, FLinearColor(0.28f, 0.12f, 0.48f), 0.45f);
    }
    else if (Data.Owner == EKSTribeId::Demirhisar)
    {
        Tint = FMath::Lerp(Tint, FLinearColor(0.45f, 0.48f, 0.52f), 0.4f);
    }
    if (bSelected)
    {
        Tint = FMath::Lerp(Tint, FLinearColor(1.f, 0.86f, 0.35f), 0.55f);
    }

    const FColor Vertex = Tint.ToFColor(true);
    BuildGround(Tint, Height);
    BuildStructure(Tint);
    if (GroundMid)
    {
        GroundMid->SetVectorParameterValue(TEXT("BaseColor"), Tint);
        GroundMid->SetScalarParameterValue(TEXT("Roughness"), Data.Biome == EKSBiome::Ice ? 0.28f : 0.72f);
    }
    if (StructureMid)
    {
        StructureMid->SetVectorParameterValue(TEXT("BaseColor"), Tint * 0.75f + FLinearColor(0.08f, 0.05f, 0.02f));
        StructureMid->SetScalarParameterValue(TEXT("Roughness"), 0.48f);
    }
    const bool bHearth = Data.Slot == EKSBuildingSlot::Hall || Data.Slot == EKSBuildingSlot::Forge;
    HearthLight->SetIntensity(bHearth ? 8000.f : 0.f);
    HearthLight->SetLightColor(Data.Owner == EKSTribeId::Gokhanli ? FLinearColor(0.55f, 0.35f, 1.f) : FLinearColor(1.f, 0.62f, 0.28f));
}

void AKSHexTileActor::BuildGround(const FLinearColor& Color, float Height)
{
    TArray<FVector> Vertices;
    TArray<int32> Triangles;
    TArray<FVector> Normals;
    TArray<FVector2D> UV;
    TArray<FColor> Colors;
    AddPrism(Vertices, Triangles, Normals, UV, Colors, FVector::ZeroVector, HexRadius * 0.96f, 0.f, Height, Color.ToFColor(true), 6);
    TArray<FProcMeshTangent> Tangents;
    Ground->CreateMeshSection(0, Vertices, Triangles, Normals, UV, Colors, Tangents, true);
    Ground->SetCollisionEnabled(ECollisionEnabled::QueryAndPhysics);
    Ground->SetCollisionObjectType(ECC_WorldStatic);
    Ground->SetCollisionResponseToAllChannels(ECR_Block);
}

void AKSHexTileActor::BuildStructure(const FLinearColor& Color)
{
    Structure->ClearAllMeshSections();
    if (Data.Slot == EKSBuildingSlot::None || Data.Level <= 0)
    {
        return;
    }
    float Height = 70.f + Data.Level * 18.f;
    float Radius = 46.f;
    if (Data.Slot == EKSBuildingSlot::Hall)
    {
        Height = 160.f + Data.Level * 22.f;
        Radius = 78.f;
    }
    else if (Data.Slot == EKSBuildingSlot::Tower)
    {
        Height = 210.f + Data.Level * 28.f;
        Radius = 36.f;
    }
    else if (Data.Slot == EKSBuildingSlot::Camp)
    {
        Height = 55.f;
        Radius = 70.f;
    }
    TArray<FVector> Vertices;
    TArray<int32> Triangles;
    TArray<FVector> Normals;
    TArray<FVector2D> UV;
    TArray<FColor> Colors;
    const FColor Vertex = (Color * 0.65f).ToFColor(true);
    AddPrism(Vertices, Triangles, Normals, UV, Colors, FVector(0.f, 0.f, 40.f), Radius, 0.f, Height, Vertex, Data.Slot == EKSBuildingSlot::Tower ? 6 : 4);
    if (Data.Slot == EKSBuildingSlot::Hall)
    {
        AddPrism(Vertices, Triangles, Normals, UV, Colors, FVector(0.f, 0.f, 40.f + Height), Radius * 1.15f, 0.f, 28.f, FColor(90, 42, 28), 4);
    }
    TArray<FProcMeshTangent> Tangents;
    Structure->CreateMeshSection(0, Vertices, Triangles, Normals, UV, Colors, Tangents, false);
}
