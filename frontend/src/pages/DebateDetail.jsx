import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Download, RotateCcw } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import Evaluation from "./Evaluation"; // Reusing the Evaluation component for simplicity

export default function DebateDetail() {
  const { id } = useParams();

  // In a real app, fetch debate details by ID
  // For now, we'll wrap the Evaluation component with some history-specific context

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <Link to="/history">
          <Button variant="ghost" className="gap-2 pl-0 hover:pl-2 transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to History
          </Button>
        </Link>
        <div className="flex gap-2">
           <Button variant="outline" size="sm" className="gap-2">
            <RotateCcw className="w-4 h-4" /> Re-evaluate
          </Button>
        </div>
      </div>
      
      {/* Reusing Evaluation layout but injecting specific data would be better */}
      {/* For this MVP, we render the Evaluation component directly to simulate viewing a report */}
      <Evaluation />
    </div>
  );
}
