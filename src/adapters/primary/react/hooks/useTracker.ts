import TagManager from 'react-gtm-module';

const useTracker = () => {
    const gtmId = 'GTM-KK2NJ66';

    const trackerInitialize = (site: string) => {
        // console.log(`initialize ${site}`);

        const tagManagerArgs = {
            gtmId,
            dataLayer: { site },
        };

        TagManager.initialize(tagManagerArgs);
    };

    const trackerPushEvent = (event: string, step: string) => {
        // console.log(`push event: ${event} step: ${step}`);

        const tagManagerArgs = {
            gtmId,
            dataLayer: { event, step },
        };

        TagManager.dataLayer(tagManagerArgs);

        return 2;
    };

    return { trackerInitialize, trackerPushEvent };
};

export default useTracker;
