#include "KSPlayerController.h"

AKSPlayerController::AKSPlayerController()
{
    bShowMouseCursor = true;
    bEnableClickEvents = true;
    bEnableMouseOverEvents = true;
    DefaultMouseCursor = EMouseCursor::Default;
}

void AKSPlayerController::BeginPlay()
{
    Super::BeginPlay();
    bShowMouseCursor = true;
    bEnableClickEvents = true;
    bEnableMouseOverEvents = true;
    FInputModeGameAndUI InputMode;
    InputMode.SetHideCursorDuringCapture(false);
    InputMode.SetLockMouseToViewportBehavior(EMouseLockMode::DoNotLock);
    SetInputMode(InputMode);
}
