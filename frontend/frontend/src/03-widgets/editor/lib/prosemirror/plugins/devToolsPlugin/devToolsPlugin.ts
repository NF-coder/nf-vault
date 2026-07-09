import { EditorState, Plugin } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

export const createDevToolsPlugin = () => {
  let initialized = false;

  return new Plugin({
    view(view: EditorView) {
      let destroyDevTools: (() => void) | undefined;

      if (!initialized && process.env.NODE_ENV === "development") {
        initialized = true;
        destroyDevTools = (require("prosemirror-dev-tools").applyDevTools)(view);
      }

      return {
        destroy() {
          destroyDevTools?.();
        }
      };
    }
  });
};
