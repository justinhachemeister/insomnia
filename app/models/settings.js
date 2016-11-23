import * as db from '../common/database';

export const name = 'Settings';
export const type = 'Settings';
export const prefix = 'set';

export function init () {
  return {
    showPasswords: true,
    useBulkHeaderEditor: false,
    followRedirects: true,
    editorFontSize: 12,
    editorLineWrapping: true,
    httpProxy: '',
    httpsProxy: '',
    timeout: 0,
    validateSSL: true,
    forceVerticalLayout: false,
  };
}

export function migrate (doc) {
  return doc;
}

export async function all () {
  const settings = await db.all(type);
  if (settings.length === 0) {
    return [await getOrCreate()];
  } else {
    return settings;
  }
}

export async function create (patch = {}) {
  return db.docCreate(type, patch);
}

export async function update (settings, patch) {
  return db.docUpdate(settings, patch);
}

export async function getOrCreate () {
  const results = await db.all(type);
  if (results.length === 0) {
    return await create();
  } else {
    return results[0];
  }
}