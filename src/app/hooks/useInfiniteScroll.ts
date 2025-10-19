import { useEffect, useRef, useState } from "react";

type UseInfiniteScrollProps<T> = {
    fetchFn: (from: number, to: number) => Promise<T[]>; // 👈 user-provided fetcher
    limit?: number;
    triggerPercent?: number; // e.g., 80 trigger on 80% visibility
};

// triggerPercent is not working as intended yet, fix later

export default function useInfiniteScroll<T>({
    fetchFn,
    limit = 10,
    triggerPercent = 80,
}: UseInfiniteScrollProps<T>) {
    const [data, setData] = useState<T[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useRef<HTMLDivElement | null>(null);

    const fetchData = async () => {
        if (!hasMore || loading) return;
        try {
            setLoading(true);

            const from = (page - 1) * limit;
            const to = from + limit - 1;
            // const newData = await fetchFn(from, to);

            // setData((prev) => [...prev, ...(newData ?? [])]);
            // if (!newData?.length || newData.length < limit) setHasMore(false);
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
        if (observer.current) observer.current.disconnect();

        const marginValue = window.innerHeight * ((100 - triggerPercent) / 100);
        const options = {
            root: null,
            rootMargin: `0px 0px ${marginValue}px 0px`,
            threshold: 0,
        };

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore && !loading) {
                setPage((prev) => prev + 1);
            }
        }, options);

        if (lastElementRef.current) {
            observer.current.observe(lastElementRef.current);
        }

        return () => observer.current?.disconnect();
    }, [loading, hasMore, triggerPercent]);

    return { data, loading, error, hasMore, lastElementRef };
}
