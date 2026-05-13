export type AuthUser = {
  id: number;
  username: string;
  email: string;
  role: "admin" | "user";
  registeredOn: string;
  isActive: boolean;
};
