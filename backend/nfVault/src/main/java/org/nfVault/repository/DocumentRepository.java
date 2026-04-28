package org.nfVault.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.nfVault.models.Document;
import org.nfVault.models.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class DocumentRepository {
    @PersistenceContext
    private EntityManager entityManager;

    public Optional<Document> getById(Integer id){
        return Optional.ofNullable(entityManager.find(Document.class, id));
    }

    public void update(Document document){
        entityManager.merge(document);
    }

    public void create(Document document){
        entityManager.persist(document);
    }

    public void delete(Document document) {
        entityManager.remove(document);
    }
}
