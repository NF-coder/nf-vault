package org.nfVault.services;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.nfVault.exceptions.ConflictException;
import org.nfVault.exceptions.NotFoundException;
import org.nfVault.models.Document;
import org.nfVault.repository.DocumentRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@Slf4j
public class DocumentService {
    private final DocumentRepository documentRepository;

    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    @Transactional
    public Integer createDocument(String title, String type, Integer parentId) {
        Document parent = null;
        if (parentId != null) {
            parent = getDocumentById(parentId);
            if (!"directory".equals(parent.getType())) {
                throw new NotFoundException("Parent directory not found");
            }
        }

        final boolean isUnique = documentRepository.getByParentId(parentId).stream()
                .map(Document::getName)
                .noneMatch(otherDocumentTitle -> otherDocumentTitle.equals(title));
        if (!isUnique) {
            throw new ConflictException("Document with same title already exists");
        }

        Document document = Document.builder()
                .name(title)
                .type(type)
                .content("")
                .parent(parent)
                .build();
        documentRepository.create(document);

        log.warn("Created document {}", document);
        return document.getId();
    }

    public Document getDocumentById(Integer id) {
        return documentRepository.getById(id)
                .orElseThrow(() -> new NotFoundException("Document not found"));
    }

    public List<Document> getDocumentsByParentId(Integer parentId) {
        return documentRepository.getByParentId(parentId);
    }

    public List<Document> getDocumentPath(Integer documentId) {
        if (documentId == null) {
            return List.of();
        }

        List<Document> path = new ArrayList<>();
        Document current = getDocumentById(documentId);
        while (current != null) {
            path.add(current);
            current = current.getParent();
        }

        Collections.reverse(path);
        return path;
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
        documentRepository.getByParentId(id)
                .forEach(child -> deleteDocumentById(child.getId()));
        documentRepository.delete(document);
    }
}
