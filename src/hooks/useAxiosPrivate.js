import axiosPrivate from "../api/axios.js";
import { useEffect } from "react";
import useAuth from "./useAuth.js";
import useRefreshToken from "./useRefreshToken.js";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { accessToken } = useAuth();
    
    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            }, (error) => {
                return Promise.reject(error)
            }
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => {
                return response
            },
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [accessToken, refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;