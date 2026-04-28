package org.nfVault.services;

import jakarta.transaction.Transactional;
import org.nfVault.exceptions.NotFoundException;
import org.nfVault.models.Document;
import org.nfVault.repository.DocumentRepository;
import org.springframework.stereotype.Service;

@Service
public class DocumentService {
    private final DocumentRepository documentRepository;

    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public Integer createDocument(String title, String type) {
        Document document = Document.builder()
                .name(title)
                .type(type)
                .build();
        documentRepository.create(document);
        return document.getId();
    }

    public Document getDocumentById(Integer id) {
        return documentRepository.getById(id)
                .orElseThrow(() -> new NotFoundException("Document not found"));
    }

    @Transactional
    public void updateDocumentById(Integer id, String name, String content) {
        Document document = documentRepository.getById(id)
                .orElseThrow(() -> new NotFoundException("Document not found"));

        if (name != null) {
            document.setName(name);
        }
        if (content != null) {
            document.setContent(content);
        }
    }

    @Transactional
    public void deleteDocumentById(Integer id) {
        Document document = documentRepository.getById(id)
                .orElseThrow(() -> new NotFoundException("Document not found"));
        documentRepository.delete(document);
    }
}
