const useTracker = () => {
    const trackerPushEvent = (event: string, step: string) => {
        const message = { type: 'event', event, step };
        // @ts-ignore-start
        if ('parentIFrame' in window) window.parentIFrame.sendMessage(message);
        // @ts-ignore-end
    };

    return { trackerPushEvent };
};

export default useTracker;
