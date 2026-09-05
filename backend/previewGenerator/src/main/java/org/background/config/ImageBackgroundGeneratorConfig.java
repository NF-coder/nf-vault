package org.background.config;

import org.background.BackgroundGeneratorConfig;
import org.background.BackgroundType;

import java.nio.file.Path;

public record ImageBackgroundGeneratorConfig(Path backgroundImagePath) implements BackgroundGeneratorConfig {
    @Override
    public BackgroundType getType() {
        return BackgroundType.IMAGE;
    }
}