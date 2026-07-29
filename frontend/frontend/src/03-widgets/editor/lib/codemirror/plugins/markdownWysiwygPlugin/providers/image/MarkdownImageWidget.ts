import { WidgetType } from "@uiw/react-codemirror";

export class MarkdownImageWidget extends WidgetType {
  constructor(
    private readonly source: string,
    private readonly alt: string,
    private readonly title: string | null
  ) {
    super();
  }

  eq(other: MarkdownImageWidget) {
    return this.source === other.source
      && this.alt === other.alt
      && this.title === other.title;
  }

  toDOM(): HTMLImageElement {
    const image = document.createElement("img");
    image.className = "cm-markdown-image";
    image.src = this.source;
    image.alt = this.alt;
    image.loading = "lazy";

    if (this.title) {
      image.title = this.title;
    }

    return image;
  }

  ignoreEvent(): boolean {
    return false;
  }
}