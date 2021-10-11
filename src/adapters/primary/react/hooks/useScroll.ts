export default function useScroll() {
    const scrollToElement = (element: string, marginTop = 0) => {
        // @ts-ignore-start
        parentScrollToId(element, marginTop);
        // @ts-ignore-end
    };

    return { scrollToElement };
}
