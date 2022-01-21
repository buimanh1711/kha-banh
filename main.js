const Apify = require('apify');

Apify.main(async () => {
    const requestQueue = await Apify.openRequestQueue();
    await requestQueue.addRequest({url: 'https://bscscan.com/'});

    const handlePageFunction = async ({request, $}) => {
        console.log('request')
        await Apify.utils.sleep(10000);

        console.log(`${request.url}`);
    };

    const crawler = new Apify.CheerioCrawler({
        maxConcurrency: 1,
        // launchContext: {
        //     userAgent : '\tMozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
        // },
        requestQueue,
        handlePageFunction,
        handleFailedRequestFunction: async ({request, error}) => {
            await Apify.utils.sleep(10000);
            console.log(error.message)
        }
    });

    await crawler.run();
});