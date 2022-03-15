import { Action } from '@ngrx/store';

export const SET_LANGUAGE_SPANISH = '[Configuration] SET_LANGUAGE_SPANISH';
export const SET_LANGUAGE_CATALAN = '[Configuration] SET_LANGUAGE_CATALAN';
export const SET_LANGUAGE_ENGLISH = '[Configuration] SET_LANGUAGE_ENGLISH';
export const SET_NOTIFICATION = '[Notification] SET_NOTIFICATION';
export const SET_STUDENT = '[Student] SET_STUDENT';
export const SET_TOKEN_FIRE_BASE = '[TokenFireBase] SET_STUDENT';
export const SHOW_TABBAR = '[TabBar] SHOW_TABBAR';
export const HIDE_TABBAR = '[TabBar] HIDE_TABBAR';

export class SetLanguageSpanishAction implements Action {
    readonly type = SET_LANGUAGE_SPANISH;
}

export class SetLanguageCatalanAction implements Action {
    readonly type = SET_LANGUAGE_CATALAN;
}

export class SetLanguageEnglishAction implements Action {
    readonly type = SET_LANGUAGE_ENGLISH;
}

export class SetStudent implements Action {
    readonly type = SET_STUDENT;
    payload: any;
    constructor(studentData: any) {
        this.payload = studentData;
    }
}

export class SetTokenFireBase implements Action {
    readonly type = SET_TOKEN_FIRE_BASE;
    payload: string;
    constructor(token: string) {
        this.payload = token;
    }
}

export class SetNotification implements Action {
    readonly type = SET_NOTIFICATION;
    payload: any;
    constructor(notification: any) {
        this.payload = notification;
    }
}

export class ShowTabBar implements Action {
    readonly type = SHOW_TABBAR;
}

export class HideTabBar implements Action {
    readonly type = HIDE_TABBAR;
}
export type actions = SetLanguageSpanishAction | SetLanguageCatalanAction | SetLanguageEnglishAction | SetNotification | SetStudent | SetTokenFireBase | ShowTabBar | HideTabBar;
