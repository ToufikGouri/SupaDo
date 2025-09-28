import { useEffect, useRef, useState } from "react";

type useInfiniteScrollProps = {
    url: string;
    limit?: number;
    triggerPercent?: number; // e.g., 80 trigger on 80% visibility
}

// triggerPercent is not working as intended yet/ fix later

export default function useInfiniteScroll({ url, limit = 10, triggerPercent = 80 }: useInfiniteScrollProps) {
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useRef<HTMLDivElement | null>(null);

    const fetchData = async () => {
        if (!hasMore) return;
        try {
            setLoading(true);
            const res = await fetch(`${url}?limit=${limit}&skip=${(page - 1) * limit}`);
            const result = await res.json();
            const newData = result.users || [];

            setData((prev) => [...prev, ...newData]);

            if (newData.length < limit) {
                setHasMore(false); // reached end
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    useEffect(() => {
        if (!data.length || loading) return;
        if (observer.current) observer.current.disconnect();

        const margin = `0px 0px 50% 0px`;
        // e.g., triggerPercent = 80 → rootMargin = "0px 0px 20% 0px"

        const options = {
            root: null,
            rootMargin: `0px 0px ${100 - triggerPercent}% 0px`,
            threshold: 0,
        };

        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prev) => prev + 1);
                }
            }, options
            // { threshold: 0, rootMargin: margin }
        );

        if (lastElementRef.current) {
            observer.current.observe(lastElementRef.current);
        }

        return () => observer.current?.disconnect();
        ;
    }, [loading, hasMore]);

    return { data, loading, error, hasMore, lastElementRef };
}
