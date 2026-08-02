import { WidgetType } from "@uiw/react-codemirror";
import type { EditorView } from "@uiw/react-codemirror";
import { createImageControls, createImageResize } from "@/04-features/edit-image";

type MarkdownImageWidgetConfig = {
  source: string;
  alt: string;
  title: string | null;
  width: number | null;
  imageFrom: number;
  imageTo: number;
  decorationTo: number;
};

export class MarkdownImageWidget extends WidgetType {
  private destroyInteractions: (() => void) | null = null;

  constructor(private readonly config: MarkdownImageWidgetConfig) {
    super();
  }

  eq(other: MarkdownImageWidget) {
    return this.config.source === other.config.source
      && this.config.alt === other.config.alt
      && this.config.title === other.config.title
      && this.config.width === other.config.width
      && this.config.imageFrom === other.config.imageFrom
      && this.config.imageTo === other.config.imageTo
      && this.config.decorationTo === other.config.decorationTo;
  }

  toDOM(view: EditorView): HTMLElement {
    const container = document.createElement("span");
    const frame = document.createElement("span");
    const image = this.createImage();
    const resizeHandle = this.createResizeHandle();
    const { controls } = createImageControls({
      onSource: () => this.showSource(view)
    });

    container.className = "cm-markdown-image-widget";
    frame.className = "cm-markdown-image-frame";
    frame.append(image, resizeHandle, controls);
    container.append(frame);

    if (this.config.width !== null) {
      frame.style.width = `${this.config.width}%`;
      image.style.width = "100%";
    }

    const resize = createImageResize({
      view,
      container,
      frame,
      image,
      handle: resizeHandle,
      controls,
      imageTo: this.config.imageTo,
      decorationTo: this.config.decorationTo,
      initialWidth: this.config.width
    });

    image.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      resize.activate();
    });
    image.addEventListener("dblclick", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.showSource(view);
    });

    this.destroyInteractions = resize.destroy;
    return container;
  }

  ignoreEvent(): boolean {
    return true;
  }

  destroy(): void {
    this.destroyInteractions?.();
    this.destroyInteractions = null;
  }

  private createImage() {
    const image = document.createElement("img");

    image.className = "cm-markdown-image";
    image.src = this.config.source;
    image.alt = this.config.alt;
    image.loading = "lazy";

    if (this.config.title) image.title = this.config.title;

    return image;
  }

  private createResizeHandle() {
    const handle = document.createElement("button");
    
    handle.className = "cm-markdown-image-resize-handle";
    handle.type = "button";
    handle.title = "Resize image";
    handle.setAttribute("aria-label", "Resize image");
    handle.hidden = true;

    return handle;
  }

  private showSource(view: EditorView) {
    view.dispatch({
      selection: {
        anchor: this.config.imageFrom,
        head: this.config.decorationTo
      },
      scrollIntoView: true
    });
    view.focus();
  }
}