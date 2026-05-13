export interface ApiUserDto {
  id: number;
  username: string;
  email: string;
  role: string;
  registeredOn: string;
  isActive: boolean;
}

export interface LoginResultDto {
  isSuccess: boolean;
  message: string;
  token: string;
  expiresAt?: string | null;
  user?: ApiUserDto | null;
}

export interface ResponceMsg {
  isSuccess: boolean;
  message: string;
}
