import * as jwt from 'jsonwebtoken';
import { asFail, asSuccess } from '../types/response';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key'; // 환경 변수로 관리하는 게 좋습니다
const JWT_EXPIRES_IN = '7d'; 


export function signJwt(payload: AuthPayloadType): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyJWT<T = any>(token: string): T | null {
  try {
    return jwt.verify(token, JWT_SECRET) as T;
  } catch (err) {
    return null;
  }
}

export type AuthTokenType = string;
export enum AuthRole {
  USER = 'user',
  ADMIN = 'admin',
}
export type AuthPayloadType = {
  userId: number;
  role: AuthRole;
}

export function checkAuth(token: AuthTokenType | null, required_role = AuthRole.USER) {
  if(!token) return asFail({
    reason: "NOT_FOUND_TOKEN" as const,
  });
  const payload = verifyJWT<AuthPayloadType>(token);
  if(!payload) return asFail({
    reason: "JWT_ERROR" as const,
  });
  if (payload.role !== required_role && payload.role !== AuthRole.ADMIN) {
    return asFail({
      reason: "UNAUTHORIZED" as const,
    });
  }
  return asSuccess(payload);
}