import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { accessToken,setAccessToken } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                const res = await refresh();
                setAccessToken(res);
            }
            catch (err) {
                console.error(err);
            }
            finally {
                setIsLoading(false);
            }
        }
        !accessToken ? verifyRefreshToken() : setIsLoading(false);
    }, [])

    return (
        <>
            {
                isLoading ? <Loading /> : <Outlet />
            }
        </>
    )
}

export default PersistLogin;
