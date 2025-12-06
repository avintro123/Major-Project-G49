package com.debate.evaluator.repository;

import com.debate.evaluator.model.DebateRecord;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface DebateRepository extends MongoRepository<DebateRecord, String> {
    // Custom query to find history by user
    List<DebateRecord> findByUserIdOrderByCreatedAtDesc(String userId);
}