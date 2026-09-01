package org.nfVault.search.services;

import lombok.extern.slf4j.Slf4j;
import org.nfVault.documents.models.Document;
import org.nfVault.documents.repository.DocumentRepository;
import org.nfVault.search.repository.DocumentSearchRepository;
import org.nfVault.search.repository.DocumentSearchRepository.DocumentIndexEntry;
import org.nfVault.search.repository.DocumentSearchRepository.DocumentSearchResult;
import org.nfVault.documents.events.DocumentChangedEvent;
import org.nfVault.documents.events.DocumentDeletedEvent;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import java.io.UncheckedIOException;
import java.util.List;

@Service
@Slf4j
public class DocumentSearchService implements ApplicationRunner {
    private static final String DOCUMENT_TYPE = "document";
    private static final int DEFAULT_LIMIT = 20;
    private static final int MAX_LIMIT = 100;

    private final DocumentRepository documentRepository;
    private final DocumentSearchRepository searchRepository;

    public DocumentSearchService(
            DocumentRepository documentRepository,
            DocumentSearchRepository searchRepository
    ) {
        this.documentRepository = documentRepository;
        this.searchRepository = searchRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public void run(ApplicationArguments args) {
        List<DocumentIndexEntry> documents = documentRepository
                .getSearchableDocuments()
                .stream()
                .map(this::toIndexEntry)
                .toList();
        searchRepository.rebuild(documents);
        log.info("Document search index rebuilt");
    }

    public List<DocumentSearchResult> search(String query, Integer limit) {
        return searchRepository.search(query, limit);
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void updateIndex(DocumentChangedEvent event) {
        try {
            if (DOCUMENT_TYPE.equals(event.type())) {
                searchRepository.upsert(new DocumentIndexEntry(
                        event.id(),
                        event.title(),
                        event.content()
                ));
            } else {
                searchRepository.delete(event.id());
            }
        } catch (UncheckedIOException exception) {
            log.error("Could not index document {}", event.id(), exception);
        }
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void deleteFromIndex(DocumentDeletedEvent event) {
        try {
            searchRepository.delete(event.id());
        } catch (UncheckedIOException exception) {
            log.error("Could not remove document {} from index", event.id(), exception);
        }
    }

    private DocumentIndexEntry toIndexEntry(Document document) {
        return new DocumentIndexEntry(
                document.getId(),
                document.getName(),
                document.getContent()
        );
    }
}
