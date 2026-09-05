package org;

import org.background.BackgroundGenerationStrategy;
import org.background.BackgroundGeneratorConfig;
import org.background.BackgroundGeneratorFactory;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;

public class PreviewGenerator {
    private final static BackgroundGeneratorFactory backgroundGeneratorFactory = new BackgroundGeneratorFactory();
    private final BackgroundGenerationStrategy<?> backgroundGenerator;
    private final PreviewCanvasConfig canvasConfig;

    public PreviewGenerator(PreviewCanvasConfig canvasConfig, BackgroundGeneratorConfig backgroundConfig) {
        this.backgroundGenerator = PreviewGenerator.backgroundGeneratorFactory.create(
                backgroundConfig
        );
        this.canvasConfig = canvasConfig;
    }

    public CompletableFuture<Void> generate(ExecutorService executorService) {
        return CompletableFuture.supplyAsync(() -> {
            final BufferedImage image = new BufferedImage(
                    canvasConfig.width(),
                    canvasConfig.height(),
                    BufferedImage.TYPE_INT_RGB
            );
            final PreviewGenerationContext context = new PreviewGenerationContext(
                    image.createGraphics(),
                    canvasConfig
            );

            this.backgroundGenerator.generate(context);

            return null;
        }, executorService);
    }
}