import { createReducer, on } from "@ngrx/store";
import { AppActionEvents, app } from "../actions/app.action";

export interface AppState {
    mode: AppActionEvents
}

export interface AppStateMode {
    onView: boolean,
    onCreate: boolean,
    onEdit: boolean,
    onDelete: boolean
}

export const appState: AppState = {
    mode: AppActionEvents.ON_VIEW
}

export const appReducer = createReducer(
    appState,
    on(app.onView, state => ({ ...state, mode: AppActionEvents.ON_VIEW })),
    on(app.onCreate, state => ({ ...state, mode: AppActionEvents.ON_CREATE })),
    on(app.onEdit, state => ({ ...state, mode: AppActionEvents.ON_EDIT })),
    on(app.onDelete, state => ({ ...state, mode: AppActionEvents.ON_DELETE }))
);