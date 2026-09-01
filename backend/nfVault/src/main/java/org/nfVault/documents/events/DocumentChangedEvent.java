package org.nfVault.documents.events;

public record DocumentChangedEvent(
        Integer id,
        String type,
        String title,
        String content
) {}
