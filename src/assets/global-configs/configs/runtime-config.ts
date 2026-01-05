export function getRemoteEntry(entry: string): string {
  const config = (window as any).MF_RunTime_Config;

  if (!config?.remotes?.[entry]) {
    console.log(`Remote "${entry}" not found in runtime config`);
  }

  return config.remotes[entry];
}
