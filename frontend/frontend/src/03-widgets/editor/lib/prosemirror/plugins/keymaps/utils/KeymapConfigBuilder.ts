import { Plugin, Command } from "prosemirror-state";
import { keymap } from "prosemirror-keymap";

export type KeymapConfigObj = {
    [key: string]: Command
}

class KeymapPluginBuilder {
    private config: KeymapConfigObj;

    constructor() {
        this.config = {}
    }

    public addKeymap(keymap: KeymapConfigObj){
        this.config = {...this.config, ...keymap};
        return this;
    }

    public build(): Plugin<any> {
        return keymap(this.config);
    }
}

export default KeymapPluginBuilder;