// ---- auth.js ----

// key ที่เก็บสถานะการล็อกอินใน sessionStorage
const AUTH_KEY = "auth_user";

// ตรวจสอบว่ามีการล็อกอินอยู่หรือไม่
function isLoggedIn() {
  return !!sessionStorage.getItem(AUTH_KEY);
}

// ฟังก์ชันล็อกอิน
// (ตรงนี้ใส่ username/password แบบง่าย ๆ ไว้ก่อน)
function login(username, password) {
  if (username === "admin" && password === "1234") {
    sessionStorage.setItem(AUTH_KEY, JSON.stringify({ username }));
    return true;
  }
  return false;
}

// ฟังก์ชันออกจากระบบ
function logout() {
  sessionStorage.removeItem(AUTH_KEY);
  location.href = "index.html"; // หลัง logout ให้กลับหน้าแรก
}

// ฟังก์ชันบังคับว่าต้องล็อกอิน
// ถ้าไม่ล็อกอินให้เด้งไปหน้า login.html
function requireLogin(redirectIfNot = "login.html") {
  if (!isLoggedIn()) {
    const url = new URL(redirectIfNot, location.href);
    // เก็บ path ของหน้าปลายทางเพื่อ redirect กลับหลัง login สำเร็จ
    url.searchParams.set("redirect", location.pathname);
    location.href = url.toString();
  }
}
