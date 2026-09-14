import type { DialogueLine, TribeId } from "../core/types";

export const OPENING_CRAWL: DialogueLine[] = [
  {
    speaker: "narrator",
    text: "Yüzyıllardır süren Büyük Barış, kabilelerin ortak lideri Murat Ağa'nın bir gece yarısı suikasta kurban gitmesiyle bozuldu.",
  },
  {
    speaker: "narrator",
    text: "Katil, kalbine mor kabzalı, üzerinde kadim mühürler olan bir hançer sapladı ve onu tahtına çiviledi.",
  },
  {
    speaker: "narrator",
    text: "Şimdi üç kabile birbirini suçluyor. Sen ise vârisin kalemini taşıyorsun: bir köy inşa etmeyecek, bir cinayeti çözecek, bir mirası kurtaracaksın.",
  },
];

export const TRIBE_DIALOGUES: Record<Exclude<TribeId, "player">, DialogueLine[]> = {
  sariklilar: [
    {
      speaker: "sariklilar",
      text: "Hançer bir gölge kadar sessiz saplandı. Rüzgâr çocukları, Gök-Hanlılar, tahtın arkasında duruyordu. Bunu bir Sarıklı yapsaydı surlar hâlâ yanıyor olurdu.",
      barb: "gokhanli",
    },
    {
      speaker: "sariklilar",
      text: "Demir-Hisar bizi 'kendi ağamızı kestik' diye diline doluyor. Onurları o kadar ağır ki, düşünceleri yerinden kımıldamıyor.",
      barb: "demirhisar",
    },
    {
      speaker: "sariklilar",
      text: "Murat Ağa festivalde çocuklara kıvılcım gösterirdi. Şimdi o kıvılcımı yas tutmak için söndürdük. Gök-Hanlılar ise hâlâ fısıldıyor.",
      barb: "gokhanli",
    },
  ],
  gokhanli: [
    {
      speaker: "gokhanli",
      text: "Saraya fark edilmeden girmek için o kadar ağır bir zırh gerekir ki adımlar taşları uyutur. Demir-Hisar bunu 'nöbet' diye adlandırır.",
      barb: "demirhisar",
    },
    {
      speaker: "gokhanli",
      text: "Sarıklılar her şeyi ateşle ölçer. Sessizlik onları korkutur; korkunca bizi işaret ederler. Ne kadar da kestirme bir zekâ.",
      barb: "sariklilar",
    },
    {
      speaker: "gokhanli",
      text: "Murat Ağa avda bizim adımlarımızı överdi. Şimdi aynı adımlar 'suç' oldu. Demir, kıskandığı şeyi suçlar.",
      barb: "demirhisar",
    },
  ],
  demirhisar: [
    {
      speaker: "demirhisar",
      text: "Barışı bozmak için kendi liderlerini feda edenler, barutu dualarının yanına koyanlardır. Sarıklılar tahtı yakmak istedi.",
      barb: "sariklilar",
    },
    {
      speaker: "demirhisar",
      text: "Gök-Hanlılar gölgeyi evcil hayvan gibi gezdirir. Sonra 'biz değiliz' derler. Onur, yüzünü gizleyenle konuşmaz.",
      barb: "gokhanli",
    },
    {
      speaker: "demirhisar",
      text: "Murat Ağa kalkanımıza aslanı kendi eliyle çizdi. O aslan hâlâ bakıyor. Sarıklı kıvılcımı, Gök-Hanlı fısıltısı — ikisi de yemine sığmaz.",
      barb: "sariklilar",
    },
  ],
};

export const SHADOW_TEMPLE_DIALOGUE: DialogueLine[] = [
  {
    speaker: "shadow",
    text: "Hoş geldin, vâris. Biz yalnızca bilgi satarız. Murat Ağa bile bir zamanlar kapımızı çalmıştı.",
  },
  {
    speaker: "shadow",
    text: "Sarıklılar doğru söylüyor olabilir. Gök-Hanlılar da. Demir-Hisar da. Gerçek, fiyatını ödeyene görünür.",
  },
  {
    speaker: "narrator",
    text: "Tapınak gülümser. Müzik alçalır. Renkler morlaşır. Bir tarikat bu kadar cömert olmamalı.",
  },
];

export const FINALE_DIALOGUE: DialogueLine[] = [
  {
    speaker: "narrator",
    text: "Son parşömen açılır. Mühürler söner, sonra yeniden yanar — bu kez yalan için değil.",
  },
  {
    speaker: "shadow",
    text: "Beni o seçti, vâris. Ben yalnızca taşıdım. Hançeri, öfkeyi, boş tahtı.",
  },
  {
    speaker: "narrator",
    text: "Gölge Elçisi, Murat Ağa'nın en yakınıdır. Suikastçılar kabileleri birbirine düşürüp toprakları yutacaktı. Miras henüz ölmedi — sen duruyorsun.",
  },
];

export function dialogueForTribe(tribe: TribeId, level: number): DialogueLine[] {
  if (tribe === "player") {
    return [
      {
        speaker: "player",
        text: "Babamın — liderimin — tahtı boş. Ben bir köy değil, bir yemin inşa ediyorum.",
      },
    ];
  }
  const pool = TRIBE_DIALOGUES[tribe];
  if (level >= 100) {
    return [
      {
        speaker: tribe,
        text: "Elçi… yıllarca yanımızda durdu. Öfkemiz onun kılıcıymış. Vâris, kalkanları aynı yöne çevir.",
      },
    ];
  }
  if (level >= 40) {
    return [
      ...pool.slice(0, 1),
      {
        speaker: tribe,
        text: "Gölge Tapınağı bize 'doğru' cevaplar satıyor. Çok ucuzlar. Ucuz gerçek, pahalı yalandır — ama kulağa hoş geliyor.",
      },
    ];
  }
  return pool;
}
