import { JwtHelperService } from "@auth0/angular-jwt";

export const getUserOutOfToken = (): string => {
    const tokenHelper = new JwtHelperService();
    const token = localStorage.getItem('AP_TKN');
    const decodedToken = tokenHelper.decodeToken(token);
    return JSON.parse(decodedToken.user)
};