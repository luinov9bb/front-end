const DEFAULT_DEV_API = 'http://localhost:5268'

export function getApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_BASE_URL
  if (typeof raw === 'string' && raw.trim()) {
    return raw.trim().replace(/\/+$/, '')
  }
  if (import.meta.env.DEV) {
    return DEFAULT_DEV_API
  }
  throw new Error(
    'VITE_API_BASE_URL is required for production builds. Copy .env.example to .env and set the value.',
  )
}
