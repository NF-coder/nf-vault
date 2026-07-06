package org.nfVault.controllers;

import jakarta.validation.Valid;
import org.nfVault.controllers.DTO.*;
import org.nfVault.models.Document;
import org.nfVault.services.DocumentService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/document")
public class DocumentController {
    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @GetMapping("/{docId}")
    @PreAuthorize("permitAll()")
    public GetDocumentResponse getDocumentById(
            @PathVariable("docId") final Integer id
    ) {
        final Document document = documentService.getDocumentById(id);
        return new GetDocumentResponse(
                document.getId(),
                document.getType(),
                document.getName(),
                document.getContent()
        );
    }

    @PutMapping("/{docId}/content")
    public void putDocumentContent(
            @PathVariable("docId") final String id,
            @Valid @RequestBody final PutDocumentContentRequest contentObject
    ) {
        documentService.updateDocumentById(
                Integer.parseInt(id),
                null,
                contentObject.getContent()
        );
    }

    @PutMapping("/{docId}/title")
    public void putDocumentTitle(
            @PathVariable("docId") final String id,
            @Valid @RequestBody final PutDocumentTitleRequest titleObject
    ) {
        documentService.updateDocumentById(
                Integer.parseInt(id),
                titleObject.getTitle(),
                null
        );
    }

    @DeleteMapping("/{docId}")
    public void deleteDocumentById(
            @PathVariable("docId") final String id
    ) {
        documentService.deleteDocumentById(Integer.parseInt(id));
    }

    @PatchMapping("/{docId}")
    public void updateDocumentById(
            @PathVariable("docId") final Integer id,
            @Valid @RequestBody final UpdateDocumentRequest request
    ) {
        documentService.updateDocumentById(
                id,
                request.getName(),
                request.getContent()
        );
    }

    @PostMapping("/create")
    public CreateDocumentResponse createDocument(
            @RequestBody @Valid final CreateDocumentRequest request
    ) {
        Integer documentId = documentService.createDocument(
                request.getName(),
                request.getType()
        );
        return new CreateDocumentResponse(
                documentId
        );
    }
}
