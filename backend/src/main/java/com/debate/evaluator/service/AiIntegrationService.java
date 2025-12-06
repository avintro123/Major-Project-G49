package com.debate.evaluator.service;

import com.debate.evaluator.model.DebateRecord.AnalysisResult;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class AiIntegrationService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestClient restClient = RestClient.create();
    private final ObjectMapper objectMapper = new ObjectMapper();

    // Gemini API URL
    private static final String GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=";

    public AnalysisResult analyzeDebate(String topic, String textA, String textB) {
        log.info("Calling Gemini AI for topic: {}", topic);

        // 1. Construct the Prompt (The most important part!)
        String prompt = String.format("""
            Act as a professional debate judge. Analyze the following debate on '%s'.
            
            Participant A: "%s"
            Participant B: "%s"
            
            Return ONLY a raw JSON object (no markdown, no extra text) with this exact structure:
            {
              "clarityScore": (0-100),
              "logicScore": (0-100),
              "persuasionScore": (0-100),
              "strengthsA": ["point 1", "point 2"],
              "weaknessesA": ["point 1", "point 2"],
              "strengthsB": ["point 1", "point 2"],
              "weaknessesB": ["point 1", "point 2"],
              "summary": "2 sentence summary of who won and why."
            }
            """, topic, textA, textB);

        // 2. Prepare Request Body (Gemini Specific Structure)
        var requestBody = Map.of(
            "contents", List.of(
                Map.of("parts", List.of(
                    Map.of("text", prompt)
                ))
            )
        );

        try {
            // 3. Make the HTTP Call
            String response = restClient.post()
                    .uri(GEMINI_URL + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(requestBody)
                    .retrieve()
                    .body(String.class);

            // 4. Parse the messy API response to extract your JSON
            JsonNode root = objectMapper.readTree(response);
            String aiText = root.path("candidates").get(0)
                                .path("content").path("parts").get(0)
                                .path("text").asText();

            // Clean up any markdown code blocks if the AI added them (```json ... ```)
            aiText = aiText.replaceAll("```json", "").replaceAll("```", "").trim();

            // 5. Convert to your Java Object
            return objectMapper.readValue(aiText, AnalysisResult.class);

        } catch (Exception e) {
            log.error("AI Analysis failed", e);
            // Fallback to mock data if AI fails (prevents app crash)
            return AnalysisResult.builder()
                    .summary("AI Service currently unavailable. Please try again.")
                    .build();
        }
    }
}