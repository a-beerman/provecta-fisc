# ProvectaFisc - Ionic Angular Fiscal Application

## Architecture Overview
This is an Ionic Angular 17+ application for Romanian fiscal cash register management with MEV (Modulul Electronic de Verificare) integration. Key architectural patterns:

### Standalone Components Pattern
- **All components use standalone architecture** (Angular 17+): Import `IonX` components directly, no modules
- **Modal Pattern**: `src/app/modals/*/` - Each modal is standalone with dynamic imports in pages
- **Component Structure**: `src/app/components/*/` - Reusable UI components (numpad, receipt displays)

### Translation Architecture
- **Dual Translation System**: 
  - Hardcoded translations in `TranslationService` (Romanian/English)
  - JSON files in `src/assets/i18n/` exist but aren't used
  - Use `{{ 'KEY' | translate }}` in templates with keys from `TranslationService`
  - **Default language**: Romanian (`ro`)

### Service Layer Patterns
- **MevService** (`src/app/services/mev.service.ts`): Core fiscal operations, MEV API integration
- **TranslationService**: Manual translation management with `setTranslation()`
- **FiscalService**: Fiscal printing and receipt operations
- **All services use HttpClient** with RxJS patterns (finalize, tap, pipe)

## Critical Development Patterns

### Modal Implementation
```typescript
// Standard modal creation pattern in pages
async openMyModal() {
  const { MyModalComponent } = await import('../modals/my-modal/my-modal.component');
  const modal = await this.modalController.create({
    component: MyModalComponent,
    cssClass: 'my-modal-class',
  });
  return await modal.present();
}
```

### Standalone Component Template
```typescript
@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [
    CommonModule, FormsModule, TranslateModule,
    IonHeader, IonContent, IonButton, // Import specific Ionic components
  ],
})
```

### Form Validation Pattern
- Use `ReactiveFormsModule` with `FormBuilder`
- Romanian field validation for fiscal data
- **MEV Card Registration**: 9 required fields with specific validation rules

### Error Handling Pattern
```typescript
// Standard error handling with Utils
this.mevService.operation()
  .pipe(finalize(() => loading.dismiss()))
  .subscribe({
    next: (result) => this.showMevReceiptInfo(result.response.text),
    error: (error) => this.handleMessage(error)
  });
```

## Development Workflow

### Build Commands
- `npm run build` - Standard Angular build
- `ionic serve` - Development server (available as VS Code task)
- `ionic build` - Ionic-specific build

### Key File Locations
- **App Config**: `src/app/app.config.ts` - Standalone providers, translation setup
- **Routes**: `src/app/app.routes.ts` - File-based routing
- **Main Service**: `src/app/services/mev.service.ts` - 500+ lines of fiscal operations
- **Home Page**: `src/app/home/home.page.ts` - Main dashboard with section-based card layout

### Translation Management
- **Add new translations**: Update both Romanian and English objects in `TranslationService`
- **Translation keys**: Use hierarchical keys like `EXPORT_CONTROL_TAPE.TITLE`
- **Don't modify JSON files** - they're not loaded

### Component Integration
- **Numpad Component**: Reusable numeric input with decimal support
- **Receipt Components**: MEV receipt display and printing
- **Touch Input**: Custom input components for fiscal data

## Fiscal Domain Knowledge
- **X Reports**: Non-closing daily reports
- **Z Reports**: Day-closing fiscal reports (require confirmation)
- **MEV Cards**: Romanian fiscal device registration cards
- **Control Tape**: Fiscal transaction export functionality
- **Cash Operations**: In/Out operations with receipt generation

## Common Pitfalls
1. **Don't import Angular modules** - use standalone imports only
2. **Translation keys must exist in TranslationService** - JSON files are ignored
3. **Modal CSS classes** should match component names for consistency
4. **Date handling**: Use ISO strings for datetime components, format for MEV API
5. **Loading states**: Always use `finalize()` to dismiss loading controllers
