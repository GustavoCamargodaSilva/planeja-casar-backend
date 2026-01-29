import { Request, Response, NextFunction } from 'express';
export declare class AuthController {
    register(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    login(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    me(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    forgotPassword(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    resetPassword(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
export declare const authController: AuthController;
