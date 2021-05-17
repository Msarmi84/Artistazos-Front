import { JwtHelperService } from "@auth0/angular-jwt";

export const getUserFromToken = (): string => {
    const tokenHelper = new JwtHelperService();
    const token = localStorage.getItem('AP_TKN');
    const decodedToken = tokenHelper.decodeToken(token);
    return decodedToken.user;
};