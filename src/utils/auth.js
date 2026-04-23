import jwtDecode from "jwt-decode";

/**
 * Kiểm tra token hết hạn chưa
 */
export function isTokenExpired(token) {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);

    // exp là thời gian hết hạn (giây)
    if (!decoded.exp) return true;

    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    console.log("Token decode error:", error);
    return true;
  }
}