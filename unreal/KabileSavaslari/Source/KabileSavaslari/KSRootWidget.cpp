#include "KSRootWidget.h"

#include "KSMatchDirector.h"
#include "Blueprint/WidgetTree.h"
#include "Components/Border.h"
#include "Components/Button.h"
#include "Components/CanvasPanel.h"
#include "Components/CanvasPanelSlot.h"
#include "Components/TextBlock.h"
#include "Components/VerticalBox.h"
#include "Styling/CoreStyle.h"

UKSRootWidget::UKSRootWidget(const FObjectInitializer& ObjectInitializer)
    : Super(ObjectInitializer)
{
    bHasScriptImplementedTick = true;
}

void UKSRootWidget::SetDirector(AKSMatchDirector* InDirector)
{
    Director = InDirector;
}

UTextBlock* UKSRootWidget::MakeLabel(const FString& Text, int32 Size, const FLinearColor& Color)
{
    UTextBlock* Label = WidgetTree->ConstructWidget<UTextBlock>(UTextBlock::StaticClass());
    Label->SetText(FText::FromString(Text));
    Label->SetColorAndOpacity(FSlateColor(Color));
    FSlateFontInfo Font = FCoreStyle::GetDefaultFontStyle("Bold", Size);
    Label->SetFont(Font);
    Label->SetAutoWrapText(true);
    return Label;
}

UButton* UKSRootWidget::MakeButton(const FString& Label, const FName& Handler)
{
    UButton* Button = WidgetTree->ConstructWidget<UButton>(UButton::StaticClass());
    UTextBlock* Caption = MakeLabel(Label, 18, FLinearColor(0.12f, 0.08f, 0.04f));
    Button->AddChild(Caption);
    FScriptDelegate Delegate;
    Delegate.BindUFunction(this, Handler);
    Button->OnClicked.Add(Delegate);
    return Button;
}

void UKSRootWidget::NativeConstruct()
{
    Super::NativeConstruct();
    UCanvasPanel* Canvas = WidgetTree->ConstructWidget<UCanvasPanel>(UCanvasPanel::StaticClass());
    WidgetTree->RootWidget = Canvas;

    StoryCard = WidgetTree->ConstructWidget<UBorder>(UBorder::StaticClass());
    StoryCard->SetBrushColor(FLinearColor(0.08f, 0.05f, 0.04f, 0.88f));
    UVerticalBox* Story = WidgetTree->ConstructWidget<UVerticalBox>(UVerticalBox::StaticClass());
    TitleText = MakeLabel(TEXT("Kabile Savaşları: Murat Ağa'nın Mirası"), 32, FLinearColor(0.93f, 0.76f, 0.32f));
    BodyText = MakeLabel(TEXT(""), 18, FLinearColor(0.93f, 0.9f, 0.84f));
    Story->AddChild(TitleText);
    Story->AddChild(BodyText);
    Story->AddChild(MakeButton(TEXT("Tahta Yaklaş"), TEXT("OnApproach")));
    Story->AddChild(MakeButton(TEXT("Yeni Yemin"), TEXT("OnNewGame")));
    Story->AddChild(MakeButton(TEXT("Sarıklılar — ateş ve barut"), TEXT("OnSariklilar")));
    Story->AddChild(MakeButton(TEXT("Gök-Hanlı — gölge ve rüzgâr"), TEXT("OnGokhanli")));
    Story->AddChild(MakeButton(TEXT("Demir-Hisar — çelik ve yemin"), TEXT("OnDemirhisar")));
    StoryCard->AddChild(Story);
    if (UCanvasPanelSlot* Slot = Canvas->AddChildToCanvas(StoryCard))
    {
        Slot->SetAnchors(FAnchors(0.5f, 0.5f));
        Slot->SetAlignment(FVector2D(0.5f, 0.5f));
        Slot->SetSize(FVector2D(760.f, 520.f));
    }

    PlayBar = WidgetTree->ConstructWidget<UBorder>(UBorder::StaticClass());
    PlayBar->SetBrushColor(FLinearColor(0.07f, 0.05f, 0.04f, 0.82f));
    UVerticalBox* Play = WidgetTree->ConstructWidget<UVerticalBox>(UVerticalBox::StaticClass());
    StatusText = MakeLabel(TEXT(""), 18, FLinearColor(0.95f, 0.9f, 0.75f));
    ToastText = MakeLabel(TEXT(""), 16, FLinearColor(0.98f, 0.84f, 0.45f));
    Play->AddChild(StatusText);
    Play->AddChild(ToastText);
    Play->AddChild(MakeButton(TEXT("Ocak kur"), TEXT("OnBuildField")));
    Play->AddChild(MakeButton(TEXT("Kışla kur"), TEXT("OnBuildCamp")));
    Play->AddChild(MakeButton(TEXT("Kule kur"), TEXT("OnBuildTower")));
    Play->AddChild(MakeButton(TEXT("Birlik eğit"), TEXT("OnTrain")));
    Play->AddChild(MakeButton(TEXT("Yüzleş / Toprağı bağla"), TEXT("OnAttack")));
    PlayBar->AddChild(Play);
    if (UCanvasPanelSlot* Slot = Canvas->AddChildToCanvas(PlayBar))
    {
        Slot->SetAnchors(FAnchors(0.f, 1.f, 1.f, 1.f));
        Slot->SetAlignment(FVector2D(0.f, 1.f));
        Slot->SetSize(FVector2D(0.f, 220.f));
        Slot->SetOffsets(FMargin(24.f, 0.f, 24.f, 24.f));
    }
}

void UKSRootWidget::NativeTick(const FGeometry& MyGeometry, float InDeltaTime)
{
    Super::NativeTick(MyGeometry, InDeltaTime);
    if (!Director)
    {
        return;
    }
    const bool bPlaying = Director->IsPlaying();
    if (StoryCard) StoryCard->SetVisibility(bPlaying ? ESlateVisibility::Collapsed : ESlateVisibility::Visible);
    if (PlayBar) PlayBar->SetVisibility(bPlaying ? ESlateVisibility::Visible : ESlateVisibility::Collapsed);
    if (TitleText) TitleText->SetText(Director->GetTitle());
    if (BodyText) BodyText->SetText(Director->GetBody());
    if (StatusText) StatusText->SetText(Director->GetStatus());
    if (ToastText) ToastText->SetText(Director->GetToast());
}

void UKSRootWidget::OnApproach() { if (Director) Director->ShowMenu(); }
void UKSRootWidget::OnNewGame() { if (Director) Director->ShowTribePick(); }
void UKSRootWidget::OnSariklilar() { if (Director) Director->ChooseTribe(EKSTribeId::Sariklilar); }
void UKSRootWidget::OnGokhanli() { if (Director) Director->ChooseTribe(EKSTribeId::Gokhanli); }
void UKSRootWidget::OnDemirhisar() { if (Director) Director->ChooseTribe(EKSTribeId::Demirhisar); }
void UKSRootWidget::OnBuildCamp() { if (Director) Director->BuildOnSelected(EKSBuildingSlot::Camp, 70); }
void UKSRootWidget::OnBuildTower() { if (Director) Director->BuildOnSelected(EKSBuildingSlot::Tower, 40); }
void UKSRootWidget::OnBuildField() { if (Director) Director->BuildOnSelected(EKSBuildingSlot::Resource, 40); }
void UKSRootWidget::OnTrain() { if (Director) Director->TrainArmy(); }
void UKSRootWidget::OnAttack() { if (Director) Director->AttackSelected(); }
