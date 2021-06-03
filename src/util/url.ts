export const withQueryParams = (urlRaw: string, queryParams: Record<string, string>) => {
    const url = new URL(urlRaw);
    for (const key of Object.keys(queryParams)) {
        url.searchParams.append(key, queryParams[key]);
    }
    return url.toString();
};