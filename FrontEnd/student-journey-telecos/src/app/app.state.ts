import { EventsState } from './pages/events/events.state';
import { ConfigurationState } from './pages/configuration/configuration.state';
import { NotesState } from './pages/notes/notes.state';

export interface AppState {
    isShownTabBar: boolean;
    language: string;
    notification: any;
    tokenFireBase: string;
    events: EventsState;
    notes: NotesState;
    student: any;
    configuration: ConfigurationState;
}
