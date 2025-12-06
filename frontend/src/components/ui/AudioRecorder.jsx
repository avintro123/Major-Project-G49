import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js";
import { Mic, Square, Play, Pause, RotateCcw, Upload } from "lucide-react";
import { Button } from "./Button";
import { cn } from "../../lib/utils";

export function AudioRecorder({ onRecordingComplete, label }) {
  const containerRef = useRef(null);
  const wavesurferRef = useRef(null);
  const recordPluginRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState("00:00");
  const [hasRecording, setHasRecording] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    wavesurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#4b5563",
      progressColor: "#3b82f6",
      height: 60,
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
    });

    recordPluginRef.current = wavesurferRef.current.registerPlugin(
      RecordPlugin.create({ scrollingWaveform: true, renderRecordedAudio: false })
    );

    recordPluginRef.current.on("record-end", (blob) => {
      const url = URL.createObjectURL(blob);
      wavesurferRef.current.load(url);
      setHasRecording(true);
      onRecordingComplete(blob);
    });

    recordPluginRef.current.on("record-progress", (time) => {
      setDuration(formatTime(time / 1000));
    });

    wavesurferRef.current.on("play", () => setIsPlaying(true));
    wavesurferRef.current.on("pause", () => setIsPlaying(false));
    wavesurferRef.current.on("finish", () => setIsPlaying(false));

    return () => {
      wavesurferRef.current?.destroy();
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startRecording = async () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.empty(); // Clear previous
    }
    await recordPluginRef.current.startMic();
    setIsRecording(true);
    setHasRecording(false);
  };

  const stopRecording = () => {
    recordPluginRef.current.stopMic();
    setIsRecording(false);
  };

  const togglePlayback = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      wavesurferRef.current.load(url);
      setHasRecording(true);
      onRecordingComplete(file);
    }
  };

  return (
    <div className="w-full bg-black/20 border border-white/10 rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-300">{label}</h3>
        <div className="text-sm font-mono text-blue-400">{duration}</div>
      </div>

      <div ref={containerRef} className="mb-4 w-full" />

      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {!isRecording && !hasRecording && (
            <Button onClick={startRecording} variant="danger" size="sm" className="gap-2">
              <Mic className="w-4 h-4" /> Record
            </Button>
          )}

          {isRecording && (
            <Button onClick={stopRecording} variant="secondary" size="sm" className="gap-2 animate-pulse">
              <Square className="w-4 h-4" /> Stop
            </Button>
          )}

          {hasRecording && (
            <>
              <Button onClick={togglePlayback} variant="primary" size="sm" className="gap-2">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button onClick={startRecording} variant="ghost" size="sm" className="gap-2">
                <RotateCcw className="w-4 h-4" /> Redo
              </Button>
            </>
          )}
        </div>

        <div className="relative">
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <Button variant="outline" size="sm" className="gap-2">
            <Upload className="w-4 h-4" /> Upload
          </Button>
        </div>
      </div>
    </div>
  );
}
