import { MainSearchPO } from "../page_objects/mainSearchPO";
import { t } from "testcafe";

const mainSearchPO = new MainSearchPO()

export class MainSearchPF {
    async EnterAndSelectRoute(input: string, row: number = null): Promise<void> {
        if (await mainSearchPO.tfRoute.value !== '') {
            await t.selectText(mainSearchPO.tfRoute)
            await t.pressKey('delete')
        }
        await t.typeText(mainSearchPO.tfRoute, input)
        const count = await mainSearchPO.lbRouteSuggest.count
        await t.expect(count).notEql(0)
        for (let index = 0; index < count; index++) {
            await t.expect(mainSearchPO.lbRouteSuggest.nth(index).innerText).contains(input)
        }
        if (row === null) {
            row = Math.floor(Math.random() * count)
        }
        const selectElm = mainSearchPO.lbRouteSuggest.nth(row)
        const selectVal = await selectElm.textContent
        await t.click(selectElm);
        // const selectedVal = await mainSearchPO.tfRoute.value
        // await t.expect(selectedVal.split(' ').filter(val => val !== '').join(' ')).eql(selectVal.trimLeft());
        await t.expect(mainSearchPO.tfRoute.value).eql(selectVal.trimLeft())
    }

    async GetCurrentDate(): Promise<string> {
        return new Date(`${await mainSearchPO.lbDay.nth(0).textContent} ${await mainSearchPO.lbMonthYear.textContent}`)
            .toDateString()
    }

    async SelectDate(date: Date): Promise<void> {
        await t.expect(date > new Date())
            .ok(`Input date ${date.toDateString()} must be after today's date ${new Date().toDateString()}`)
        while (true) {
            const firstDay = new Date(`${await mainSearchPO.lbDay.nth(0).textContent} ${await mainSearchPO.lbMonthYear.textContent}`)
            const lastDay = new Date(`${await mainSearchPO.lbDay.nth(-1).textContent} ${await mainSearchPO.lbMonthYear.textContent}`)
            if (date > lastDay) await t.click(mainSearchPO.btnNextMonth)
            else if (date < firstDay) await t.click(mainSearchPO.btnPrevMonth)
            else break;
        }
        await t.click(mainSearchPO.lbDay.withText(`${date.getDate()}`))
    }

    async SetTotalPassengers(input: number): Promise<void> {
        const currCount = parseInt(await mainSearchPO.lbPassenger.textContent);
        const diffCount = Math.abs(input - currCount)

        for (let index = 0; index < diffCount; index++) {
            if (input < currCount) {
                await t.click(mainSearchPO.btnMinusPassenger)
            }
            else if (input > currCount) {
                await t.click(mainSearchPO.btnAddPassenger)
            }
        }
        await t.expect(mainSearchPO.lbPassenger.textContent).eql(`${input}`)
    }
}