class UrlEncodingPlugin {

    constructor() {
    }

    process(text, settings) {
        return [
            {
                title: "Encoded",
                text: encodeURIComponent(text)
            },
            {
                title: "Decoded",
                text: decodeURIComponent(text)
            }
        ];
    }
}

module.exports = UrlEncodingPlugin;