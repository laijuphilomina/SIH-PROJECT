// Local database wrapper using localStorage.
// TODO: swap for IndexedDB if scan history grows large (e.g. via localForage).

const SCANS_KEY = 'scan_history';

const readAll = () => {
  try {
    return JSON.parse(localStorage.getItem(SCANS_KEY) || '[]');
  } catch {
    return [];
  }
};

const writeAll = (scans) => {
  localStorage.setItem(SCANS_KEY, JSON.stringify(scans));
};

const localDatabase = {
  async saveScan(scan) {
    const scans = readAll();
    const record = {
      id: Date.now(),
      synced: false,
      createdAt: new Date().toISOString(),
      ...scan,
      // Don't persist blob URLs — they die on reload
      imageUri: undefined,
    };
    scans.push(record);
    writeAll(scans);
    return record;
  },

  async getScanHistory() {
    return readAll().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async getUnsyncedScans() {
    return readAll().filter((s) => !s.synced);
  },

  async markScanSynced(id) {
    const scans = readAll();
    const scan = scans.find((s) => s.id === id);
    if (scan) {
      scan.synced = true;
      writeAll(scans);
    }
  },

  async clearHistory() {
    localStorage.removeItem(SCANS_KEY);
  },
};

export default localDatabase;
