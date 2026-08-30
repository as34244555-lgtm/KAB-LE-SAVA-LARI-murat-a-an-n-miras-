import type { QuestDefinition } from "../core/types";

export const QUESTS: QuestDefinition[] = [
  {
    id: "q-yas-atesi",
    title: "Yas Ateşini Yakma",
    giver: "Sarıklı Usta Cemil",
    unlockLevel: 1,
    memoryOfMurat:
      "Cemil, Murat Ağa'nın bir kış gecesi ocağına oturup barut yerine çay koyduğunu anlatır. 'Ateş, misafiri yakmaz' demişti.",
    objective: "Altın Ocağı'nı kur veya yükselt; yas gününde üretim devam etsin.",
    goldReward: 60,
    xpReward: 35,
    diamondReward: 1,
  },
  {
    id: "q-ruzgar-izi",
    title: "Rüzgârın İzi",
    giver: "Gök-Hanlı İzci Peri",
    unlockLevel: 2,
    memoryOfMurat:
      "Peri, Murat Ağa ile aynı sırtta pusu beklediklerini söyler. 'O, rüzgârı düşmana karşı değil, çocuğa karşı sakınırdı.'",
    objective: "Keşif haritasında sisin bir parçasını aç ve bir kervan gönder.",
    goldReward: 80,
    xpReward: 45,
    diamondReward: 1,
  },
  {
    id: "q-aslan-kalkani",
    title: "Aslan Kalkanı",
    giver: "Demir-Hisar Usta Arslan",
    unlockLevel: 3,
    memoryOfMurat:
      "Arslan, Murat Ağa'nın kalkanına aslanı kendi eliyle çizdiğini unutmaz. 'Onur, çizgide durur' demişti.",
    objective: "En az bir Demir-Hisar Muhafızı eğit veya bir düşmanı püskürt.",
    goldReward: 90,
    xpReward: 50,
    diamondReward: 1,
  },
  {
    id: "q-korsan-fener",
    title: "Tuz Feneri",
    giver: "Kaptan Leyla",
    unlockLevel: 10,
    memoryOfMurat:
      "Leyla, Murat Ağa ile aynı fenerin altında harita katladıklarını anlatır. 'Denizi bile yeminle bağlardı.'",
    objective: "Tuz Korsanları'nı keşfet ve kervanı haydutlara karşı koru.",
    goldReward: 140,
    xpReward: 80,
    diamondReward: 2,
  },
  {
    id: "q-tuz-hakki",
    title: "Tuz Hakkı",
    giver: "Han Batu",
    unlockLevel: 20,
    memoryOfMurat:
      "Batu, Murat Ağa'nın çadırına ekmek bırakıp savaşmayı reddettiğini söyler. 'Düşmanım bile olsa tuz hakkına sahipti.'",
    objective: "Bozkır Moğolları ile yüzleş; sahte zırh parçasını günlüğe işle.",
    goldReward: 180,
    xpReward: 100,
    diamondReward: 2,
  },
  {
    id: "q-su-ismi",
    title: "Susuzların İsmi",
    giver: "Şirin Ana",
    unlockLevel: 30,
    memoryOfMurat:
      "Şirin, Murat Ağa'nın kervanına su verdiği günü unutmaz. 'O susuzlara tahtını anlatmazdı. İsimlerini sorardı.'",
    objective: "Kum Göçebeleri'nin sahte mührünü Parşömen Kulesi'ne taşı.",
    goldReward: 200,
    xpReward: 120,
    diamondReward: 2,
  },
  {
    id: "q-gercegi-satinalma",
    title: "Gerçeği Satın Alma",
    giver: "Gölge Bekçisi",
    unlockLevel: 40,
    memoryOfMurat:
      "Bekçi fısıldar: 'Murat Ağa kapımızı çalmıştı. Fiyatı sordu, vermedi. Barış satılık değil demişti.'",
    objective: "Gölge Tapınağı'nı aç ve bir 'bilgi' satın alma — sonra onu şüpheyle oku.",
    goldReward: 240,
    xpReward: 160,
    diamondReward: 3,
  },
  {
    id: "q-islak-taht",
    title: "Islak Taht",
    giver: "Dümenci Ömer",
    unlockLevel: 50,
    memoryOfMurat:
      "Ömer, Murat Ağa'nın fırtınada bir çocuğu kayığa aldığını hatırlar. 'Taht, o gece ıslak bir battaniyeydi.'",
    objective: "İnci Denizcileri'nden Gölge Elçisi adını günlükle.",
    goldReward: 260,
    xpReward: 180,
    diamondReward: 3,
  },
  {
    id: "q-dortuncu-muhur",
    title: "Dördüncü Mühür",
    giver: "Kartal Ana",
    unlockLevel: 70,
    memoryOfMurat:
      "Kartal Ana, Murat Ağa ile aynı uçurumda yemin ettiklerini anlatır: 'Hiçbir kabile diğerinin gölgesi olmayacak.'",
    objective: "Yemin taşının altındaki dördüncü mührü üç kabileye göster.",
    goldReward: 320,
    xpReward: 220,
    diamondReward: 4,
  },
  {
    id: "q-en-yakin",
    title: "En Yakınımdakine Güvenme",
    giver: "Son Yâren",
    unlockLevel: 90,
    memoryOfMurat:
      "Yâren, Murat Ağa'nın ölümünden bir gece önce 'en yakınımdakine güvenme' dediğini yeminle tekrarlar. Sonra Elçi'ye gülümsemişti.",
    objective: "Eski Yeminliler'in tanıklığını son parşömene bağla.",
    goldReward: 400,
    xpReward: 280,
    diamondReward: 5,
  },
  {
    id: "q-miras",
    title: "Miras Değil, Birlik",
    giver: "Murat Ağa'nın Gölgesi",
    unlockLevel: 100,
    memoryOfMurat:
      "Son satır: 'Vâris, üç kabileye gerçeği göster. Miras kan değil; birliktir.'",
    objective: "Gölge Elçisi'ni ifşa et ve kanlı tahtı boş bırakma — paylaş.",
    goldReward: 1000,
    xpReward: 500,
    diamondReward: 10,
  },
];

export function availableQuests(level: number, completed: string[]): QuestDefinition[] {
  return QUESTS.filter((quest) => quest.unlockLevel <= level && !completed.includes(quest.id));
}
