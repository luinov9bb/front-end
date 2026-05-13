import { apiFetch } from "./client";
import type { ApiUserDto, LoginResultDto, ResponceMsg } from "./types/authApi";

export async function loginRequest(credential: string, password: string): Promise<LoginResultDto> {
  return apiFetch<LoginResultDto>("/api/Auth/login", {
    method: "POST",
    skipAuth: true,
    jsonBody: { credential, password },
  });
}

export async function registerRequest(
  username: string,
  email: string,
  password: string,
): Promise<ResponceMsg> {
  return apiFetch<ResponceMsg>("/api/Auth/register", {
    method: "POST",
    skipAuth: true,
    jsonBody: { username, email, password },
  });
}

export async function meRequest(): Promise<ApiUserDto> {
  return apiFetch<ApiUserDto>("/api/Auth/me");
}
