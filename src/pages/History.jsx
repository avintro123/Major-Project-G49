import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, Eye, Trash2, MessageSquare, Mic } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent } from "../components/ui/Card";
import { cn } from "../lib/utils";

const dummyHistory = [
  { id: 1, topic: "Is AI beneficial for society?", date: "2023-10-25", mode: "text", score: 85 },
  { id: 2, topic: "Remote work vs Office work", date: "2023-10-24", mode: "voice", score: 78 },
  { id: 3, topic: "Universal Basic Income", date: "2023-10-22", mode: "text", score: 92 },
  { id: 4, topic: "Climate Change Solutions", date: "2023-10-20", mode: "voice", score: 81 },
  { id: 5, topic: "Social Media Impact", date: "2023-10-18", mode: "text", score: 74 },
];

export default function History() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // all, text, voice

  const filteredHistory = dummyHistory.filter((item) => {
    const matchesSearch = item.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || item.mode === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Debate History</h1>
            <p className="text-gray-400">Review your past debates and improvements.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input 
                placeholder="Search topics..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
              <button
                onClick={() => setFilter("all")}
                className={cn("px-3 py-1.5 rounded-md text-sm transition-colors", filter === "all" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white")}
              >
                All
              </button>
              <button
                onClick={() => setFilter("text")}
                className={cn("px-3 py-1.5 rounded-md text-sm transition-colors", filter === "text" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white")}
              >
                Text
              </button>
              <button
                onClick={() => setFilter("voice")}
                className={cn("px-3 py-1.5 rounded-md text-sm transition-colors", filter === "voice" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white")}
              >
                Voice
              </button>
            </div>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10 text-gray-400 text-sm uppercase">
                  <tr>
                    <th className="px-6 py-4 font-medium">Topic</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Mode</th>
                    <th className="px-6 py-4 font-medium">Score</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredHistory.length > 0 ? (
                    filteredHistory.map((item) => (
                      <tr key={item.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-medium">{item.topic}</td>
                        <td className="px-6 py-4 text-gray-400">{item.date}</td>
                        <td className="px-6 py-4">
                          <span className={cn("inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border", 
                            item.mode === "text" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-purple-500/10 text-purple-400 border-purple-500/20"
                          )}>
                            {item.mode === "text" ? <MessageSquare className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                            {item.mode === "text" ? "Text" : "Voice"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500" style={{ width: `${item.score}%` }} />
                            </div>
                            <span className="text-sm font-medium">{item.score}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Link to={`/history/${item.id}`}>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-red-500/10">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        No debates found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
