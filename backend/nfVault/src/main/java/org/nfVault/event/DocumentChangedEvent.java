package org.nfVault.event;

public record DocumentChangedEvent(
        Integer id,
        String type,
        String title,
        String content
) {}
