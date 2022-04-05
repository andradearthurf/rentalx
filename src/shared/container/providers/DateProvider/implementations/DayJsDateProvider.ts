import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // utilizar a data com formato UTC

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayJsDateProvider implements IDateProvider {
  dateNow(): Date {
    return dayjs().toDate();
  }
  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format(); // gerar data com formato UTC
  }
  compareInHours(start_date: Date, end_date: Date): number {
    const end_date_uct = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);
    return dayjs(end_date_uct).diff(start_date_utc, "hours");
  }
}

export { DayJsDateProvider };
