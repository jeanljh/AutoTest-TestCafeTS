import { MainSearchPO } from '../page_objects/mainSearchPO'
import { MainSearchPF } from '../page_functions/mainSearchPF';
import { UtilFn } from '../common_functions/utilFn';

const utilFn = new UtilFn()
const mainSearchPO = new MainSearchPO()
const mainSearchPF = new MainSearchPF()

fixture`Test main search features`
    .beforeEach(async t => await t.maximizeWindow())
    .page`https://www.travelertick.com/`

test('Test enter route and select from auto-suggest', async t => {
    const route = 'Hua Hin'
    await mainSearchPF.EnterAndSelectRoute(route)
})

test('Test select departure and return dates from datepicker', async t => {
    const expCurrDate = new Date().toDateString()
    const departDate = new Date('1 July 2019')
    const returnDate = new Date('2 July 2019')

    await t.expect(departDate < returnDate).ok(`Depart date ${departDate.toDateString()} 
        must be before return date ${returnDate.toDateString()}`)
        
    await t.click(mainSearchPO.tfDate.nth(0))
    await t.expect(await mainSearchPF.GetCurrentDate()).eql(expCurrDate)
    await mainSearchPF.SelectDate(departDate)
    let actResult = await mainSearchPO.tfDate.nth(0).value
    let expResult = utilFn.ConvertDate(departDate, '/')
    await t.expect(actResult).eql(expResult)

    await t.click(mainSearchPO.tfDate.nth(1))
    await mainSearchPF.SelectDate(returnDate)
    actResult = await mainSearchPO.tfDate.nth(1).value
    expResult = utilFn.ConvertDate(returnDate, '/')
    await t.expect(actResult).eql(expResult)
})

test('Test select total passengers', async t => {
    const passengers = utilFn.SetRandomNumber(1, 10);
    await t.expect(mainSearchPO.lbPassenger.textContent).eql('1')
    await mainSearchPF.SetTotalPassengers(passengers);
})