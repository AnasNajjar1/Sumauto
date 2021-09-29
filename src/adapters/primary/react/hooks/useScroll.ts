import { useEffect, useState } from 'react';

export default function useScroll() {
    const scrollToElement = (element: string) => {
        // @ts-ignore-start
        const hasParentScrolled = parentScrollToId(element);
        if (!hasParentScrolled) {
            const offset = document.getElementById(element)?.offsetTop || 0;
            window.scrollTo(0, offset);
        }
        // @ts-ignore-end
    };

    return { scrollToElement };
}
