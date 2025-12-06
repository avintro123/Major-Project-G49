package com.debate.evaluator.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EvaluateRequest {
    @NotBlank(message = "Topic is required")
    private String topic;
    
    @NotBlank(message = "Participant A text is required")
    private String textA;
    
    @NotBlank(message = "Participant B text is required")
    private String textB;
    
    private String userId; // Optional, if user is logged in
}