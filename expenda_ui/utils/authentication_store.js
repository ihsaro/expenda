import { performPost } from "utils/api_communication";

export async function checkifUserIsAuthenticated() {
    const isUserAccessTokenValid = await performPost("/api/v1/authentication/user-access-token-valid/");
    if (isUserAccessTokenValid.status && isUserAccessTokenValid.status == 401) {
        const isUserRefreshTokenValid = await performPost("/api/v1/authentication/user-refresh-token-valid/");
        if (isUserRefreshTokenValid.status && isUserRefreshTokenValid.status == 401) {
            return false;
        }
        else if (isUserRefreshTokenValid.status && isUserRefreshTokenValid.status == 200) {
            const slideTokenResponse = await performPost("/api/v1/authentication/slide-token/");
            if (slideTokenResponse.status && slideTokenResponse.status == 200) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    else if (isUserAccessTokenValid.status && isUserAccessTokenValid.status == 200) {
        return true;
    }
}