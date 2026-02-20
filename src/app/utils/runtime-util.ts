export function getModuleUrlFromStorage(key: string): string {
  const stored = sessionStorage.getItem('module-config');

  if (!stored) {
    throw new Error('No module-config found in sessionStorage');
  }

  const parsed = JSON.parse(stored);

  if (!parsed?.modules || !Array.isArray(parsed.modules)) {
    throw new Error('Invalid module-config structure');
  }

  const module = parsed.modules.find((m: any) => m.key === key);

  if (!module) {
    throw new Error(`Module "${key}" not found`);
  }

  if (!module.remoteEntry) {
    throw new Error(`URL not defined for module "${key}"`);
  }

  return module.remoteEntry;
}

export function getSubModuleUrlFromStorage(
  moduleKey: string,
  subModuleKey: string
): string {
  const stored = sessionStorage.getItem('module-config');

  if (!stored) {
    throw new Error('No module-config found in sessionStorage');
  }

  const parsed = JSON.parse(stored);

  if (!parsed?.modules || !Array.isArray(parsed.modules)) {
    throw new Error('Invalid module-config structure');
  }

  const module = parsed.modules.find((m: any) => m.key === moduleKey);

  if (!module) {
    throw new Error(`Module "${moduleKey}" not found`);
  }

  if (!module.subModules || !Array.isArray(module.subModules)) {
    throw new Error(`No submodules found for module "${moduleKey}"`);
  }

  const subModule = module.subModules.find(
    (sm: any) => sm.key === subModuleKey
  );

  if (!subModule) {
    throw new Error(
      `Submodule "${subModuleKey}" not found in module "${moduleKey}"`
    );
  }

  if (!subModule.remoteEntry) {
    throw new Error(`RemoteEntry not defined for submodule "${subModuleKey}"`);
  }

  return subModule.remoteEntry;
}

export function getModuleApiUrlFromStorage(key: string): string {
  const stored = sessionStorage.getItem('module-config');

  if (!stored) {
    throw new Error('No module-config found in sessionStorage');
  }

  const parsed = JSON.parse(stored);

  if (!parsed?.modules || !Array.isArray(parsed.modules)) {
    throw new Error('Invalid module-config structure');
  }

  const module = parsed.modules.find((m: any) => m.key === key);

  if (!module) {
    throw new Error(`Module "${key}" not found`);
  }

  if (!module.url) {
    throw new Error(`API URL not defined for module "${key}"`);
  }

  return module.url;
}

export function getSubModuleApiUrlFromStorage(
  moduleKey: string,
  subModuleKey: string
): string {
  const stored = sessionStorage.getItem('module-config');

  if (!stored) {
    throw new Error('No module-config found in sessionStorage');
  }

  const parsed = JSON.parse(stored);

  if (!parsed?.modules || !Array.isArray(parsed.modules)) {
    throw new Error('Invalid module-config structure');
  }

  const module = parsed.modules.find((m: any) => m.key === moduleKey);

  if (!module) {
    throw new Error(`Module "${moduleKey}" not found`);
  }

  if (!module.subModules || !Array.isArray(module.subModules)) {
    throw new Error(`No submodules found for module "${moduleKey}"`);
  }

  const subModule = module.subModules.find(
    (sm: any) => sm.key === subModuleKey
  );

  if (!subModule) {
    throw new Error(
      `Submodule "${subModuleKey}" not found in module "${moduleKey}"`
    );
  }

  if (!subModule.url) {
    throw new Error(`API URL not defined for submodule "${subModuleKey}"`);
  }

  return subModule.url;
}
