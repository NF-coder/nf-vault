package org;

import java.awt.*;

public record PreviewGenerationContext(
        Graphics2D imageGraphicsContext,
        PreviewCanvasConfig canvasConfig
){}