import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../api/user";
import { queryClient } from "../api/queryClient";

export const useAuth = () => {
    const { data: profile, isSuccess } = useQuery({
        queryFn: fetchMe,
        queryKey: ['profile'],
        retry: 0,
        refetchOnWindowFocus: false,
    }, queryClient)

    return {
        isAuthenticated: isSuccess && !!profile,
        profile,
    }
}