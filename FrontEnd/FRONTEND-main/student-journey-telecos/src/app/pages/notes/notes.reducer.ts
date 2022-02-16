import { NotesState } from './notes.state';
import * as notesActions from './notes.actions';

const initialState: NotesState = {
    subjects: [{}],
    codiUPC: ''
};

export function notesReducer(notesState = initialState, action: notesActions.actions) {
    switch (action.type) {
        case notesActions.SET_SUBJECT_LIST:
            const {subjects} = action.payload;
            return {...notesState, subjects};
        case notesActions.SET_CODI_UPC:
            const {codiUPC} = action.payload;
            return {...notesState, codiUPC};
        default:
            return notesState;

    }
}