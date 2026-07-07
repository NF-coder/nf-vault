package org.nfVault.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.nfVault.models.Document;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class DocumentRepository {
    @PersistenceContext
    private EntityManager entityManager;

    public Optional<Document> getById(Integer id){
        return Optional.ofNullable(entityManager.find(Document.class, id));
    }

    public List<Document> getByParentId(Integer parentId) {
        if (parentId == null) {
            return entityManager
                    .createQuery(
                            """
                                SELECT document FROM Document document
                                WHERE document.parent IS NULL
                                ORDER BY document.type, document.name
                            """,
                            Document.class
                    )
                    .getResultList();
        }

        return entityManager
                .createQuery(
                        """
                            SELECT document FROM Document document
                            WHERE document.parent.id = :parentId
                            ORDER BY document.type, document.name
                        """,
                        Document.class
                )
                .setParameter("parentId", parentId)
                .getResultList();
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
