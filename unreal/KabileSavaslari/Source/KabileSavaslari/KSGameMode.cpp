#include "KSGameMode.h"
#include "KSCameraPawn.h"
#include "KSMatchDirector.h"
#include "KSPlayerController.h"

AKSGameMode::AKSGameMode()
{
    PrimaryActorTick.bCanEverTick = false;
    DefaultPawnClass = AKSCameraPawn::StaticClass();
    PlayerControllerClass = AKSPlayerController::StaticClass();
}

void AKSGameMode::BeginPlay()
{
    Super::BeginPlay();
    FActorSpawnParameters Params;
    Params.SpawnCollisionHandlingOverride = ESpawnActorCollisionHandlingMethod::AlwaysSpawn;
    GetWorld()->SpawnActor<AKSMatchDirector>(FVector(0.f, 0.f, 200.f), FRotator::ZeroRotator, Params);
}
