# Maye Neft Yanacaqlarının Sertifikasiya Sınaqlarının Təşkili və Metroloji Təminatı

> **Diplom İşi Veb Tətbiqi**  
> Bu veb tətbiqi diplom işinin praktiki hissəsi kimi hazırlanmışdır. Tətbiq, maye neft yanacaqlarının laboratoriya sınaqları zamanı müvafiq parametrlərin hesablanmasını və normativ standartlarla müqayisəsini avtomatlaşdırır.

---

## 📋 Layihə Haqqında

Tətbiq, yanacaq sertifikasiyası laboratoriyalarında tətbiq olunan əsas fiziki-kimyəvi parametrlərin hesablanması üçün interaktiv kalkulyator modülləri toplusundan ibarətdir. Hər modul müvafiq dövlət (ГОСТ) və beynəlxalq (ISO/EN) standartlarına əsaslanır.

### Diplom İşinin Mövzusu

**"Maye neft yanacaqlarının sertifikasiya sınaqlarının təşkili və metroloji təminatı"**

Bu tətbiq diplom işinin tədqiqat hissəsini dəstəkləmək məqsədilə işlənib hazırlanmışdır. Sınaqların nəticələrinin hesablanması, normativ həddlərlə avtomatik müqayisəsi və uyğunluq qərarının verilməsi prosesini rəqəmsal şəkildə modelləşdirir.

---

## 🧪 Tətbiq Olunan Standartlar

| Parametr | Standart |
|---|---|
| Kükürd miqdarı | ГОСТ 32332-2013 (rentgen-fluoresan spektrometri) |
| Yanacaq sıxlığı | ГОСТ EN ISO 12185-2014 |
| Fraksiya tərkibi | ГОСТ ISO 3405-2013 |
| Oktan ədədi (motor üsulu) | ГОСТ 511-2015 / ISO 5164:2014 |
| Oktan ədədi (tədqiqat üsulu) | ГОСТ 8226-2015 / ISO 5163:2014 |
| Çəki ölçmələri | AZS OIML R 111-1:2013 |

---

## 🗂️ Layihənin Strukturu

```
src/
├── components/
│   ├── SulfurCalc/
│   │   ├── SulfurCalc.jsx       # Kükürd miqdarı kalkulyatoru
│   │   └── SulfurCalc.css       # Komponent stilləri
│   └── DensityCalc/
│       ├── DensityCalc.jsx      # Sıxlıq kalkulyatoru
│       └── DensityCalc.css
│
├── formulas/
│   ├── SulfurFormula.js         # S ≤ S_norm hesablama funksiyası
│   └── DensityFormula.js        # ρ = m / V hesablama funksiyası
│
└── App.jsx
```

---

## ⚙️ Qurulum və İşə Salma

### Tələblər

- Node.js v18 və ya yuxarı
- npm v9 və ya yuxarı

### Addımlar

```bash
# 1. Layihəni klonlayın
git clone https://github.com/istifadeci_adi/yanacaq-sertifikasiya.git
cd yanacaq-sertifikasiya

# 2. Asılılıqları quraşdırın
npm install

# 3. İnkişaf serverini işə salın
npm start
```

Tətbiq standart olaraq `http://localhost:3000` ünvanında açılacaq.

### Production Build

```bash
npm run build
```

---

## 🔢 Mövcud Kalkulyator Modulları

### 1. Kükürd Kalkulyatoru — `SulfurCalc`

Yanacaqda ölçülmüş kükürd miqdarını (S) normativ həddlə (S_norm) müqayisə edir.

**İstifadə olunan formula:**

```
S ≤ S_norm  (vahid: mq/kq)
```

**Nümunə:**

```
S = 7 mq/kq,  S_norm = 10 mq/kq
→ 7 ≤ 10  →  Uyğundur ✅
```

**İstifadə olunan funksiya:**

```js
import calculateSulfur from '../../formulas/SulfurFormula';

const { compliant, difference, message } = calculateSulfur(S, S_norm);
```

| Qaytarılan dəyər | Tip | İzah |
|---|---|---|
| `compliant` | `boolean` | Normativə uyğunluq nəticəsi |
| `difference` | `number` | S_norm ilə S arasındakı fərq (mq/kq) |
| `message` | `string` | Azərbaycan dilində nəticə mətni |

---

### 2. Sıxlıq Kalkulyatoru — `DensityCalc`

Yanacağın kütləsi (m) və həcmi (V) əsasında sıxlığını hesablayır, normativ aralıqla müqayisə edir.

**İstifadə olunan formula:**

```
ρ = m / V  (vahid: kq/m³)
```

**Normativ aralıq (avtomobil benzini üçün):**

```
720 ≤ ρ ≤ 775  kq/m³
```

---

## 🧩 Yeni Kalkulyator Modulu Əlavə Etmək

1. `src/formulas/` qovluğunda yeni hesablama funksiyası yaradın:

```js
// src/formulas/OctaneFormula.js
const calculateOctane = (measured, standard) => {
  const compliant = measured >= standard;
  return {
    compliant,
    difference: parseFloat((measured - standard).toFixed(2)),
    message: compliant
      ? 'Nəticə: Oktan ədədi normativə uyğundur'
      : 'Nəticə: Oktan ədədi normativə uyğun deyil',
  };
};

export default calculateOctane;
```

2. `src/components/` altında müvafiq `.jsx` və `.css` faylları yaradın.
3. `App.jsx`-ə komponenti import edin.

---

## 📐 Metroloji Arxitektura

Tətbiq ISO/IEC 17025 standartının tələblərinə uyğun olaraq aşağıdakı prinsiplər üzərində qurulub:

- **Ölçmə izlənilirliyi** — hər kalkulyator konkret ГОСТ/ISO standartına istinad edir
- **Qərəzsizlik** — hesablama funksiyaları (`formulas/`) interfeys komponentlərindən (`components/`) ayrıdır
- **Yoxlanılabilirlik** — `difference` dəyəri normativdən kənara çıxma miqdarını dəqiq göstərir
- **Şəffaflıq** — bütün normativ hədd dəyərləri kodda açıq şəkildə göstərilir

---

## 🛠️ İstifadə Olunan Texnologiyalar

| Texnologiya | Versiya | Məqsəd |
|---|---|---|
| React | 18+ | UI komponentləri |
| JavaScript (ES6+) | — | Hesablama funksiyaları |
| CSS3 | — | Responsiv dizayn |
| IBM Plex Sans/Mono | — | Tipografiya |

---

## 👤 Müəllif

**Diplom İşi**  
Mövzu: *Maye neft yanacaqlarının sertifikasiya sınaqlarının təşkili və metroloji təminatı*

---

## 📄 Lisenziya

Bu layihə yalnız tədris məqsədləri üçün hazırlanmışdır.
