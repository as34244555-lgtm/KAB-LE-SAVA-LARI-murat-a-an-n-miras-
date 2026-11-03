# Kabile Savaşları: Murat Ağa'nın Mirası — Unreal Engine 5 oyunu

Bu klasör oyunun kendisidir. Veri dosyası değil. Unreal Editor’da **Play**’e basınca oyun başlar: açılış, tek sancak seçimi, hex harita, inşa, eğitim ve savaş.

Grafik web sürümünden yüksektir: Lumen küresel aydınlatma, sanal gölgeler, gök atmosferi, hacimsel sis, çiçeklenme ve kabartmalı hex arazi. Renkli PBR malzeme editör açılınca otomatik oluşur.

## Nasıl açılır

1. Bilgisayarda **Unreal Engine 5.4** (5.3 veya 5.5 de olur) ve **Visual Studio 2022** (Game development with C++ iş yükü) kurulu olsun.
2. `KabileSavaslari.uproject` dosyasına çift tıkla. Farklı sürüm kullanıyorsan dosyaya sağ tık → **Switch Unreal Engine version**.
3. “Missing modules, rebuild?” sorusuna **Yes** de. İlk derleme birkaç dakika sürer.
4. Editör açılınca üstteki **Play** (yeşil üçgen) düğmesine bas.
5. **Tahta Yaklaş** → **Yeni Yemin** → bir kabile seç.
6. **WASD** gez, **fare tekerleği** veya **Q / E** yakınlaş, altıgene **sol tık**. Alttaki düğmelerle ocak, kışla, kule kur, birlik eğit, komşu toprağa yürü.

Bina ve asker seviyesi oyuncu seviyesini geçmez. Sarıklılar zırhı, Demir-Hisar gölgeyi, Gök-Hanlı ateşi ezer. Rakip kabile ara sıra akın düzenler.

## Klasör

- `Source/KabileSavaslari` — oynanış (harita, savaş, arayüz, kamera)
- `Content/DataTables` — 100 parşömenin metni; seviye atlayınca başlık buradan okunur
- `Content/Materials/M_TilePBR` — editör ilk açılışta üretilen arazi malzemesi

Play’e basmak için CSV sürüklemek veya Python script çalıştırmak gerekmez. Harita, sancak ve savaş kodu sahneyi kendisi kurar. `Content/DataTables/DT_Scrolls.json` seviye başlıklarını oyun açılınca okur.

## Referans: veriler ve eski içe aktarma notu

1. **`KabileSavaslari.uproject`** — Unreal Engine 5 proje dosyası (`GLTFImporter`, `EnhancedInput`, `PythonScriptPlugin` açık).
2. **`Source/KabileSavaslari/` (C++ Çekirdeği)**:
   - `KSTypes.h` — Kabileler (`Sarıklılar`, `Gök-Hanlı`, `Demir-Hisar`), binalar, birimler, parşömenler, görevler ve hex karolar için `UENUM` ve `FTableRowBase` (`DataTable`) yapıları.
   - `KSRulesLibrary.h / .cpp` — Blueprint'ten doğrudan çağrılabilen tüm oyun kuralları:
     - **Gelişim limiti:** Bina ve asker seviyesi oyuncu seviyesini (`PlayerLevel`) asla geçemez (`CapEntityLevel`, `CanUpgradeTo`).
     - **Seviye eğrisi:** `XpToNextLevel` (`24 + L*15 + L^1.08 * 2`).
     - **Taş-kâğıt-makas (1.35x):** Sarıklılar (bomba) > Demir-Hisar (zırh) > Gök-Hanlı (kritik) > Sarıklılar (`RpsMultiplier`).
     - **Hex harita ve iklim:** `AxialToWorld`, `HexDistance`, `BiomeAt` ve `ResolveBattle`.
   - `KSGameInstance.h / .cpp` — Oyuncunun seçtiği **tek sancağı** (`ChosenTribe`), toplam ordu sayısını (`Army`), birim dökümünü (`Roster`) ve 1–100 parşömen ilerlemesini tutan `UGameInstance`.
   - `KSHexGridActor.h / .cpp` — Sahneye bırakıldığında hex haritayı oluşturan C++ aktörü.
3. **`Content/DataTables/` (CSV + JSON Veri Tabloları)**:
   - `DT_Tribes.csv / .json` — 3 oynanabilir kabile + Vâris profili
   - `DT_Units.csv / .json` — 6 birim (Barutçu, Rüzgâr, Muhafız, Deve Süvarisi, Panter İzcisi, Burç Muhafızı)
   - `DT_Buildings.csv / .json` — 6 bina (Divan, Ocak, Kışla, Kule, Pazar, Demirhane)
   - `DT_Scrolls.csv / .json` — **1'den 100'e kadar tüm parşömenler** (1–39 yanlış iz, 40 Gölge Tapınağı, 100 Gölge Elçisi)
   - `DT_Quests.csv / .json` — 11 Murat Ağa anı görevi
   - `DT_SideTribes.csv / .json` — Her 10 seviyede açılan yan kabileler
   - `DT_Landmarks.csv / .json` — Harita üzerindeki hikâye noktaları ve garnizonları
   - `DT_Halls.csv / .json` — Her kabilenin başkenti ve 2 karakol koordinatı (toplam 9 merkez)
   - `DT_Dialogues.csv / .json` — Kanlı Taht açılışı, kabile suçlamaları, Gölge Tapınağı ve Final diyalogları
   - `DT_HexWorldSeed.csv / .json` — Başlangıç hex haritası karoları
4. **`Content/Models/`, `Content/Materials/PBR/`, `Content/HDRI/`**:
   - 3B glTF modeller (`boulder`, `cannon`, `crate`, `lantern`, `stove`, `table`)
   - 9 adet PBR materyal seti (`barrel`, `beam`, `cobble`, `ground`, `plaster`, `roof`, `stone`, `wall`, `wood` — `diff`, `nor`, `rough`)
   - 2 adet HDRI gökyüzü (`courtyard.hdr`, `sunrise.hdr`)

---

## Bilgisayarınızdaki Unreal Engine'e Nasıl Aktarırsınız? (Adım Adım)

### Yöntem A — Doğrudan Bu Projeyi Açmak (C++ + Blueprint)

1. Bilgisayarınızda **Unreal Engine 5.3 veya 5.4+** ve **Visual Studio 2022** ("Game development with C++" iş yükü seçili) kurulu olsun.
2. İndirdiğiniz `kabile-savaslari-unreal-engine-5.zip` dosyasını masaüstüne veya `Belgeler/Unreal Projects/` içine çıkartın (veya repo içindeki `unreal/KabileSavaslari` klasörünü açın).
3. Klasörün içindeki **`KabileSavaslari.uproject`** dosyasına çift tıklayın.
   - *"Missing KabileSavaslari Modules — Would you like to rebuild them now?"* sorusu çıkarsa **Yes (Evet)** deyin. Unreal C++ kodunu otomatik derleyip editörü açar.
   - Eğer farklı bir Unreal sürümü (ör. 5.5) kullanıyorsanız `KabileSavaslari.uproject` dosyasına sağ tıklayıp **Switch Unreal Engine version...** diyerek kendi sürümünüzü seçin.
4. Editör açıldığında:
   - **Content Drawer**'ı açın (`Ctrl + Space`).
   - `Content/DataTables/` içindeki `.csv` dosyalarını sürükleyip bırakın; açılan pencerede **DataTable Row Type** olarak ilgili yapıyı seçin:
     - `DT_Tribes.csv` → `KSTribeRow`
     - `DT_Units.csv` → `KSUnitRow`
     - `DT_Buildings.csv` → `KSBuildingRow`
     - `DT_Scrolls.csv` → `KSScrollRow`
     - `DT_Quests.csv` → `KSQuestRow`
     - `DT_SideTribes.csv` → `KSSideTribeRow`
     - `DT_Landmarks.csv` → `KSLandmarkRow`
     - `DT_Halls.csv` → `KSHallRow`
   - 3B modelleri tek seferde içe aktarmak için üst menüden **Tools → Execute Python Script...** seçip klasördeki `import_assets_in_editor.py` dosyasını çalıştırın (veya `Content/Models/` altındaki `.gltf` dosyalarını Content Drawer'a sürükleyin).
5. Sahneye `KSHexGridActor` sürükleyip bırakın ve **Play**'e basın.

### Yöntem B — Mevcut Bir Unreal Projenize (Sadece Blueprint) Aktarmak

Visual Studio kullanmadan, cihazınızda zaten açık olan bir Unreal Engine 5 projesine aktarmak isterseniz:

1. Kendi Unreal projenizi açın ve **Content Drawer**'ı açın.
2. `Content/Models/`, `Content/Materials/PBR/`, `Content/HDRI/` ve `Content/DataTables/` klasörlerini doğrudan Content Drawer içine sürükleyin (Unreal 5 glTF, HDR ve JPG dosyalarını kendisi tanır).
3. Verileri yenilemek isterseniz proje kökünde şu komutu çalıştırabilirsiniz:

```bash
npm run export:unreal
```
