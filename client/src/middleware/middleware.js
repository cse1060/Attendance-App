import Cookies from "js-cookie";
import axios from "axios"

export default async function middleware() {
    const url = window.location.href;
    const token = Cookies.get("token");
    const verifyToken = Cookies.get("verifyToken");
    if (token && (url === "http://localhost:3000/login" || url === "http://localhost:3000/signup")) {
        const res = await axios.post("http://127.0.0.1:8000/verifyuser/", { username: token, verifyToken: verifyToken });
        console.log(res.data);
        if (res.data.success === true) {
            return 1;
        }
        return 0;
    } else if (!token) {
        return 0;
    }
}