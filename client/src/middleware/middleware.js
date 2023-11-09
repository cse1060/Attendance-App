import Cookies from "js-cookie";
import axios from "axios";

export default async function checkUser() {
    const url = window.location.pathname
    console.log(url);

    const username = await Cookies.get("username")
    const token = await Cookies.get("token")

    console.log(username, token);
    if ((url !== "/login" && url !== "/signup" && url !== '/') && token) {
        const data = await axios.post("http://127.0.0.1:8000/check_user/", { username: username, token: token })
        console.log(data.data);
        if (data.data.success === false) {
            Cookies.remove("token")
            Cookies.remove("username")
        }
        return data.data.success
    } else if ((url === "/login" || url === "/signup") && token) {
        return false
    }
    console.log(1)
    return true
}