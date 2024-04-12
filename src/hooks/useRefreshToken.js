import axios from "axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAccessToken,setPersist } = useAuth();

    const refresh = async () => {
        let accessToken;
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/api/user/refresh`,{
                withCredentials : true
            }
            );
            accessToken = response.data.accessToken;
            setAccessToken(accessToken);
        } catch (error) {
            setAccessToken(null);
            setPersist(false);
        }
        return accessToken;
    }
    return refresh;
};

export default useRefreshToken;
