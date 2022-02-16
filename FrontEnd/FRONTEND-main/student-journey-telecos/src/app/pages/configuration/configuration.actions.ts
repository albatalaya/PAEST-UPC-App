import { Action } from '@ngrx/store';

export const SHOW_EVENTS_IN_HOME = '[Configuration] SHOW_EVENTS_IN_HOME';
export const HIDE_EVENTS_IN_HOME = '[Configuration] HIDE_EVENTS_IN_HOME';

export class ShowEventsInHome implements Action {
      readonly type = SHOW_EVENTS_IN_HOME;
      payload: {isEventsInHome: boolean};
      constructor(isEventsInHome: boolean) {
            this.payload = {isEventsInHome};
      }
}


export class HideEventsInHome implements Action {
      readonly type = HIDE_EVENTS_IN_HOME;
      payload: {isEventsInHome: boolean};
      constructor(isEventsInHome: boolean) {
            this.payload = {isEventsInHome};
      }
}

export type actions = HideEventsInHome | ShowEventsInHome;
