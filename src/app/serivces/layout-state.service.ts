import { Injectable, signal, computed, effect } from "@angular/core";
import { ModuleConfig, ModuleRoot, SubModule } from "../models/layout.model";

interface PersistedLayoutState {
  activeModuleKey: string | null;
  activeSubModuleKey: string | null;
}

@Injectable({ providedIn: 'root' })
export class LayoutStateService {
  private _modules = signal<ModuleConfig[]>([]);
  private _activeModule = signal<ModuleConfig | null>(null);
  private _activeSubModule = signal<SubModule | null>(null);

  modules = this._modules.asReadonly();
  activeModule = this._activeModule.asReadonly();
  activeSubModule = this._activeSubModule.asReadonly();

  subModules = computed(() => this._activeModule()?.subModules ?? []);

  initialize(data: ModuleRoot) {
    this._modules.set(data.modules);

    const activeModuleKey = sessionStorage.getItem('activeModuleKey');
    const activeSubModuleKey = sessionStorage.getItem('activeSubModuleKey');

    if (activeModuleKey) {
      this.selectModule(activeModuleKey, false);
    }

    if (activeSubModuleKey) {
      this.selectSubModule(activeSubModuleKey, false);
    }
  }

  selectModule(key: string, persist: boolean = true) {
    const module = this._modules().find(m => m.key === key);
    if (!module) return;

    this._activeModule.set(module);
    this._activeSubModule.set(null);

    if (persist) sessionStorage.setItem('activeModuleKey', key);
  }

  selectSubModule(key: string, persist: boolean = true) {
    const sub = this.subModules().find(s => s.key === key);
    if (!sub) return;

    this._activeSubModule.set(sub);

    if (persist) sessionStorage.setItem('activeSubModuleKey', key);
  }

  clear() {
    this._activeModule.set(null);
    this._activeSubModule.set(null);
    sessionStorage.removeItem("activeModuleKey");
    sessionStorage.removeItem('activeSubModuleKey')
  }
}

