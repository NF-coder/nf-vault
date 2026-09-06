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

        final int textWidth = metrics.stringWidth(config.text());
        final int textHeight = metrics.getHeight();

        final int boxWidth = textWidth + config.boxPadding().left() + config.boxPadding().right();
        final int boxHeight = textHeight + config.boxPadding().top() + config.boxPadding().bottom();

        final Point boxPosition = PositionCalc.calculatePosition(
                config.position(),
                context.canvasConfig().width(),
                context.canvasConfig().height(),
                boxWidth,
                boxHeight,
                config.canvasPadding()
        );

        // Background
        imageGraphicsContext.setColor(config.backgroundColor());
        imageGraphicsContext.fillRoundRect(
                boxPosition.x,
                boxPosition.y,
                boxWidth,
                boxHeight,
                config.borderRadius(),
                config.borderRadius()
        );

        // Text
        imageGraphicsContext.setColor(config.color());
        final int textX = boxPosition.x + config.boxPadding().left();
        final int textY = boxPosition.y + config.boxPadding().top() + metrics.getAscent();

        imageGraphicsContext.drawString(
                config.text(),
                textX,
                textY
        );
    }
}