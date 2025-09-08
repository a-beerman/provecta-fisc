# ProvectaFisc - Casa de Marcat Fiscală

🇷🇴 **Aplicație completă pentru managementul casei de marcat fiscală**

## 📋 Descriere

ProvectaFisc este o aplicație web modernă construită cu Ionic Angular pentru gestionarea operațiunilor fiscale. Aplicația oferă o interfață intuitivă pentru toate funcțiile necesare unei case de marcat fiscală.

## ✨ Funcționalități

### 🧾 Rapoarte Fiscale
- **Raport X** - Raport intermedi fără închiderea zilei
- **Raport Z** - Raport de închidere ziluică 
- **Raport Zilnic** - Rapoarte pe perioade zilnice
- **Raport Lunar** - Rapoarte pe perioade lunare
- **Memorie Fiscală** - Citire și export memorie fiscală
- **Jurnal ANAF** - Generare jurnal pentru ANAF
- **Raport Operatori** - Rapoarte pe operatori
- **Raport Articole** - Rapoarte pe produse/servicii

### 💰 Funcții Bonuri Fiscale
- **Bon Nou** - Crearea de bonuri fiscale
- **Anulare Bon** - Anularea bonurilor curente
- **Copie Bon** - Duplicarea bonurilor existente
- **Plată Numerar** - Procesarea plăților cash
- **Plată Card** - Procesarea plăților electronice
- **Reducere** - Aplicarea de reduceri
- **Retipărire Bon** - Republicarea bonurilor
- **Info Fiscală** - Afișarea informațiilor fiscale

### ⚙️ Funcții Sistem
- **Memorie Fiscală** - Gestionarea memoriei fiscale
- **Operatori** - Managementul utilizatorilor
- **Articole** - Gestionarea produselor și serviciilor
- **Operații Casa** - Intrări și ieșiri de numerar
- **Tipuri Plată** - Configurarea metodelor de plată
- **Imprimante** - Configurarea și testarea imprimantelor
- **Calculator Fiscal** - Instrumente de calcul
- **Sincronizare** - Backup și sincronizare date
- **Setări Sistem** - Configurări generale

## 🚀 Cum să rulezi aplicația

### Metoda 1: Script automat (Recomandat)

#### Windows:
1. Fă dublu-click pe `start-app.bat`
2. Se va deschide o fereastră de comandă
3. Aplicația va porni automat la `http://localhost:8080`

#### macOS/Linux:
1. Fă dublu-click pe `start-app.sh` sau rulează în terminal:
   ```bash
   ./start-app.sh
   ```
2. Aplicația va porni automat la `http://localhost:8080`

### Metoda 2: Manual

1. **Asigură-te că ai Python 3 instalat**
   ```bash
   python3 --version
   ```

2. **Pornește serverul**
   ```bash
   python3 serve-static.py
   ```

3. **Deschide browserul**
   - Accesează: `http://localhost:8080`

### Metoda 3: Fișier HTML Direct
⚠️ **Notă**: Nu funcționează din cauza restricțiilor ES modules în browsere

## 📁 Structura fișierelor

```
ProvectaFisc/
├── www/browser/          # Aplicația compilată (fișierele statice)
│   ├── index.html        # Fișierul principal HTML
│   ├── *.js             # Fișierele JavaScript
│   ├── *.css            # Fișierele de stil
│   └── assets/          # Resurse (imagini, icoane)
├── serve-static.py      # Server HTTP simplu
├── start-app.sh         # Script de pornire (macOS/Linux)
├── start-app.bat        # Script de pornire (Windows)
└── README.md           # Acest fișier
```

## 🔧 Cerințe tehnice

- **Python 3.x** (pentru serverul local)
- **Browser modern** (Chrome, Firefox, Safari, Edge)
- **Rezoluție minimă**: 1024x768
- **JavaScript activat**

## 🌐 Compatibilitate

- ✅ **Chrome 90+**
- ✅ **Firefox 88+**
- ✅ **Safari 14+**
- ✅ **Edge 90+**
- ✅ **Dispozitive mobile** (responsive design)

## 📱 Caracteristici tehnice

- **Framework**: Ionic 8 + Angular 20
- **Limbaj**: TypeScript
- **Stil**: SCSS cu variabile CSS custom
- **Internationalizare**: Română (limba principală)
- **Arhitectură**: Single Page Application (SPA)
- **Navigare**: Modal-based (fără routing complex)

## 🔒 Securitate

- **Rularea locală**: Aplicația rulează doar pe calculatorul local
- **Fără date externe**: Nu trimite date către servere externe
- **Stocare locală**: Toate datele rămân pe dispozitiv

## 🐛 Depanare

### Aplicația nu se încarcă
1. Verifică că Python 3 este instalat
2. Verifică că serverul rulează pe `http://localhost:8080`
3. Verifică că portul 8080 nu este blocat

### Erori JavaScript
1. Verifică că browserul suportă ES modules
2. Refreshează pagina (Ctrl+F5 / Cmd+Shift+R)
3. Verifică consola browserului pentru erori

### Probleme cu funcționalitățile
1. Verifică că JavaScript este activat
2. Verifică că nu există extensii de browser care blochează funcționalitatea
3. Încearcă într-o fereastră incognito/privată

## 📞 Suport

Pentru probleme tehnice sau întrebări, contactează echipa de dezvoltare Provecta.

## 📄 Licență

© 2025 Provecta. Toate drepturile rezervate.

---

**ProvectaFisc** - Soluția completă pentru casa de marcat fiscală 🇷🇴
