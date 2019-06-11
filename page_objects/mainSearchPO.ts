import { Selector } from "testcafe"

export class MainSearchPO {
    tfRoute = Selector('tick-search .form-control')
    lbRouteSuggest = Selector('li.ng-star-inserted')
    lbPassenger = Selector('.search-form .inc-input')
    btnMinusPassenger = Selector('.search-form .button:first-child')
    btnAddPassenger = Selector('.search-form .button:last-child')
    tfDate = Selector('.search-form input.hidden-sm')
    btnPrevMonth = Selector('.datepicker-days .prev')
    btnNextMonth = Selector('.datepicker-days .next')
    lbMonthYear = Selector('.datepicker-days .datepicker-switch');
    lbDay = Selector("td[class='day']");
    btnSearch = Selector('.search-form .tick-btn-1')
}