const moment = require('../lib/moment.min');

class DateFormattingPlugin {

    constructor() {
    }

    process(text, settings) {
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
                text: this.getUnixTime(m, false)
            },
            {
                title: "Unix Time (ms)",
                text: this.getUnixTime(m, true)
            },
            {
                title: "Formatted",
                text: m.format()
            }
        ];
    }

    getUnixTime(m, milliseconds) {
        if (m) {
            if (milliseconds) {
                return m.valueOf();
            }
            else {
                return m.unix();
            }
        }
        else {
            return 'Invalid';
        }
    }
}

module.exports = DateFormattingPlugin;