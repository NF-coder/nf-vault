package org.caption;

import java.awt.*;


public record CaptionGenerationConfig(
        String text,
        Font font,
        Color color,
        CaptionPosition position,
        Color backgroundColor,
        Padding boxPadding,
        Padding canvasPadding
) {}