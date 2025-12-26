export function loadRemote(remoteName: string, exposedModule: string) {
  return async () => {
    // initialize sharing if available
    // angular 17+ still uses share scope
    // @ts-ignore
    await __webpack_init_sharing__('default');

    const container = (window as any)[remoteName];

    if (!container) {
      throw new Error(`Remote ${remoteName} not found on window scope`);
    }

    // initialize remote container
    // @ts-ignore
    await container.init(__webpack_share_scopes__.default);

    const factory = await container.get(exposedModule);
    return factory();
  };
}
