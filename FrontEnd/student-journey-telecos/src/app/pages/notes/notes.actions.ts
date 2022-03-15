import { Action } from '@ngrx/store';

export const SET_SUBJECT_LIST = '[NOTES] SET_SUBJECT_LIST';
export const SET_CODI_UPC = '[NOTES] SET_CODI_UPC';

export class SetSubjectList implements Action {
    readonly type = SET_SUBJECT_LIST;
    payload: {subjects: [{}]};
    constructor(subjects: [{}]) {
        this.payload = {subjects};
    }
}

export class SetCodiUPC implements Action {
    readonly type = SET_CODI_UPC;
    payload: {codiUPC: string};
    constructor(codiUPC: string) {
        this.payload = {codiUPC};
    }
}

export type actions = SetSubjectList | SetCodiUPC;