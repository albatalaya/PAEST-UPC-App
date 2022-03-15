import * as configurationsActions from './configuration.actions';
import { ConfigurationState } from './configuration.state';

const initialState: ConfigurationState = {
      isEventsInHome: true
};

export function configurationReducer(configurationState = initialState, action: configurationsActions.actions) {
      switch (action.type) {
            case configurationsActions.SHOW_EVENTS_IN_HOME:
                  return {...configurationState, isEventsInHome: true};
            case configurationsActions.HIDE_EVENTS_IN_HOME:
                  return {...configurationState, isEventsInHome: false};
      default:
            return configurationState;
      }
}
