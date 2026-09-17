# Kabile Savaşları: Murat Ağa'nın Mirası

Pixar / toy-box estetiğinde, hikâye odaklı bir strateji prototipi. Oyuncu yalnızca bir köy kurmaz; Murat Ağa suikastını çözer ve liderinin mirasını kurtarır.

## Anlatı

1. **Kanlı Taht** — Mor kabzalı hançer tahta saplanır. Açılış hüzünlü ama kararlıdır.
2. **Üç şüpheli** — Sarıklılar, Gök-Hanlı ve Demir-Hisar birbirini iğneleyici dille suçlar.
3. **Parşömenler** — Her seviyede bir günlük parçası. 1–39 yanlış iz, **40** Gölge Tapınağı, **100** Gölge Elçisi.
4. **Yan kabileler** — Her 10 seviyede sis açılır; NPC’ler Murat Ağa anıları anlatır.

## Oynanış

- **Gelişim limiti:** Bina ve asker seviyesi oyuncu seviyesini geçemez.
- **Altın** üretim / inşaat / asker, **elmas** yükseltme.
- **Kervan:** Zamanlayıcı + rastgele haydut baskını.
- **Savaş:** Sarıklılar (bomba) > Demir-Hisar (zırh) > Gök-Hanlı (kritik) > Sarıklılar. Rakip gücü seviyeyle artar.

## Mimari

```
src/core          durum makinesi, olay bus, Game
src/managers      Level, Narrative, Economy, Save, Ads, Quest
src/units         savaş çözümleyici, birim maliyetleri
src/economy       kervan
src/data          100 parşömen, diyalog, görev, kabile
src/world         Three.js taht / köy / savaş sahneleri
src/ui            neumorphic arayüz
```

Kayıtlar Web Crypto AES-GCM (yoksa XOR zarfı) ile yerelde saklanır. `AdsManager` AdMob ödüllü reklam şablonudur; web’de güvenli stub çalışır.

## Geliştirme

```bash
npm install
npm test
npm run dev
```

Tarayıcıda `http://localhost:5173`. Production: `npm run build && npm run preview`.

## Telefonda oyna

Safari veya Chrome’da aç; “Ana Ekrana Ekle” dersen uygulama gibi durur. Kayıt o tarayıcıda saklanır.

- **Canlı site:** https://kabile-savaslari-murat-aganin-mirasi.paint-lizard.workers.dev/
- **GitHub Pages** (repo Settings → Pages → Source: `gh-pages` dalı): https://as34244555-lgtm.github.io/KAB-LE-SAVA-LARI-murat-a-an-n-miras-/
