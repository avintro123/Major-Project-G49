package com.debate.evaluator.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@Document(collection = "debates")
public class DebateRecord {
    
    @Id
    private String id;
    
    private String userId; // From Firebase
    private String topic;
    private String participantA;
    private String participantB;
    
    private AnalysisResult result; // Embedded AI analysis
    
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    // Nested class for the AI output to keep things encapsulated
    @Data
    @Builder
    public static class AnalysisResult {
        private int clarityScore;
        private int logicScore;
        private int persuasionScore;
        private List<String> strengthsA;
        private List<String> weaknessesA;
        private List<String> strengthsB;
        private List<String> weaknessesB;
        private String summary;
    }
}