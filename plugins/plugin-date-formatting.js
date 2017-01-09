const moment = require('../lib/moment.min');

class DateFormattingPlugin {

    constructor() {
    }

    process(text) {
        let m;
        try {
            let unixTime = Number(text);
            if (isNaN(unixTime)) {
                m = moment(text);
            }
            else {
                if (unixTime > moment().unix()*10) {
                    m = moment.unix(unixTime/1000.0);
                }
                else {
                    m = moment.unix(unixTime);
                }
            }
        }
        catch(err) {
        }
        return [
            {
                title: "Unix Time (s)",
                text: m ? m.unix() : 'Invalid'
            },
            {
                title: "Unix Time (ms)",
                text: m ? m.valueOf() : 'Invalid'
            },
            {
                title: "Formatted",
                text: m.format()
            }
        ];
    }
}

module.exports = DateFormattingPlugin;