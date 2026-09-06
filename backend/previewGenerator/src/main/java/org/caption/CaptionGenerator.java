package org.caption;

import org.PreviewGenerationContext;
import org.caption.utils.PositionCalc;

import java.awt.*;

public class CaptionGenerator {
    private final CaptionGenerationConfig config;

    public CaptionGenerator(CaptionGenerationConfig config) {
        this.config = config;
    }

    public void generate(PreviewGenerationContext context) {
        final Graphics2D imageGraphicsContext = context.imageGraphicsContext();

        imageGraphicsContext.setFont(config.font());
        imageGraphicsContext.setColor(config.color());

        final FontMetrics metrics = imageGraphicsContext.getFontMetrics();

        final int canvasWidth = context.canvasConfig().width();
        final int canvasHeight = context.canvasConfig().height();
        final int textWidth = metrics.stringWidth(config.text());
        final int textHeight = metrics.getHeight();

        final Point textStart = PositionCalc.calculatePosition(
                config.position(),
                canvasWidth,
                canvasHeight,
                textWidth,
                textHeight,
                metrics
        );

        imageGraphicsContext.drawString(
                config.text(),
                textStart.x,
                textStart.y
        );
    }
}