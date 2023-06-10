import create from "zustand";
import { persist } from "zustand/middleware";
import queryString from 'query-string';
import methods from "@/services/githubService";

const initialState = {
    data: undefined,
    userDetails: undefined,
    cached_users_details: [],
    query: {
        page: 1,
        per_page: 20
    },
    isLoading: false,
    error: undefined
}

export const useStore = create(
    persist(
        (set, get) => ({
            ...initialState,
            search_users: async (query) => {
                try {
                    set(() => ({
                        isLoading: true,
                    }))

                    const response = await methods.get({
                        url: "/search/users",
                        query
                    });

                    set(() => ({
                        isLoading: false,
                        data: response
                    }))
                } catch (err) {
                    const error = err?.message || err?.data?.message || 'Unexpected network error.';
                    set(() => ({
                        isLoading: false,
                        error
                    }));
                }
            },
            get_user_details: async (username) => {
                try {
                    set(() => ({
                        isLoading: true
                    }));

                    const userDetails = get().cached_users_details.find(a => a.login === username);

                    if(userDetails){
                        set(() => ({
                            isLoading: false,
                            userDetails
                        }))
                    } else {
                        const response = await methods.get({
                            url: `/users/${username}`,
                        })

                        set((state) => ({
                            isLoading: false,
                            userDetails: response,
                            cached_users_details: [...state.cached_users_details, response]
                        }))
                    }
                } catch (err) {
                    const error = err?.message || err?.data?.message || 'Unexpected network error.';
                    set(() => ({ 
                        isLoading: false, 
                        error 
                    }));
                }
            },
            clear: () => {
                set(() => (initialState));
                sessionStorage.clear();
            }
        }),
        {
            name: "search-storage",
            getStorage: () => sessionStorage
        }
    )
)