export class UtilFn {
    ConvertDate(date: Date, separator: string): string {
        let strDay: number | string = date.getDate();
        strDay = strDay < 10 ? '0' + strDay : strDay;
        let strMonth: number | string = date.getMonth() + 1;
        strMonth = strMonth < 10 ? '0' + strMonth : strMonth;
        let strYear: number | string = date.getFullYear();
        return [strDay, strMonth, strYear].join(separator);
    }

    SetRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}