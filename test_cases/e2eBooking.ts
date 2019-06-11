import { MainSearchPF } from "../page_functions/mainSearchPF";
import { SubSearchPO } from "../page_objects/subSearchPO";
import { MainSearchPO } from "../page_objects/mainSearchPO";
import { UtilFn } from "../common_functions/utilFn";
import { SubSearchPF } from "../page_functions/subSearchPF";

const utilFn = new UtilFn()
const mainSearchPO = new MainSearchPO()
const mainSearchPF = new MainSearchPF()
const subSearchPO = new SubSearchPO()
const subSearchPF = new SubSearchPF()

const route = 'Trat'
const departDate = new Date('1 July 2019')
const returnDate = new Date('2 July 2019')
const passenger = utilFn.SetRandomNumber(1, 10)

fixture`End-to-end booking test`
    .beforeEach(async t => await t.maximizeWindow())
    .page`https://www.travelertick.com/`

test('End-to-end test from main search to sub search', async t => {
    await mainSearchPF.EnterAndSelectRoute(route);
    const inputRoute = await mainSearchPO.tfRoute.value.then(s => s.split('to'))
    const routeFrom = inputRoute[0].trim()
    const routeTo = inputRoute[1].split('(')[0].trim()

    await t.expect(departDate < returnDate).ok(`Depart date ${departDate.toDateString()} 
        must be before return date ${returnDate.toDateString()}`)
    await t.click(mainSearchPO.tfDate.nth(0))
    await mainSearchPF.SelectDate(departDate)
    await t.click(mainSearchPO.tfDate.nth(1))
    await mainSearchPF.SelectDate(returnDate)
    await mainSearchPF.SetTotalPassengers(passenger)
    await t.click(mainSearchPO.btnSearch)

    await t.expect(subSearchPO.lbLocation.nth(0).textContent).eql(routeFrom)
    await t.expect(subSearchPO.lbLocation.nth(1).textContent).eql(routeTo)

    await t.expect(subSearchPO.tfDate.nth(0).value).eql(utilFn.ConvertDate(departDate, '/'))
    await t.expect(subSearchPO.tfDate.nth(1).value).eql(utilFn.ConvertDate(returnDate, '/'))

    const strArr = await subSearchPO.lbPerson.textContent.then(s => s.slice(1).split(' '))
    const totalPassenger = strArr[0].trim() === 'max' && passenger > parseInt(strArr[1]) ?
        strArr[1] : passenger.toString()
    await t.expect(subSearchPO.lbPassenger.textContent).eql(totalPassenger)

    const { basic, total } = await subSearchPF.CalculateTotalPrice()
    await t.expect(await subSearchPO.lbInfo.nth(1).textContent.then(s => s.trim())).eql(basic)
    await t.expect(await subSearchPO.lbInfo.nth(2).textContent.then(s => s.trim())).eql(total)

    await t.click(subSearchPO.ddlTime.nth(0))
    let opts = await subSearchPO.ddlTime.nth(0).child()
    let row = utilFn.SetRandomNumber(1, await opts.count - 1)
    let expVal = await opts.nth(row).textContent
    await t.click(opts.nth(row))
    let actVal = await opts.nth(await subSearchPO.ddlTime.nth(0).selectedIndex).textContent
    await t.expect(actVal).eql(expVal)

    await t.click(subSearchPO.ddlTime.nth(1))
    opts = await subSearchPO.ddlTime.nth(1).child()
    row = utilFn.SetRandomNumber(1, await opts.count - 1)
    expVal = await opts.nth(row).textContent
    await t.click(opts.nth(row))
    actVal = await opts.nth(await subSearchPO.ddlTime.nth(1).selectedIndex).textContent
    await t.expect(actVal).eql(expVal)

    await t.click(subSearchPO.btnSwitch)
    await t.expect(subSearchPO.tfDate.nth(1).hasAttribute('disabled')).ok()
    await t.expect(subSearchPO.ddlTime.nth(1).hasAttribute('disabled')).ok()

    await t.click(subSearchPO.btnSwitch)
    await t.expect(subSearchPO.tfDate.nth(1).hasAttribute('disabled')).notOk()
    await t.expect(subSearchPO.ddlTime.nth(1).hasAttribute('disabled')).notOk()
})