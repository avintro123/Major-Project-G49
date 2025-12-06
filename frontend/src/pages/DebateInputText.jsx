import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRightLeft,
  Trash2,
  FileText,
  ArrowRight,
  AlertCircle,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";

const MAX_WORDS = 600;

export default function DebateInputText() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [participantA, setParticipantA] = useState("");
  const [participantB, setParticipantB] = useState("");
  const [errors, setErrors] = useState({});

  // Load from local storage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("debateDraft");
    if (savedData) {
      const { topic, participantA, participantB } = JSON.parse(savedData);
      setTopic(topic || "");
      setParticipantA(participantA || "");
      setParticipantB(participantB || "");
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem(
      "debateDraft",
      JSON.stringify({ topic, participantA, participantB })
    );
  }, [topic, participantA, participantB]);

  const countWords = (text) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0).length;
  };

  const handleSwap = () => {
    setParticipantA(participantB);
    setParticipantB(participantA);
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all fields?")) {
      setTopic("");
      setParticipantA("");
      setParticipantB("");
      localStorage.removeItem("debateDraft");
    }
  };

  const handleLoadSample = () => {
    setTopic("Is AI beneficial for society?");
    setParticipantA(
      "Artificial Intelligence drives innovation in healthcare, transportation, and education. It automates mundane tasks, allowing humans to focus on creativity and complex problem-solving. For example, AI in medical imaging detects diseases earlier than human doctors."
    );
    setParticipantB(
      "While AI has benefits, it poses significant risks such as job displacement and privacy violations. The reliance on algorithms can perpetuate bias and reduce human agency. Moreover, the lack of regulation in AI development could lead to unintended catastrophic consequences."
    );
  };

  const validate = () => {
    const newErrors = {};
    if (!topic.trim()) newErrors.topic = "Topic is required";
    if (!participantA.trim()) newErrors.participantA = "Argument is required";
    if (!participantB.trim()) newErrors.participantB = "Argument is required";

    if (countWords(participantA) > MAX_WORDS)
      newErrors.participantA = `Max ${MAX_WORDS} words`;
    if (countWords(participantB) > MAX_WORDS)
      newErrors.participantB = `Max ${MAX_WORDS} words`;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("Submitting debate:", { topic, participantA, participantB });
      navigate("/evaluation");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 pt-24 max-w-6xl relative">
      {/* Background Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-neon-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <Link
              to="/"
              className="text-sm text-gray-400 hover:text-white flex items-center gap-2 mb-3 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
              New Text Debate
            </h1>
            <p className="text-gray-400 mt-2">
              Enter the topic and arguments for both sides.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLoadSample}
              className="gap-2"
            >
              <FileText className="w-4 h-4" />
              Load Sample
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </Button>
          </div>
        </div>

        <Card className="mb-8 border-neon-blue/20 shadow-lg shadow-neon-blue/5">
          <CardContent className="pt-6">
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Debate Topic
            </label>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Is AI beneficial for society?"
              className={cn(
                "text-lg h-14 bg-black/40",
                errors.topic && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {errors.topic && (
              <p className="text-red-500 text-sm mt-2 flex items-center animate-fade-in-up">
                <AlertCircle className="w-4 h-4 mr-1" /> {errors.topic}
              </p>
            )}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-8 relative">
          {/* Swap Button (Absolute centered on desktop) */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full w-12 h-12 border border-white/20 shadow-xl hover:scale-110 hover:rotate-180 transition-all duration-500 bg-cosmic-800"
              onClick={handleSwap}
              title="Swap Arguments"
            >
              <ArrowRightLeft className="w-5 h-5 text-neon-blue" />
            </Button>
          </div>

          {/* Participant A */}
          <ArgumentInput
            label="Participant A (Pro)"
            value={participantA}
            onChange={setParticipantA}
            error={errors.participantA}
            wordCount={countWords(participantA)}
            color="blue"
          />

          {/* Participant B */}
          <ArgumentInput
            label="Participant B (Con)"
            value={participantB}
            onChange={setParticipantB}
            error={errors.participantB}
            wordCount={countWords(participantB)}
            color="pink"
          />
        </div>

        <div className="flex justify-end">
          <Button
            size="lg"
            onClick={handleSubmit}
            className="w-full md:w-auto gap-2 shadow-lg shadow-neon-blue/20"
          >
            <Sparkles className="w-5 h-5" />
            Evaluate Debate
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

function ArgumentInput({ label, value, onChange, error, wordCount, color }) {
  const isOverLimit = wordCount > MAX_WORDS;

  return (
    <Card
      className={cn(
        "flex flex-col h-full transition-colors duration-300",
        error && "border-red-500/50",
        !error && color === "blue" && "hover:border-neon-blue/30",
        !error && color === "pink" && "hover:border-neon-pink/30"
      )}
    >
      <CardHeader className="pb-4 border-b border-white/5">
        <CardTitle className="text-lg flex justify-between items-center">
          <span
            className={cn(
              color === "blue" ? "text-neon-blue" : "text-neon-pink"
            )}
          >
            {label}
          </span>
          <span
            className={cn(
              "text-xs font-mono px-2 py-1 rounded-md bg-black/20 border border-white/5",
              isOverLimit ? "text-red-400 border-red-500/20" : "text-gray-400"
            )}
          >
            {wordCount} / {MAX_WORDS}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pt-4">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter argument here..."
          className="h-[400px] resize-none text-base leading-relaxed bg-transparent border-none focus-visible:ring-0 p-0"
        />
        {error && (
          <p className="text-red-500 text-sm mt-2 flex items-center animate-fade-in-up">
            <AlertCircle className="w-4 h-4 mr-1" /> {error}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
