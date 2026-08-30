import type { SideTribe } from "../core/types";

export const SIDE_TRIBES: SideTribe[] = [
  {
    unlockLevel: 10,
    id: "korsanlar",
    name: "Tuz Korsanları",
    relation: "belirsiz",
    memory:
      "Kaptan Leyla, Murat Ağa ile bir kış gecesi aynı fenerin altında harita katladıklarını anlatır. 'O, denizi bile yeminle bağlardı' der.",
    clue: "O gece kıyıda mor ışıklı bir sandal görülmüş. Korsanlar bunu Gök-Hanlı rumuna yorar.",
    isShadowCult: false,
  },
  {
    unlockLevel: 20,
    id: "mogollar",
    name: "Bozkır Moğolları",
    relation: "dusman",
    memory:
      "Han Batu, yıllar önce Murat Ağa'nın çadırına ekmek bırakıp savaşmayı reddettiğini söyler. 'Düşmanım bile olsa tuz hakkına sahipti.'",
    clue: "Bozkırda bulunan kırık bir zırh parçası Demir-Hisar damgası taşır — belki tuzak, belki gerçek.",
    isShadowCult: false,
  },
  {
    unlockLevel: 30,
    id: "gocebeler",
    name: "Kum Göçebeleri",
    relation: "dost",
    memory:
      "Yaşlı Şirin, Murat Ağa'nın kervanına su verdiği günü unutmaz. 'O susuzlara tahtını anlatmazdı. İsimlerini sorardı.'",
    clue: "Kumda bulunan sahte bir mühür Sarıklılar'ın barut işaretine benzer, ama koku yanlıştır.",
    isShadowCult: false,
  },
  {
    unlockLevel: 40,
    id: "suikastcilar",
    name: "Suikastçılar Tarikatı",
    relation: "belirsiz",
    memory:
      "Gölge Tapınağı'nın bekçisi fısıldar: 'Biz yalnızca bilgi satarız. Murat Ağa bile bir zamanlar kapımızı çalmıştı.'",
    clue: "Tarikat, üç kabileye de 'doğru' görünen parçalar verir. Her parça diğerini yakar.",
    isShadowCult: true,
  },
  {
    unlockLevel: 50,
    id: "denizciler",
    name: "İnci Denizcileri",
    relation: "dost",
    memory:
      "Dümenci Ömer, Murat Ağa'nın fırtınada bir çocuğu kayığa aldığını hatırlar. 'Taht, o gece ıslak bir battaniyeydi.'",
    clue: "Limanda duyulan bir isim: Gölge Elçisi. Kimse yüzünü görmemiş.",
    isShadowCult: false,
  },
  {
    unlockLevel: 60,
    id: "colyildizlari",
    name: "Çöl Yıldızları",
    relation: "belirsiz",
    memory:
      "Yıldız kâhinleri, Murat Ağa'nın son baharında gökyüzünün mor bir çizgiyle yarıldığını söyler.",
    clue: "Kehanet üç kabileye birden 'suçlu' der. Bu, kehanetin bozulduğu anlamına gelir.",
    isShadowCult: false,
  },
  {
    unlockLevel: 70,
    id: "dagkartallari",
    name: "Dağ Kartalları",
    relation: "dost",
    memory:
      "Kartal Ana, Murat Ağa ile aynı uçurumda yemin ettiklerini anlatır: 'Hiçbir kabile diğerinin gölgesi olmayacak.'",
    clue: "Yemin taşının altında dördüncü bir mühür kazınmış. Üç kabileden hiçbiri onu tanımıyor.",
    isShadowCult: false,
  },
  {
    unlockLevel: 80,
    id: "buzmuhafizlari",
    name: "Buz Muhafızları",
    relation: "dusman",
    memory:
      "Buz Beyi, Murat Ağa'nın kuzey geçidini kapattığı kışı hatırlar. 'Bizi dondurdu, ama yalan söylemedi.'",
    clue: "Buzda saklı bir mektup: 'Kabileler birbirini yerse taht boş kalır.' İmza yok.",
    isShadowCult: false,
  },
  {
    unlockLevel: 90,
    id: "eskiyeminliler",
    name: "Eski Yeminliler",
    relation: "dost",
    memory:
      "Son yâren, Murat Ağa'nın ölümünden bir gece önce 'en yakınımdakine güvenme' dediğini yeminle tekrarlar.",
    clue: "Gölge Elçisi, yıllardır tahtın solunda duran isimsiz danışmandır.",
    isShadowCult: false,
  },
  {
    unlockLevel: 100,
    id: "golge-elcisi",
    name: "Gölge Elçisi",
    relation: "dusman",
    memory:
      "Elçi, Murat Ağa'nın kulağına fısıldayan dosttu. Hançeri kalbe, planı topraklara saplayan da odur.",
    clue: "Son parşömen: Suikastçılar kabileleri birbirine düşürüp bütün mirası yutacaktı.",
    isShadowCult: true,
  },
];

export function sideTribeForLevel(level: number): SideTribe | undefined {
  return SIDE_TRIBES.find((tribe) => tribe.unlockLevel === level);
}
