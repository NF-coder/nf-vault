package org.background.strategy;

import org.PreviewGenerationContext;
import org.background.BackgroundGenerationStrategy;
import org.background.config.ImageBackgroundGeneratorConfig;
import org.utils.image.ImageProvider;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;

public class ImageBackgroundStrategy extends BackgroundGenerationStrategy<ImageBackgroundGeneratorConfig> {
    private final ImageProvider imageProvider;

    public ImageBackgroundStrategy(ImageBackgroundGeneratorConfig config, ImageProvider imageProvider) {
        super(config);
        this.imageProvider = imageProvider;
    }

    @Override
    public void generate(PreviewGenerationContext context) {
        final Graphics2D imageGraphicsContext = context.imageGraphicsContext();
        final BufferedImage image;

        try {
            image = imageProvider.getImage(getConfig().backgroundImagePath());
        } catch (IOException e) {
            throw new RuntimeException("Unable to resolve image: ", e);
        }

        imageGraphicsContext.drawImage(
                image,
                0,
                0,
                context.canvasConfig().width(),
                context.canvasConfig().height(),
                null
        );
    }
}