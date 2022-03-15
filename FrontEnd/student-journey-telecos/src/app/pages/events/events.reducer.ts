import * as eventsActions from './events.actions';
import { EventsState } from './events.state';
import { AppState } from 'src/app/app.state';
import * as moment from 'moment';

const initialState: EventsState = {
    isMonthCalendarOpened: false,
    currentMonth: moment().format('YYYY-MM'),
    selectedDay: moment().format('YYYY-MM-DD')
};

export function eventsReducer(eventsState = initialState, action: eventsActions.actions) {
    switch (action.type) {
        case eventsActions.OPEN_MONTH_CALENDAR:
            return {...eventsState, isMonthCalendarOpened: true};
        case eventsActions.CLOSE_MONTH_CALENDAR:
            return {...eventsState, isMonthCalendarOpened: false};
        case eventsActions.CHANGE_CURRENT_MONTH:
            const {currentMonth} = action.payload;
            return {...eventsState, currentMonth};
        case eventsActions.CHANGE_SELECTED_DAY:
            const {selectedDay} = action.payload;
            return {...eventsState, selectedDay};
        default:
            return eventsState;

    }
}
