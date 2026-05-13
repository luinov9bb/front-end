import type { AuthUser } from "../../types/user";
import type { ApiUserDto } from "../types/authApi";

export function mapApiUserToAuthUser(dto: ApiUserDto): AuthUser {
  const r = (dto.role ?? "").toLowerCase();
  return {
    id: dto.id,
    username: dto.username,
    email: dto.email,
    role: r === "admin" ? "admin" : "user",
    registeredOn: dto.registeredOn,
    isActive: dto.isActive,
  };
}
