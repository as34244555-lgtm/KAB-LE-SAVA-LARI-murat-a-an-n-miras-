#pragma once

#include "CoreMinimal.h"
#include "Blueprint/UserWidget.h"
#include "KSRootWidget.generated.h"

class AKSMatchDirector;
class UTextBlock;
class UButton;
class UVerticalBox;
class UBorder;

UCLASS()
class KABILESAVASLARI_API UKSRootWidget : public UUserWidget
{
    GENERATED_BODY()

public:
    UKSRootWidget(const FObjectInitializer& ObjectInitializer);

    void SetDirector(AKSMatchDirector* InDirector);

protected:
    virtual void NativeConstruct() override;
    virtual void NativeTick(const FGeometry& MyGeometry, float InDeltaTime) override;

private:
    UFUNCTION()
    void OnApproach();
    UFUNCTION()
    void OnNewGame();
    UFUNCTION()
    void OnSariklilar();
    UFUNCTION()
    void OnGokhanli();
    UFUNCTION()
    void OnDemirhisar();
    UFUNCTION()
    void OnBuildCamp();
    UFUNCTION()
    void OnBuildTower();
    UFUNCTION()
    void OnBuildField();
    UFUNCTION()
    void OnTrain();
    UFUNCTION()
    void OnAttack();

    UTextBlock* MakeLabel(const FString& Text, int32 Size, const FLinearColor& Color);
    UButton* MakeButton(const FString& Label, const FName& Handler);

    UPROPERTY()
    TObjectPtr<AKSMatchDirector> Director;

    UPROPERTY()
    TObjectPtr<UTextBlock> TitleText;

    UPROPERTY()
    TObjectPtr<UTextBlock> BodyText;

    UPROPERTY()
    TObjectPtr<UTextBlock> StatusText;

    UPROPERTY()
    TObjectPtr<UTextBlock> ToastText;

    UPROPERTY()
    TObjectPtr<UBorder> StoryCard;

    UPROPERTY()
    TObjectPtr<UBorder> PlayBar;
};
