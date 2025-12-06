package com.debate.evaluator.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Collections;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class FactCheckService {

    // We use RestTemplate for simple external API calls
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${google.api.key}")
    private String googleApiKey;

    private static final String GOOGLE_FACT_CHECK_URL = "https://factchecktools.googleapis.com/v1alpha1/claims:search";

    public Object checkClaim(String claim) {
        log.info("Fact checking claim: {}", claim);
        
        // Build the URL safely with query parameters
        String url = UriComponentsBuilder.fromUriString(GOOGLE_FACT_CHECK_URL)
                .queryParam("query", claim)
                .queryParam("key", googleApiKey)
                .queryParam("languageCode", "en")
                .toUriString();

        try {
            // Requesting a raw Map allows us to return Google's exact JSON structure
            // without creating complex Java classes for every field they return.
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            
            if (response != null && response.containsKey("claims")) {
                return response.get("claims");
            } else {
                return Collections.singletonList(Map.of("message", "No specific fact checks found for this claim."));
            }
        } catch (Exception e) {
            log.error("Fact Check API failed", e);
            return Collections.singletonMap("error", "Unable to verify claim at this time.");
        }
    }
}