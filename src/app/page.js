"use client"

import useStore from "@/hooks/useStore";
import { useGithubStore } from "@/store";
import React, { useState } from "react"
import shallow from "zustand/shallow";

export default function Home() {
    const githubStore = useStore(useGithubStore, state => ({
        search_users: state.search_users,
        isLoading: state.isLoading,
        data: state.data
    }));

    const [search, setSearch] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            q: search
        }

        await githubStore?.search_users(payload);
    }

    return (
        <main className="w-full p-24">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="py-2 px-4 rounded-lg border placeholder:text-gray-600 text-gray-600 w-4/12"
                    placeholder="search github user name"
                />
            </form>

            {
                githubStore?.isLoading ? <div className="text-gray-600 font-semibold text-center pt-24 pb-32 mx-auto">
                    Loading....
                </div> : <div className="mt-12 space-y-3">
                    {
                        githubStore?.data?.items?.length > 0 && githubStore?.data?.items?.map(datum => <div className="text-gray-600" key={datum?.id}>{datum?.html_url}</div>)
                    }
                </div>
            }
        </main>
    )
}
