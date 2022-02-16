import * as appActions from './app.actions';
import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { eventsReducer } from './pages/events/events.reducer';
import { notesReducer } from './pages/notes/notes.reducer';
import { configurationReducer } from './pages/configuration/configuration.reducer';

export function tokenFireBaseReducer(state, action: appActions.actions) {
    switch (action.type) {
        case appActions.SET_TOKEN_FIRE_BASE:
            const tokenFireBase = action.payload;
            return tokenFireBase;
        default:
            return state;
    }
}

export function languageReducer(state, action: appActions.actions) {

    switch (action.type) {
        case appActions.SET_LANGUAGE_CATALAN:
            state = 'ca';
            return state;

        case appActions.SET_LANGUAGE_SPANISH:
            state = 'es';
            return state;

        case appActions.SET_LANGUAGE_ENGLISH:
            state = 'en';
            return state;

        default:
            return state;
    }

}

export function notificationReducer(state, action: appActions.actions) {
    switch (action.type) {
        case appActions.SET_NOTIFICATION:
            const notification = action.payload;
            return notification;
        default:
            return state;
    }
}

export function studentReducer(state, action: appActions.actions) {
    switch (action.type) {
        case appActions.SET_STUDENT:
            const student = action.payload;
            return student;
        default:
            return state;
    }
}

export function tabBarReducer(state, action: appActions.actions) {
    switch(action.type) {
        case appActions.SHOW_TABBAR:
            state = true;
            return state;
        case appActions.HIDE_TABBAR:
            state = false;
            return state;
    }
}

export const appReducers: ActionReducerMap<AppState> = {
    isShownTabBar: tabBarReducer,
    language: languageReducer,
    events: eventsReducer,
    notes: notesReducer,
    student: studentReducer,
    tokenFireBase: tokenFireBaseReducer,
    configuration: configurationReducer,
    notification: notificationReducer,
};
