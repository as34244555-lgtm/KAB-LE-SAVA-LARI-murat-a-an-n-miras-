#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Pawn.h"
#include "KSCameraPawn.generated.h"

class USpringArmComponent;
class UCameraComponent;

UCLASS()
class KABILESAVASLARI_API AKSCameraPawn : public APawn
{
    GENERATED_BODY()

public:
    AKSCameraPawn();

    void FocusOn(const FVector& WorldLocation);

    virtual void Tick(float DeltaSeconds) override;
    virtual void SetupPlayerInputComponent(UInputComponent* PlayerInputComponent) override;

private:
    UFUNCTION()
    void OnClick();

    UFUNCTION()
    void ZoomIn();

    UFUNCTION()
    void ZoomOut();

    UPROPERTY(VisibleAnywhere)
    TObjectPtr<USpringArmComponent> SpringArm;

    UPROPERTY(VisibleAnywhere)
    TObjectPtr<UCameraComponent> Camera;

    UPROPERTY(EditAnywhere)
    float MoveSpeed = 2200.f;
};
