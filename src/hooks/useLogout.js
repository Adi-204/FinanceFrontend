import useAuth from "./useAuth";
import axios from "axios";

const useLogout = () => {
    const { setAccessToken,setPersist } = useAuth();
    const [error,setError] = useState('');
    
    const logout = async () => {
        setAccessToken(null);
        localStorage.removeItem("persist");
        setPersist(false);
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/api/user/logout`, {
                withCredentials: true
            });
        } catch (err) {
            setError(response?.error?.data);
        }
    }
    return logout;
}

export default useLogout
