package com.debate.evaluator.service;

import com.debate.evaluator.model.DebateRecord;
import com.debate.evaluator.repository.DebateRepository;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final DebateRepository debateRepository;

    public byte[] generateDebatePdf(String debateId) throws IOException {
        // Fetch the debate data
        DebateRecord debate = debateRepository.findById(debateId)
                .orElseThrow(() -> new RuntimeException("Debate not found"));

        // Create PDF in memory (ByteArrayOutputStream)
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Document document = new Document();
            PdfWriter.getInstance(document, out);

            document.open();

            // --- PDF CONTENT STARTS HERE ---

            // 1. Header
            Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20, Color.DARK_GRAY);
            Paragraph title = new Paragraph("AI Debate Evaluation", headerFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(new Paragraph("\n")); // Spacer

            // 2. Debate Details
            document.add(new Paragraph("Topic: " + debate.getTopic()));
            document.add(new Paragraph("Evaluated On: " + debate.getCreatedAt().toLocalDate()));
            document.add(new Paragraph("\n"));

            // 3. Scores Table
            PdfPTable table = new PdfPTable(3); // 3 Columns
            table.setWidthPercentage(100);
            table.setSpacingBefore(10f);

            // Table Headers
            addHeaderCell(table, "Metric");
            addHeaderCell(table, "Score / 100");
            addHeaderCell(table, "Verdict");

            // Table Rows
            addRow(table, "Clarity", debate.getResult().getClarityScore());
            addRow(table, "Logic", debate.getResult().getLogicScore());
            addRow(table, "Persuasion", debate.getResult().getPersuasionScore());

            document.add(table);

            // 4. AI Summary
            document.add(new Paragraph("\nAI Summary Analysis:", FontFactory.getFont(FontFactory.HELVETICA_BOLD)));
            document.add(new Paragraph(debate.getResult().getSummary()));

            // --- PDF CONTENT ENDS HERE ---

            document.close();
            return out.toByteArray();
        }
    }

    // Helper method to style Table Headers
    private void addHeaderCell(PdfPTable table, String text) {
        PdfPCell cell = new PdfPCell(new Phrase(text, FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, Color.WHITE)));
        cell.setBackgroundColor(Color.DARK_GRAY);
        cell.setPadding(8);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        table.addCell(cell);
    }

    // Helper method to add Data Rows
    private void addRow(PdfPTable table, String metric, int score) {
        table.addCell(metric);
        table.addCell(String.valueOf(score));
        
        String verdict = score > 80 ? "Excellent" : (score > 50 ? "Average" : "Needs Improvement");
        table.addCell(verdict);
    }
}