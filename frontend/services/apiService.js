// Base API service — currently mock-only.
// Later: point this at the FastAPI backend (React → FastAPI → YOLOv8 → MongoDB/Firebase).

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const apiRequest = async (path, { method = 'GET', body, headers = {} } = {}) => {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Request failed (${res.status})`);
  }
  return res.json();
};

export default apiRequest;
