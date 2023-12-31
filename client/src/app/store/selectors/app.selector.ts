import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../reducers/app.reducer";
import { AppActionEvents } from "../actions/app.action";

export const selectAppState = createFeatureSelector<AppState>("app");
export const selectAppMode = createSelector(
    selectAppState,
    (state: AppState) => {
        return {
            onView: state.mode == AppActionEvents.ON_VIEW,
            onCreate: state.mode == AppActionEvents.ON_CREATE,
            onEdit: state.mode == AppActionEvents.ON_EDIT,
            onDelete: state.mode == AppActionEvents.ON_DELETE
        }
    }
);