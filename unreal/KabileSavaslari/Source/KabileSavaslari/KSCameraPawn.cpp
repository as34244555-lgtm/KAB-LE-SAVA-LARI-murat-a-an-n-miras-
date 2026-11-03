#include "KSCameraPawn.h"

#include "KSHexTileActor.h"
#include "KSMatchDirector.h"
#include "Camera/CameraComponent.h"
#include "GameFramework/PlayerController.h"
#include "GameFramework/SpringArmComponent.h"
#include "EngineUtils.h"

AKSCameraPawn::AKSCameraPawn()
{
    PrimaryActorTick.bCanEverTick = true;
    AutoPossessPlayer = EAutoReceiveInput::Disabled;

    RootComponent = CreateDefaultSubobject<USceneComponent>(TEXT("Root"));
    SpringArm = CreateDefaultSubobject<USpringArmComponent>(TEXT("SpringArm"));
    SpringArm->SetupAttachment(RootComponent);
    SpringArm->TargetArmLength = 5200.f;
    SpringArm->SetRelativeRotation(FRotator(-52.f, -40.f, 0.f));
    SpringArm->bDoCollisionTest = false;
    SpringArm->bEnableCameraLag = true;
    SpringArm->CameraLagSpeed = 4.f;

    Camera = CreateDefaultSubobject<UCameraComponent>(TEXT("Camera"));
    Camera->SetupAttachment(SpringArm, USpringArmComponent::SocketName);
    Camera->FieldOfView = 48.f;
    Camera->PostProcessSettings.bOverride_BloomIntensity = true;
    Camera->PostProcessSettings.BloomIntensity = 0.35f;
}

void AKSCameraPawn::FocusOn(const FVector& WorldLocation)
{
    SetActorLocation(WorldLocation);
}

void AKSCameraPawn::Tick(float DeltaSeconds)
{
    Super::Tick(DeltaSeconds);
    APlayerController* PC = Cast<APlayerController>(GetController());
    if (!PC || !Camera)
    {
        return;
    }

    float X = 0.f;
    float Y = 0.f;
    if (PC->IsInputKeyDown(EKeys::W) || PC->IsInputKeyDown(EKeys::Up)) Y += 1.f;
    if (PC->IsInputKeyDown(EKeys::S) || PC->IsInputKeyDown(EKeys::Down)) Y -= 1.f;
    if (PC->IsInputKeyDown(EKeys::D) || PC->IsInputKeyDown(EKeys::Right)) X += 1.f;
    if (PC->IsInputKeyDown(EKeys::A) || PC->IsInputKeyDown(EKeys::Left)) X -= 1.f;
    if (PC->IsInputKeyDown(EKeys::E))
    {
        SpringArm->TargetArmLength = FMath::Clamp(SpringArm->TargetArmLength - 900.f * DeltaSeconds, 1800.f, 14000.f);
    }
    if (PC->IsInputKeyDown(EKeys::Q))
    {
        SpringArm->TargetArmLength = FMath::Clamp(SpringArm->TargetArmLength + 900.f * DeltaSeconds, 1800.f, 14000.f);
    }

    const FVector Forward = Camera->GetForwardVector().GetSafeNormal2D();
    const FVector Right = Camera->GetRightVector().GetSafeNormal2D();
    AddActorWorldOffset((Forward * Y + Right * X) * MoveSpeed * DeltaSeconds, false);
}

void AKSCameraPawn::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
    Super::SetupPlayerInputComponent(PlayerInputComponent);
    PlayerInputComponent->BindKey(EKeys::LeftMouseButton, IE_Pressed, this, &AKSCameraPawn::OnClick);
    PlayerInputComponent->BindKey(EKeys::MouseScrollUp, IE_Pressed, this, &AKSCameraPawn::ZoomIn);
    PlayerInputComponent->BindKey(EKeys::MouseScrollDown, IE_Pressed, this, &AKSCameraPawn::ZoomOut);
}

void AKSCameraPawn::ZoomIn()
{
    if (SpringArm)
    {
        SpringArm->TargetArmLength = FMath::Clamp(SpringArm->TargetArmLength - 500.f, 1800.f, 14000.f);
    }
}

void AKSCameraPawn::ZoomOut()
{
    if (SpringArm)
    {
        SpringArm->TargetArmLength = FMath::Clamp(SpringArm->TargetArmLength + 500.f, 1800.f, 14000.f);
    }
}

void AKSCameraPawn::OnClick()
{
    APlayerController* PC = Cast<APlayerController>(GetController());
    if (!PC)
    {
        return;
    }
    FHitResult Hit;
    if (!PC->GetHitResultUnderCursor(ECC_Visibility, false, Hit))
    {
        return;
    }
    AKSHexTileActor* Tile = Cast<AKSHexTileActor>(Hit.GetActor());
    if (!Tile)
    {
        return;
    }
    for (TActorIterator<AKSMatchDirector> It(GetWorld()); It; ++It)
    {
        It->SelectTile(Tile);
        break;
    }
}
