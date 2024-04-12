import useAuth from "./useAuth";
import axios from "axios";

const useLogout = () => {
    const { setAccessToken,setPersist } = useAuth();

    const logout = async () => {
        setAccessToken(null);
        localStorage.removeItem("persist");
        setPersist(false);
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/api/user/logout`, {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    }
    return logout;
}

export default useLogout
