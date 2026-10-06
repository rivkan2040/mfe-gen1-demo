import { API_BASE_URL, SVIVA } from '../config/env';

// בסביבת local אין שרת API - מחזירים נתוני דמה במקום לפנות לרשת.
const MOCK_OPEN_CLAIMS_COUNT = 7;

export async function getOpenClaimsCount() {
  if (SVIVA === 'local') {
    return MOCK_OPEN_CLAIMS_COUNT;
  }

  const response = await fetch(`${API_BASE_URL}/claims/open-count`);
  const data = await response.json();
  return data.count;
}
