class Base64EncodingPlugin {

    constructor() {
    }

    process(text, settings) {
        let decoded;
        try {
            decoded = window.atob(text);
        }
        catch(err) {
            decoded = 'Not a valid Base64 encoded string.';
        }
        return [
            {
                title: "Encoded",
                text: window.btoa(text)
            },
            {
                title: "Decoded",
                text: decoded
            }
        ];
    }
}

module.exports = Base64EncodingPlugin;