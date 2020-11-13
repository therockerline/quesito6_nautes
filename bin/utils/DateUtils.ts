import moment = require("moment");
import {Moment} from "moment";

export class DateUtils {
    static getLastYearDate(): Moment {
        let now = moment();
        return now.subtract(moment.duration(1, 'year'));
    }
}
