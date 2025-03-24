"use client"

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useCustomQuery = (
    queryKey: string[],
    fetcher: any,
    configOptions?: UseQueryOptions
) => {
    return useQuery<any>({
        queryKey,
        queryFn: () => fetcher(),
        ...configOptions,
    });
};
