import { Action } from '@ngrx/store';

export const OPEN_MONTH_CALENDAR = '[Events] OPEN_MONTH_CALENDAR_VIEW';
export const CLOSE_MONTH_CALENDAR = '[Events] CLOSE_MONTH_CALENDAR_VIEW';
export const CHANGE_CURRENT_MONTH = '[Events] CHANGE_CURRENT_MONTH';
export const CHANGE_SELECTED_DAY = '[Events] CHANGE_SELECTED_DAY';

export class OpenMonthCalendar implements Action {
    readonly type = OPEN_MONTH_CALENDAR;
}
export class CloseMonthCalendar implements Action {
    readonly type = CLOSE_MONTH_CALENDAR;
}

export class ChangeCurrentMonth implements Action {
    readonly type = CHANGE_CURRENT_MONTH;
    payload: {currentMonth: string};
    constructor(currentMonth: string) {
        this.payload = {currentMonth};
    }
}

export class ChangeSelectedDay implements Action {
    readonly type = CHANGE_SELECTED_DAY;
    payload: {selectedDay: string};
    constructor(selectedDay: string) {
        this.payload = {selectedDay};
    }
}
export type actions = OpenMonthCalendar | CloseMonthCalendar | ChangeCurrentMonth | ChangeSelectedDay;
