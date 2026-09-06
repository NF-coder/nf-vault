package org;

import org.background.BackgroundGenerationStrategy;
import org.background.BackgroundGeneratorConfig;
import org.background.BackgroundGeneratorFactory;
import org.caption.CaptionGenerationConfig;
import org.caption.CaptionGenerator;

import java.awt.image.BufferedImage;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;

public class PreviewGenerator {
    private final static BackgroundGeneratorFactory backgroundGeneratorFactory = new BackgroundGeneratorFactory();
    private final BackgroundGenerationStrategy<?> backgroundGenerator;
    private final CaptionGenerator captionGenerator;
    private final PreviewCanvasConfig canvasConfig;

    public PreviewGenerator(
            PreviewCanvasConfig canvasConfig,
            BackgroundGeneratorConfig backgroundConfig,
            CaptionGenerationConfig captionConfig
    ) {
        this.backgroundGenerator = PreviewGenerator.backgroundGeneratorFactory.create(
                backgroundConfig
        );
        this.captionGenerator = new CaptionGenerator(captionConfig);
        this.canvasConfig = canvasConfig;
    }

    public CompletableFuture<BufferedImage> generate(ExecutorService executorService) {
        return CompletableFuture.supplyAsync(() -> {
            final BufferedImage image = new BufferedImage(
                    canvasConfig.width(),
                    canvasConfig.height(),
                    BufferedImage.TYPE_INT_RGB
            );

            try (final PreviewGenerationContext context = new PreviewGenerationContext(
                    image.createGraphics(),
                    canvasConfig
            )) {
                this.backgroundGenerator.generate(context);
                this.captionGenerator.generate(context);
            } catch (Exception e) {
                throw new RuntimeException("Unable to generate preview: ", e);
            }

            return image;
        }, executorService);
    }
}