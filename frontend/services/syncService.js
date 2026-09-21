import localDatabase from '../database/localDatabase';
import { apiRequest, getToken } from './api';

const syncService = {
  /**
   * Push unsynced local scans to the backend and pull latest advisory data.
   * Call this on app start and whenever connectivity is restored.
   */
  async sync() {
    const token = getToken();
    if (!token) return { pushed: 0, pulled: 0 };

    const unsynced = await localDatabase.getUnsyncedScans();

    let pushed = 0;
    for (const scan of unsynced) {
      try {
        await apiRequest('/api/scans', {
          method: 'POST',
          body: scan,
          headers: { Authorization: `Bearer ${token}` },
        });
        await localDatabase.markScanSynced(scan.id);
        pushed += 1;
      } catch {
        // keep unsynced; will retry next time
      }
    }

    let pulled = 0;
    try {
      const remote = await apiRequest('/api/advisory/latest', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(remote)) pulled = remote.length;
    } catch {
      // ignore pull errors
    }

    return { pushed, pulled };
  },
};

export default syncService;
