import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/Button";
import { AudioRecorder } from "../components/ui/AudioRecorder";
import { Card, CardContent } from "../components/ui/Card";
import { Link } from "react-router-dom";

export default function DebateInputVoice() {
  const navigate = useNavigate();
  const [audioA, setAudioA] = useState(null);
  const [audioB, setAudioB] = useState(null);

  const handleSubmit = () => {
    if (audioA && audioB) {
      console.log("Submitting voice debate:", { audioA, audioB });
      navigate("/evaluation");
    } else {
      alert("Please record or upload audio for both participants.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 pt-24 max-w-5xl relative">
      {/* Background Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <div className="mb-10">
          <Link
            to="/"
            className="text-sm text-gray-400 hover:text-white flex items-center gap-2 mb-3 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Voice Debate
          </h1>
          <p className="text-gray-400 mt-2">
            Record or upload audio arguments for both sides.
          </p>
        </div>

        <div className="grid gap-8 mb-10">
          <Card className="border-neon-blue/20 hover:border-neon-blue/40 transition-colors">
            <CardContent className="pt-8">
              <AudioRecorder
                label="Participant A (Pro)"
                onRecordingComplete={setAudioA}
              />
              <div className="mt-4 flex items-center gap-2 text-sm">
                <div
                  className={`w-2 h-2 rounded-full ${
                    audioA ? "bg-green-500" : "bg-gray-600"
                  }`}
                />
                <span className={audioA ? "text-green-400" : "text-gray-500"}>
                  {audioA
                    ? "Audio captured successfully"
                    : "Waiting for audio input..."}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-neon-pink/20 hover:border-neon-pink/40 transition-colors">
            <CardContent className="pt-8">
              <AudioRecorder
                label="Participant B (Con)"
                onRecordingComplete={setAudioB}
              />
              <div className="mt-4 flex items-center gap-2 text-sm">
                <div
                  className={`w-2 h-2 rounded-full ${
                    audioB ? "bg-green-500" : "bg-gray-600"
                  }`}
                />
                <span className={audioB ? "text-green-400" : "text-gray-500"}>
                  {audioB
                    ? "Audio captured successfully"
                    : "Waiting for audio input..."}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button
            size="lg"
            onClick={handleSubmit}
            className="w-full md:w-auto gap-2 shadow-lg shadow-neon-purple/20"
            disabled={!audioA || !audioB}
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
