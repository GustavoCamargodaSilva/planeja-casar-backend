export interface TokenPayload {
    userId: string;
    email: string;
}
export declare function generateToken(payload: TokenPayload): string;
export declare function verifyToken(token: string): TokenPayload;
export declare function decodeToken(token: string): TokenPayload | null;
