#include "KSGameInstance.h"
#include "KSRulesLibrary.h"

void UKSGameInstance::ChooseTribe(EKSTribeId NewTribe)
{
    ChosenTribe = NewTribe;
    PlayerLevel = 1;
    Xp = 0;
    Gold = 160;
    Diamond = 5;
    Army = 12;
    UnitLevel = 1;
    CollectedScrolls = { 1 };
    Roster.Empty();

    if (NewTribe == EKSTribeId::Sariklilar)
    {
        Roster.Add(TEXT("barutcu"), Army);
    }
    else if (NewTribe == EKSTribeId::Gokhanli)
    {
        Roster.Add(TEXT("ruzgar"), Army);
    }
    else
    {
        Roster.Add(TEXT("muhafiz"), Army);
    }
}

bool UKSGameInstance::AddXp(int32 Amount)
{
    if (Amount <= 0 || PlayerLevel >= 100)
    {
        return false;
    }

    Xp += Amount;
    bool bLeveledUp = false;
    while (PlayerLevel < 100 && Xp >= UKSRulesLibrary::XpToNextLevel(PlayerLevel))
    {
        Xp -= UKSRulesLibrary::XpToNextLevel(PlayerLevel);
        PlayerLevel += 1;
        CollectedScrolls.AddUnique(PlayerLevel);
        if (PlayerLevel >= 40) bShadowTempleRevealed = true;
        if (PlayerLevel >= 100) bFinaleRevealed = true;
        bLeveledUp = true;
    }
    return bLeveledUp;
}
