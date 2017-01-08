class JsonFormattingPlugin {

    constructor() {
    }

    process(text, settings) {
        let output;
        try {
            output = JSON.stringify(JSON.parse(text), null, 2)
        }
        catch (e) {
            output = 'Not valid JSON.';
        }
        return [
            {
                title: "Formatted",
                text: output
            }
        ];
    }
}

module.exports = JsonFormattingPlugin;
