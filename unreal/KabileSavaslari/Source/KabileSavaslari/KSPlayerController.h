#pragma once

#include "CoreMinimal.h"
#include "GameFramework/PlayerController.h"
#include "KSPlayerController.generated.h"

UCLASS()
class KABILESAVASLARI_API AKSPlayerController : public APlayerController
{
    GENERATED_BODY()

public:
    AKSPlayerController();

protected:
    virtual void BeginPlay() override;
};
