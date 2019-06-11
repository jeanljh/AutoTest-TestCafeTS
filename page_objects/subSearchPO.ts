import { Selector } from "testcafe";

export class SubSearchPO {
    lbPerson = Selector('.price > span:last-child')
    lbLocation = Selector('.tick-box span')
    tfDate = Selector('input.hidden-xs')
    ddlTime = Selector('select.form-control')
    btnSwitch = Selector('.switch>i');
    lbPassenger = Selector('.inc-input')
    lbInfo = Selector('.text-right')
    btnSearch = Selector('.tick-btn-1')
}