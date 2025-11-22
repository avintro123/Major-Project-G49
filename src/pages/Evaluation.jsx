import React from "react";
import { motion } from "framer-motion";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from "recharts";
import { CheckCircle2, AlertTriangle, Download, Share2, ArrowLeft, Save, Sparkles } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Link } from "react-router-dom";

const radarData = [
  { subject: 'Clarity', A: 85, B: 70, fullMark: 100 },
  { subject: 'Structure', A: 90, B: 65, fullMark: 100 },
  { subject: 'Grammar', A: 95, B: 80, fullMark: 100 },
  { subject: 'Persuasion', A: 75, B: 85, fullMark: 100 },
];

const barData = [
  { name: 'Clarity', A: 85, B: 70 },
  { name: 'Structure', A: 90, B: 65 },
  { name: 'Grammar', A: 95, B: 80 },
  { name: 'Persuasion', A: 75, B: 85 },
];

export default function Evaluation() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl relative">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-[128px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 relative z-10">
          <div>
            <Link to="/" className="text-sm text-gray-400 hover:text-white flex items-center gap-2 mb-3 transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Debate Evaluation
            </h1>
            <p className="text-gray-400 mt-2 text-lg">AI-powered analysis of the debate performance.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" /> PDF
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="w-4 h-4" /> Share
            </Button>
            <Button variant="primary" size="sm" className="gap-2 shadow-lg shadow-neon-blue/20">
              <Save className="w-4 h-4" /> Save Debate
            </Button>
          </div>
        </div>

        {/* Scores Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <ScoreCard title="Clarity" scoreA={85} scoreB={70} delay={0.1} />
          <ScoreCard title="Structure" scoreA={90} scoreB={65} delay={0.2} />
          <ScoreCard title="Grammar" scoreA={95} scoreB={80} delay={0.3} />
          <ScoreCard title="Persuasion" scoreA={75} scoreB={85} delay={0.4} />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Radar Chart */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Participant A" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Radar name="Participant B" dataKey="B" stroke="#ec4899" fill="#ec4899" fillOpacity={0.3} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#151725', borderColor: '#374151', color: '#f3f4f6', borderRadius: '12px' }}
                    itemStyle={{ color: '#f3f4f6' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Bar Chart */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Metric Comparison</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} opacity={0.5} />
                  <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                  <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{ fill: '#374151', opacity: 0.1 }}
                    contentStyle={{ backgroundColor: '#151725', borderColor: '#374151', color: '#f3f4f6', borderRadius: '12px' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="A" name="Participant A" fill="#3b82f6" radius={[6, 6, 0, 0]} maxBarSize={50} />
                  <Bar dataKey="B" name="Participant B" fill="#ec4899" radius={[6, 6, 0, 0]} maxBarSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Pros & Cons */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <FeedbackSection 
            participant="Participant A" 
            strengths={[
              "Strong opening statement with clear thesis.",
              "Effective use of statistical evidence.",
              "Maintained professional tone throughout."
            ]}
            weaknesses={[
              "Could improve transition between arguments.",
              "Slightly repetitive in the conclusion."
            ]}
            delay={0.5}
          />
          <FeedbackSection 
            participant="Participant B" 
            strengths={[
              "Excellent emotional appeal and storytelling.",
              "Strong rebuttal to opponent's main point.",
              "Clear and articulate delivery."
            ]}
            weaknesses={[
              "Lacked concrete data to support claims.",
              "Went slightly over time limit."
            ]}
            delay={0.6}
          />
        </div>

        {/* Summary */}
        <Card className="bg-gradient-to-br from-neon-blue/10 to-neon-purple/5 border-neon-blue/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-[80px] pointer-events-none" />
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-neon-blue text-2xl">
              <Sparkles className="w-6 h-6" />
              AI Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-200 leading-relaxed text-lg">
              Both participants presented compelling arguments. <span className="text-neon-blue font-semibold">Participant A</span> demonstrated superior structure and data usage, making their argument logically sound. <span className="text-neon-pink font-semibold">Participant B</span> excelled in persuasive rhetoric and emotional connection but lacked the empirical backing of A. Overall, it was a balanced debate with distinct styles.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function ScoreCard({ title, scoreA, scoreB, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="hover:border-neon-blue/30 transition-colors">
        <CardContent className="pt-6">
          <div className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">{title}</div>
          <div className="flex justify-between items-end">
            <div className="text-center">
              <div className="text-4xl font-bold text-neon-blue mb-1">{scoreA}</div>
              <div className="text-xs text-gray-500 font-medium">PART. A</div>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div className="text-center">
              <div className="text-4xl font-bold text-neon-pink mb-1">{scoreB}</div>
              <div className="text-xs text-gray-500 font-medium">PART. B</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function FeedbackSection({ participant, strengths, weaknesses, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-xl">{participant} Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <h4 className="text-sm font-bold text-green-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" /> Strengths
            </h4>
            <ul className="space-y-3">
              {strengths.map((item, i) => (
                <li key={i} className="text-gray-300 flex gap-3 items-start group">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0 group-hover:scale-150 transition-transform" />
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-yellow-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" /> Areas for Improvement
            </h4>
            <ul className="space-y-3">
              {weaknesses.map((item, i) => (
                <li key={i} className="text-gray-300 flex gap-3 items-start group">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 shrink-0 group-hover:scale-150 transition-transform" />
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
