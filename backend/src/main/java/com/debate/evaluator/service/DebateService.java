package com.debate.evaluator.service;

import com.debate.evaluator.dto.EvaluateRequest;
import com.debate.evaluator.model.DebateRecord;
import com.debate.evaluator.repository.DebateRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Slf4j
@RequiredArgsConstructor
public class DebateService {

    private final DebateRepository debateRepository;
    private final AiIntegrationService aiService;

    /**
     * Main Business Logic:
     * 1. Send text to AI "Brain".
     * 2. Wrap result in a Database Record.
     * 3. Save to MongoDB "Memory".
     */
    public DebateRecord evaluateAndSave(EvaluateRequest request) {
        log.info("Starting evaluation for topic: {}", request.getTopic());

        // Step 1: Get Analysis from AI
        var analysis = aiService.analyzeDebate(
                request.getTopic(), 
                request.getTextA(), 
                request.getTextB()
        );

        // Step 2: Create Record
        DebateRecord record = DebateRecord.builder()
                .userId(request.getUserId())
                .topic(request.getTopic())
                .participantA(request.getTextA())
                .participantB(request.getTextB())
                .result(analysis)
                .build();

        // Step 3: Save and Return
        return debateRepository.save(record);
    }

    public List<DebateRecord> getUserHistory(String userId) {
        return debateRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public DebateRecord getDebateById(String id) {
        return debateRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Debate not found with ID: " + id));
    }
}