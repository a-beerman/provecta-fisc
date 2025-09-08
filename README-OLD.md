# ProvectaFisc - Casa de Marcat Fiscală

Aplicație web pen## Instalare și Rulare

1. **Instalare dependențe:**
   ```bash
   npm install
   ```

2. **Rulare în dezvoltare:**
   ```bash
   ionic serve
   ```

3. **Build pentru producție:**
   ```bash
   npm run build
   ```

4. **Build static (fără server):**
   ```bash
   ./build-static.sh
   ```
   
   Această comandă creează fișiere HTML statice care pot fi deschise direct în browser fără niciun server. Fișierele sunt generate în folderul `www/static/`:
   
   - `www/static/index.html` - Pagina principală (redirecționează către rapoarte)
   - `www/static/reports/index.html` - Pagina de rapoarte
   - `www/static/receipts/index.html` - Pagina de chitanțe
   
   **Pentru a folosi:** Faceți dublu-click pe oricare din fișierele HTML sau deschideți-le în browser. unei case de marcat fiscale cloud-based, dezvoltată cu Ionic Angular.

## Funcționalități

### 🏠 Pagina Principală
- Meniu lateral cu navigare rapidă
- Interfață tradusă în română (cu suport pentru engleză)
- Design modern cu carduri interactive

### 📊 Rapoarte
- **Raport X** - Raport fiscal intermediar
- **Raport Z** - Raport fiscal final de zi
- **Raport Zilnic** - Raport detaliat pe zi
- **Raport Lunar** - Raport sumarizat pe lună
- **Memorie Fiscală** - Accesare memorie fiscală
- **Jurnal ANAF** - Export jurnal pentru ANAF
- **Raport Operatori** - Activitate operatori
- **Raport Articole** - Statistici vânzări articole
- **Raport Departamente** - Analiză pe departamente
- **Intrări/Ieșiri Casa** - Mișcări de numerar

### 🧾 Funcții Chitanțe
- **Chitanță Nouă** - Crearea unei chitanțe noi
- **Bon Fiscal** - Emitere bon fiscal
- **Non-Fiscal** - Documente non-fiscale
- **Factură** - Generare facturi
- **Notă de Credit** - Emitere note de credit
- **Anulare Bon** - Anularea unui bon existent
- **Duplicat** - Reimprimarea unui bon
- **Plăți** - Procesare plăți (numerar, card, voucher)

## Tehnologii Utilizate

- **Ionic 8** - Framework pentru aplicații mobile/web
- **Angular 20** - Framework web
- **@ngx-translate** - Internationalizare (română ca limbă principală)
- **TypeScript** - Limbaj de programare
- **SCSS** - Stilizare avansată

## Structura Proiectului

```
src/
├── app/
│   ├── components/          # Componente reutilizabile
│   ├── reports/            # Pagina de rapoarte
│   ├── receipts/           # Pagina de chitanțe
│   ├── services/           # Servicii (fiscal, mev)
│   └── folder/             # Pagina folder (temporară)
├── assets/
│   └── i18n/              # Fișiere de traducere
│       ├── ro.json        # Traduceri română
│       └── en.json        # Traduceri engleză
└── theme/                 # Stiluri globale
```

## Instalare și Rulare

1. **Instalare dependențe:**
   ```bash
   npm install
   ```

2. **Rulare în dezvoltare:**
   ```bash
   ionic serve
   ```

3. **Build pentru producție:**
   ```bash
   npm run build
   ```

## Configurare Traduceri

Aplicația folosește **@ngx-translate** cu română ca limbă principală. Traducerile sunt stocate în `src/assets/i18n/`:

- `ro.json` - Traduceri în română (implicit)
- `en.json` - Traduceri în engleză

Pentru a adăuga o traducere nouă:
```typescript
{{ 'CHEIA_TRADUCERE' | translate }}
```

## Servicii

### FiscalService
Serviciul principal pentru comunicarea cu casa de marcat fiscală:
- Generare rapoarte
- Operații cu chitanțe
- Procesare plăți
- Comunicare cu dispozitivul fiscal

### MevService
Serviciul pentru comunicarea cu dispozitivele MEV Card.

## Interfață Utilizator

### Design Principii
- **Carduri Interactive** - Fiecare funcție este reprezentată ca un card cu hover effects
- **Grid Responsive** - Layout adaptabil pentru desktop, tablet și mobil
- **Iconografie Consistentă** - Folosirea ionicons pentru interfață uniformă
- **Feedback Visual** - Toast messages pentru confirmări și erori

### Paletă de Culori
- **Primary**: Funcții principale (bonuri fiscale)
- **Success**: Acțiuni pozitive (chitanțe noi)
- **Warning**: Atenționări (note de credit)
- **Danger**: Acțiuni destructive (anulări)
- **Secondary**: Acțiuni secundare (duplicate)

## TODO / Funcționalități Viitoare

1. **Comunicare Reală cu Casa de Marcat**
   - Implementare protocoale fiscale
   - Integrare cu API-uri MEV

2. **Gestionare Articole**
   - CRUD articole
   - Categorii și prețuri

3. **Gestionare Clienti**
   - Baza de date clienți
   - Istoric tranzacții

4. **Backup și Sincronizare**
   - Backup automat date
   - Sincronizare cloud

5. **Raportare Avansată**
   - Export Excel/PDF
   - Grafice și analize

6. **Setări și Configurare**
   - Configurare casa de marcat
   - Parametri fiscali

## Contribuții

Pentru contribuții la proiect:
1. Fork repository
2. Creează branch pentru feature (`git checkout -b feature/nume-feature`)
3. Commit modificările (`git commit -am 'Adaugă nume-feature'`)
4. Push branch (`git push origin feature/nume-feature`)
5. Creează Pull Request

## Licență

Acest proiect este dezvoltat pentru Provecta și este proprietate privată.

---

**Versiune:** 0.0.1  
**Ultima actualizare:** Septembrie 2025
