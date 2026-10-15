import path from 'node:path';

export const getExternalModulePath = (name: string) => {
  return MAIN_WINDOW_VITE_DEV_SERVER_URL
    ? path.join(__dirname, '../../src/external', name)
    : path.join(process.resourcesPath, 'external', name);
};
