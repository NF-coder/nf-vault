import { EditorState, Plugin, Transaction } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";

export const placeholderPlugin = (text: string) => {
  return new Plugin({
    props: {
      decorations(state: EditorState) {
        const doc = state.doc;
        
        if (
          doc.childCount === 1 && 
          doc.firstChild?.isTextblock && 
          doc.firstChild?.content.size === 0 &&
          state.selection.from === 1
        ) {
          const placeholder = document.createElement("span");
          placeholder.textContent = text;
          placeholder.className = "prosemirror-placeholder";
          placeholder.style.cssText = `
            color: #999;
            pointer-events: none;
            user-select: none;
          `;
          
          return DecorationSet.create(doc, [
            Decoration.widget(1, placeholder, {
              key: "placeholder"
            })
          ]);
        }
        return null;
      }
    }
  });
};

export default placeholderPlugin;