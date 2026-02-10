import { EditorState, Plugin } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

export const createDevToolsPlugin = () => {
  let initialized = false;

  return new Plugin({
    view(view: EditorView) {
      if (!initialized && process.env.NODE_ENV === "development") {
        initialized = true;
        (require("prosemirror-dev-tools").applyDevTools)(view);
      }
      return {};
    }
  });
};
