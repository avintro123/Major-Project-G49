package com.debate.evaluator.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class TranscriptionService {

    @Value("${openai.api.key}")
    private String openAiApiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    
    // URL for OpenAI Whisper (or Groq/compatible APIs)
    private static final String WHISPER_URL = "https://api.openai.com/v1/audio/transcriptions";

    public String transcribeAudio(MultipartFile file) {
        log.info("Transcribing audio file: {}", file.getOriginalFilename());

        try {
            // 1. Set Headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);
            headers.setBearerAuth(openAiApiKey);

            // 2. Prepare Body (File + Model Name)
            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            
            // We must convert MultipartFile to a Resource for RestTemplate
            ByteArrayResource fileResource = new ByteArrayResource(file.getBytes()) {
                @Override
                public String getFilename() {
                    // OpenAI requires a filename with extension (e.g., audio.webm)
                    return file.getOriginalFilename();
                }
            };
            
            body.add("file", fileResource);
            body.add("model", "whisper-1"); // The AI Model name

            // 3. Send Request
            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
            
            ResponseEntity<Map> response = restTemplate.postForEntity(WHISPER_URL, requestEntity, Map.class);

            // 4. Extract Text
            if (response.getBody() != null && response.getBody().containsKey("text")) {
                return response.getBody().get("text").toString();
            }
            
            return "Error: No text returned from API";

        } catch (IOException e) {
            log.error("File processing failed", e);
            throw new RuntimeException("Failed to process audio file");
        } catch (Exception e) {
            log.error("Transcription API failed", e);
            return "Error: Transcription failed. Please check API Key.";
        }
    }
}