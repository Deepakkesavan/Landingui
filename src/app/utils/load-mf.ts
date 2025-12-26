export async function loadRemote(
  remoteEntry: string,
  remoteName: string,
  exposedModule: string
) {
  // Load remoteEntry dynamically
  await loadScript(remoteEntry);

  // initialize share scope
  // @ts-ignore
  await __webpack_init_sharing__('default');

  const container = (window as any)[remoteName];
  if (!container) {
    throw new Error(`Remote container ${remoteName} not found.`);
  }

  // @ts-ignore
  await container.init(__webpack_share_scopes__.default);

  const factory = await container.get(exposedModule);
  return factory();
}

function loadScript(remoteEntry: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${remoteEntry}"]`);
    if (existing) return resolve();

    const script = document.createElement('script');
    script.src = remoteEntry;
    script.type = 'text/javascript';
    script.async = true;

    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error(`Failed to load remote entry: ${remoteEntry}`));

    document.head.appendChild(script);
  });
}
