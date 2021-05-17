import { JwtHelperService } from "@auth0/angular-jwt";

export const getUserFromToken = () => {
    const tokenHelper = new JwtHelperService();
    const token = localStorage.getItem('AP_TKN');
    const decodedToken = tokenHelper.decodeToken(token);
    return decodedToken ? decodedToken.user : {};
};
