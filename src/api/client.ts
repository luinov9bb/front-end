import { getApiBaseUrl } from './config'

export const AUTH_TOKEN_STORAGE_KEY = 'bookstore_access_token'

export class ApiError extends Error {
  readonly status: number
  readonly body: unknown

  constructor(status: number, message: string, body: unknown = undefined) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

function joinUrl(base: string, path: string): string {
  const normalizedBase = base.replace(/\/+$/, '')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${normalizedBase}${normalizedPath}`
}

function readStoredToken(): string | null {
  try {
    return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
  } catch {
    return null
  }
}

export type ApiJsonBody = Record<string, unknown> | unknown[]

export type ApiFetchOptions = Omit<RequestInit, 'body'> & {
  body?: RequestInit['body']
  jsonBody?: ApiJsonBody | null
  skipAuth?: boolean
}

function resolveBody(jsonBody: ApiJsonBody | null | undefined, initBody: RequestInit['body']): BodyInit | undefined {
  if (jsonBody !== undefined) {
    if (jsonBody === null) {
      return undefined
    }
    return JSON.stringify(jsonBody)
  }
  return initBody ?? undefined
}

function parseResponsePayload(text: string, contentType: string | null, httpStatus: number): unknown {
  if (!text) {
    return undefined
  }
  if (contentType?.includes('application/json')) {
    try {
      return JSON.parse(text) as unknown
    } catch {
      throw new ApiError(httpStatus, 'Response is not valid JSON', text)
    }
  }
  return text
}

function pickErrorMessage(status: number, statusText: string, data: unknown): string {
  if (typeof data === 'object' && data !== null) {
    const record = data as Record<string, unknown>
    const msg = record.message ?? record.title
    if (typeof msg === 'string' && msg.trim()) {
      return msg
    }
  }
  if (typeof data === 'string' && data.trim()) {
    return data
  }
  return statusText || `HTTP ${status}`
}

export async function apiFetch<T = unknown>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const { jsonBody, skipAuth, headers: initHeaders, body: initBody, ...rest } = options
  const headers = new Headers(initHeaders)
  const body = resolveBody(jsonBody, initBody)

  if (body !== undefined && !(body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  if (!skipAuth) {
    const token = readStoredToken()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
  }

  const response = await fetch(joinUrl(getApiBaseUrl(), path), {
    ...rest,
    headers,
    body,
  })

  const text = await response.text()
  const data = parseResponsePayload(text, response.headers.get('Content-Type'), response.status)

  if (!response.ok) {
    throw new ApiError(
      response.status,
      pickErrorMessage(response.status, response.statusText, data),
      data,
    )
  }

  return data as T
}
