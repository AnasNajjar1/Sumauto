export default function useScroll() {
    const scrollToElement = (element: string, marginTop = 0) => {
        // @ts-ignore-start
        const hasParentScrolled = parentScrollToId(element, marginTop);
        if (!hasParentScrolled) {
            const el = document.getElementById(element);
            const offset = (el && el.getBoundingClientRect().top - marginTop) || 0;
            window.scrollTo(0, offset);
        }
        // @ts-ignore-end
    };

    return { scrollToElement };
}
