package com.debate.evaluator.controller;

import com.debate.evaluator.service.TranscriptionService;
import org.springframework.web.multipart.MultipartFile;

import com.debate.evaluator.dto.EvaluateRequest;
import com.debate.evaluator.model.DebateRecord;
import com.debate.evaluator.service.DebateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.debate.evaluator.service.FactCheckService;
import com.debate.evaluator.service.ReportService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/debates")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // Allow React Frontend
public class DebateController {

    private final DebateService debateService;
    private final FactCheckService factCheckService;
    private final ReportService reportService;
    private final TranscriptionService transcriptionService;

    // POST /api/debates/evaluate
    @PostMapping("/evaluate")
    public ResponseEntity<DebateRecord> evaluate(@Valid @RequestBody EvaluateRequest request) {
        DebateRecord savedRecord = debateService.evaluateAndSave(request);
        return ResponseEntity.ok(savedRecord);
    }

    // GET /api/debates/history?userId=123
    @GetMapping("/history")
    public ResponseEntity<List<DebateRecord>> getHistory(@RequestParam String userId) {
        return ResponseEntity.ok(debateService.getUserHistory(userId));
    }
    
    // POST /api/debates/transcribe
    @PostMapping(value = "/transcribe", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> transcribeAudio(@RequestParam("audio") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("No audio file provided");
        }
        String text = transcriptionService.transcribeAudio(file);
        return ResponseEntity.ok(text);
    }

    @GetMapping("/fact-check")
    public ResponseEntity<Object> checkClaim(@RequestParam String claim) {
        return ResponseEntity.ok(factCheckService.checkClaim(claim));
    }

    // PDF Download Endpoint
    @GetMapping("/{id}/download-report")
    public ResponseEntity<byte[]> downloadReport(@PathVariable String id) {
        try {
            byte[] pdfBytes = reportService.generateDebatePdf(id);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=debate_report_" + id + ".pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfBytes);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}