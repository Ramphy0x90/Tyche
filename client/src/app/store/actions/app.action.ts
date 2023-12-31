import { createActionGroup, emptyProps } from "@ngrx/store";
import { StoreSources } from "../store.module";

export enum AppActionEvents {
    ON_VIEW = "onView",
    ON_CREATE = "onCreate",
    ON_EDIT = "onEdit",
    ON_DELETE = "onDelete"
};

export const app = createActionGroup({
    source: StoreSources.APP,
    events: {
        [AppActionEvents.ON_VIEW]: emptyProps(),
        [AppActionEvents.ON_CREATE]: emptyProps(),
        [AppActionEvents.ON_EDIT]: emptyProps(),
        [AppActionEvents.ON_DELETE]: emptyProps()
    }
})