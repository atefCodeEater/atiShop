"use client"

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useCustomQuery = <T>(
    queryKey: string[],
    fetcher: () => Promise<T>,
    configOptions?: UseQueryOptions<T>,

) => {
    return useQuery<T>({
        queryKey,
        queryFn: () => fetcher(),
        ...configOptions,
    });
};
