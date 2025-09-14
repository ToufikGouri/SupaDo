import { useEffect, useRef } from "react";

type UseInfiniteScrollProps = {
    handleFetch: () => void,
    hasMore: boolean,
    triggerPercent?: number
}

const useInfiniteScroll = ({
    handleFetch,
    hasMore,
    triggerPercent = 1 // e.g. 0.8 → fetch when 80% visible
}: UseInfiniteScrollProps) => {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!hasMore) return;
        // Ensure triggerPercent is between 0–1
        const clampedPercent = Math.min(Math.max(triggerPercent, 0), 1);
        // Convert percentage into rootMargin offset
        // Example: 0.8 → fetch when 80% visible = trigger 20% earlier
        const rootMarginPx = `0px 0px ${((1 - clampedPercent) * 100).toFixed(0)}% 0px`;
        observerRef.current = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    handleFetch();
                }
            },
            {
                threshold: 0, // trigger as soon as it "touches"
                rootMargin: rootMarginPx,
            }
        );
        if (loaderRef.current) {
            observerRef.current.observe(loaderRef.current);
        }
        return () => {
            if (observerRef.current && loaderRef.current) {
                observerRef.current.unobserve(loaderRef.current);
            }
        };
    }, [handleFetch, hasMore, triggerPercent]);

    return loaderRef;
}

export default useInfiniteScroll;