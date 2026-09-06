package org.caption.utils;

import org.caption.CaptionPosition;

import java.awt.*;

public class PositionCalc {
    public static Point calculatePosition(
            CaptionPosition position,
            int canvasWidth,
            int canvasHeight,
            int textWidth,
            int textHeight,
            FontMetrics metrics
    ) {
        return switch (position) {
            case TOP_LEFT -> new Point(0, metrics.getAscent());
            case TOP_CENTER -> new Point((canvasWidth - textWidth) / 2, metrics.getAscent());
            case TOP_RIGHT -> new Point(canvasWidth - textWidth, metrics.getAscent());

            case CENTER_LEFT -> new Point(0, (canvasHeight - textHeight) / 2 + metrics.getAscent());
            case CENTER_CENTER -> new Point(
                    (canvasWidth - textWidth) / 2,
                    (canvasHeight - textHeight) / 2 + metrics.getAscent()
            );
            case CENTER_RIGHT -> new Point(
                    canvasWidth - textWidth,
                    (canvasHeight - textHeight) / 2 + metrics.getAscent()
            );

            case BOTTOM_LEFT -> new Point(0, canvasHeight - metrics.getDescent());
            case BOTTOM_CENTER -> new Point((canvasWidth - textWidth) / 2, canvasHeight - metrics.getDescent());
            case BOTTOM_RIGHT -> new Point(canvasWidth - textWidth, canvasHeight - metrics.getDescent());
        };
    }
}
