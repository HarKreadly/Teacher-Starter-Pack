import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Grid, List, SlidersHorizontal, Zap, Clock, User, 
  Sparkles, X, ChevronRight, PlayCircle, Trophy, RefreshCw
} from "lucide-react";

// Curaetd high-fidelity warmups data
const warmupsData = [
  {
    id: 1,
    title: "Two Truths and a Lie",
    activityType: "Ice Breakers",
    engagementLevel: "High",
    duration: "10 min",
    author: "Emma Wilson",
    description: "A classic speaking game where students write three statements about themselves—two true, one false—and classmates vote on which is the lie.",
    instructions: [
      "Ask each student to write down three statements about themselves: two must be true, and one must be a lie.",
      "In pairs or groups, students read their statements aloud.",
      "The listening students must ask follow-up questions to probe the details of each statement.",
      "Finally, they vote on which statement is the lie. The presenter reveals the truth!"
    ],
    tips: "Encourage students to make their lies plausible and their truths slightly unusual to keep it highly engaging.",
    gradient: "from-rose-500/10 to-pink-500/10 dark:from-rose-500/20 dark:to-pink-500/20",
    border: "border-rose-200/60 dark:border-rose-800/30",
    shadow: "shadow-rose-100 dark:shadow-none",
    tagColor: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400",
    accent: "rgb(244, 63, 94)"
  },
  {
    id: 2,
    title: "Speed Debating",
    activityType: "Discussion",
    engagementLevel: "High",
    duration: "15 min",
    author: "David Chen",
    description: "Speed-dating style debates. Students rotate partners every 2 minutes to discuss controversial or lighthearted topics using target grammar.",
    instructions: [
      "Arrange the classroom chairs in two concentric circles facing each other.",
      "Provide a debate prompt (e.g., 'Will artificial intelligence replace classroom teachers?').",
      "Give students in the inner and outer circles 2 minutes to debate their respective sides.",
      "When the buzzer sounds, have the outer circle rotate one seat to the right. Present a new debate topic."
    ],
    tips: "Keep topics light and humorous to lower student anxiety and keep speaking confidence high.",
    gradient: "from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20",
    border: "border-blue-200/60 dark:border-blue-800/30",
    shadow: "shadow-blue-100 dark:shadow-none",
    tagColor: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
    accent: "rgb(59, 130, 246)"
  },
  {
    id: 3,
    title: "The Human Knot",
    activityType: "TPR",
    engagementLevel: "Medium",
    duration: "12 min",
    author: "Michael Brown",
    description: "A physical group puzzle where students stand in a circle, grab hands with two different people, and must untangle themselves without letting go.",
    instructions: [
      "Divide the class into small groups of 6 to 8 students.",
      "Have each group stand in a tight circle and reach out to hold hands with two different classmates (do not hold hands with adjacent peers).",
      "Instruct groups to fully untangle themselves to form a perfect circle without releasing their hand grip.",
      "Encourage the use of direction words (under, over, step, turn) to boost vocabulary."
    ],
    tips: "Ensure there is enough empty space around each group to move safely and comfortably.",
    gradient: "from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20",
    border: "border-emerald-200/60 dark:border-emerald-800/30",
    shadow: "shadow-emerald-100 dark:shadow-none",
    tagColor: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
    accent: "rgb(16, 185, 129)"
  },
  {
    id: 4,
    title: "Word Association Chain",
    activityType: "Brainstorming",
    engagementLevel: "Medium",
    duration: "8 min",
    author: "Sarah Jenkins",
    description: "A fast-paced vocabulary game. The teacher says a starting word, and students take turns saying the first related word that comes to mind.",
    instructions: [
      "Have all students sit or stand in a circle.",
      "Start the chain by saying a core thematic noun related to your current unit (e.g., 'Classroom').",
      "The next student must say the first related word that comes to mind within 3 seconds (e.g., 'Book').",
      "Continue clockwise. If a student hesitates, repeats a word, or makes a non-sensical link, start a new chain."
    ],
    tips: "Run this game at high speed. The pressure of time leads to creative, spontaneous vocabulary links.",
    gradient: "from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20",
    border: "border-amber-200/60 dark:border-amber-800/30",
    shadow: "shadow-amber-100 dark:shadow-none",
    tagColor: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
    accent: "rgb(245, 158, 11)"
  },
  {
    id: 5,
    title: "Where Do You Stand?",
    activityType: "Games",
    engagementLevel: "High",
    duration: "10 min",
    author: "Elena Rostova",
    description: "An active opinion poll. The teacher designates sides of the room as 'Strongly Agree' and 'Strongly Disagree'. Students walk to represent their view.",
    instructions: [
      "Label opposite walls of the classroom with 'Strongly Agree' and 'Strongly Disagree' signs.",
      "Read out a provocative statement (e.g., 'Saturdays should be part of the official school week').",
      "Ask students to physically walk and position themselves along the spectrum based on their opinion.",
      "Invite students from different positions along the wall to explain their reasoning to the class."
    ],
    tips: "Encourage respectful listening. Let students change their physical stance if another student's argument changes their mind.",
    gradient: "from-violet-500/10 to-purple-500/10 dark:from-violet-500/20 dark:to-purple-500/20",
    border: "border-violet-200/60 dark:border-violet-800/30",
    shadow: "shadow-violet-100 dark:shadow-none",
    tagColor: "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
    accent: "rgb(139, 92, 246)"
  },
  {
    id: 6,
    title: "Vocabulary Charades",
    activityType: "TPR",
    engagementLevel: "High",
    duration: "15 min",
    author: "Emma Wilson",
    description: "Active non-verbal acting game where students act out a target vocabulary term while the rest of the class shouts out guesses.",
    instructions: [
      "Divide the classroom into two competing teams.",
      "Have one student volunteer from Team A pick a secret vocabulary card from the teacher's box.",
      "Give them 60 seconds to act out the term non-verbally (no speaking, no writing, no drawing).",
      "Team A classmates guess. If they guess correctly within the limit, score a point. Switch turns to Team B."
    ],
    tips: "Use vocabulary words from previous units for a highly energetic and fun review session.",
    gradient: "from-cyan-500/10 to-sky-500/10 dark:from-cyan-500/20 dark:to-sky-500/20",
    border: "border-cyan-200/60 dark:border-cyan-800/30",
    shadow: "shadow-cyan-100 dark:shadow-none",
    tagColor: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400",
    accent: "rgb(6, 182, 212)"
  }
];

const WarmupsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedEngagement, setSelectedEngagement] = useState("All");
  const [viewMode, setViewMode] = useState("colorful"); // colorful grid, minimalist grid, compact list
  const [selectedWarmup, setSelectedWarmup] = useState(null);

  // Filters setup
  const activityTypes = ["All", "TPR", "Discussion", "Ice Breakers", "Brainstorming", "Games"];
  const engagementLevels = ["All", "Low", "Medium", "High"];

  const filteredWarmups = useMemo(() => {
    return warmupsData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === "All" || item.activityType === selectedType;
      const matchesEngagement = selectedEngagement === "All" || item.engagementLevel === selectedEngagement;

      return matchesSearch && matchesType && matchesEngagement;
    });
  }, [searchQuery, selectedType, selectedEngagement]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedType("All");
    setSelectedEngagement("All");
  };

  return (
    <div className="container mx-auto px-6 py-28 min-h-screen font-sans bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      
      {/* ── Header ── */}
      <div className="mb-12 relative">
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-16 bg-zinc-900 dark:bg-white rounded-full hidden md:block" />
        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-400 dark:text-zinc-600 mb-2 block">Premium Resource Pack</span>
        <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4 flex items-center gap-3">
          Energizing Warm-Ups <Sparkles className="text-amber-500 animate-pulse" size={24} />
        </h1>
        <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
          Interactive, high-octane 5-to-15 minute exercises designed to trigger class participation, capture attention, and build authentic language usage right from the bell.
        </p>
      </div>

      {/* ── Search & Toolbar Controls ── */}
      <div className="flex flex-col gap-6 mb-10 bg-zinc-50 dark:bg-zinc-900/40 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-900 shadow-sm">
        
        {/* Row 1: Search & View Switcher */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" size={18} />
            <input 
              type="text"
              placeholder="Search by keyword, skill, or objective..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1.5 self-end md:self-auto bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-xl">
            {[
              { id: "colorful", label: "Curated Grid", icon: Grid },
              { id: "minimalist", label: "Minimal Grid", icon: Grid },
              { id: "compact", label: "Compact List", icon: List },
            ].map(mode => (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                  viewMode === mode.id
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm border border-zinc-200/50 dark:border-zinc-800/50"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                <mode.icon size={13} />
                <span className={viewMode === mode.id ? "block" : "hidden sm:block"}>{mode.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Filtering Categories */}
        <div className="flex flex-col gap-4">
          {/* Activity Type Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 w-24">Activity Type</span>
            <div className="flex flex-wrap gap-1.5">
              {activityTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                    selectedType === type
                      ? "bg-zinc-900 border-zinc-900 text-white dark:bg-white dark:border-white dark:text-zinc-950"
                      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Engagement Level Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 w-24">Engagement</span>
            <div className="flex flex-wrap gap-1.5">
              {engagementLevels.map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedEngagement(level)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                    selectedEngagement === level
                      ? "bg-zinc-900 border-zinc-900 text-white dark:bg-white dark:border-white dark:text-zinc-950"
                      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Dynamic Layout Rendering ── */}
      <AnimatePresence mode="popLayout">
        {filteredWarmups.length > 0 ? (
          <motion.div
            key={viewMode + "-" + filteredWarmups.length}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* View Mode: Curated Grid (Colorful Cards) */}
            {viewMode === "colorful" && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredWarmups.map((warmup) => (
                  <motion.div
                    key={warmup.id}
                    layoutId={`warmup-card-${warmup.id}`}
                    onClick={() => setSelectedWarmup(warmup)}
                    whileHover={{ 
                      y: -6, 
                      scale: 1.02,
                      boxShadow: "0 20px 40px -15px rgba(0,0,0,0.06)" 
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`relative p-6 rounded-2xl border ${warmup.border} bg-gradient-to-br ${warmup.gradient} flex flex-col justify-between h-72 cursor-pointer transition-all duration-300 shadow-md ${warmup.shadow}`}
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${warmup.tagColor}`}>
                          {warmup.activityType}
                        </span>
                        <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                          <Clock size={12} />
                          <span className="text-[10px] font-mono font-bold">{warmup.duration}</span>
                        </div>
                      </div>

                      {/* Title & Desc */}
                      <h3 className="text-lg font-black tracking-tight text-zinc-900 dark:text-white mb-2 group-hover:text-zinc-950">
                        {warmup.title}
                      </h3>
                      <p className="text-[12px] text-zinc-600 dark:text-zinc-400 line-clamp-4 leading-relaxed font-normal">
                        {warmup.description}
                      </p>
                    </div>

                    {/* Bottom Metadata Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-200/40 dark:border-zinc-800/40 mt-auto">
                      <div className="flex items-center gap-1.5">
                        <Trophy size={12} className="text-zinc-400" />
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{warmup.engagementLevel} Engagement</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                        Play <PlayCircle size={14} style={{ color: warmup.accent }} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* View Mode: Minimalist Grid */}
            {viewMode === "minimalist" && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredWarmups.map((warmup) => (
                  <motion.div
                    key={warmup.id}
                    onClick={() => setSelectedWarmup(warmup)}
                    whileHover={{ y: -4 }}
                    className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between h-64 cursor-pointer hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-300"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[9px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                          {warmup.activityType}
                        </span>
                        <span className="text-[10px] font-bold text-zinc-500">{warmup.duration}</span>
                      </div>
                      <h3 className="text-[15px] font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
                        {warmup.title}
                      </h3>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                        {warmup.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-auto">
                      <span className="text-[9px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Author: {warmup.author}</span>
                      <span className="text-[10px] font-black text-zinc-900 dark:text-white uppercase tracking-widest flex items-center gap-1">
                        Open <ChevronRight size={12} />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* View Mode: Compact List */}
            {viewMode === "compact" && (
              <div className="flex flex-col border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm">
                {filteredWarmups.map((warmup, idx) => (
                  <div
                    key={warmup.id}
                    onClick={() => setSelectedWarmup(warmup)}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 cursor-pointer transition-colors duration-300 ${
                      idx !== filteredWarmups.length - 1 ? "border-b border-zinc-100 dark:border-zinc-800/80" : ""
                    } hover:bg-zinc-50 dark:hover:bg-zinc-800/30`}
                  >
                    <div className="flex-1 min-w-0 pr-6">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${warmup.tagColor}`}>
                          {warmup.activityType}
                        </span>
                        <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 font-mono">{warmup.duration}</span>
                      </div>
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-0.5">
                        {warmup.title}
                      </h4>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                        {warmup.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-6 mt-3 sm:mt-0 shrink-0">
                      <div className="flex flex-col items-start sm:items-end text-[10px]">
                        <span className="text-zinc-400">Engagement</span>
                        <span className="font-bold text-zinc-700 dark:text-zinc-300">{warmup.engagementLevel}</span>
                      </div>
                      <div className="flex flex-col items-start sm:items-end text-[10px]">
                        <span className="text-zinc-400">Author</span>
                        <span className="font-bold text-zinc-700 dark:text-zinc-300">{warmup.author}</span>
                      </div>
                      <PlayCircle size={18} style={{ color: warmup.accent }} className="hidden sm:block opacity-65 group-hover:opacity-100" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          /* Empty Search State */
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/30 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl"
          >
            <RefreshCw className="mx-auto text-zinc-400 animate-spin mb-4" size={32} />
            <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-1">No Warm-Ups found</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 max-w-sm mx-auto">
              We couldn't find any activities matching those search parameters. Try resetting your filter settings.
            </p>
            <button 
              onClick={resetFilters}
              className="px-5 py-2 bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 text-xs font-bold uppercase tracking-wider rounded-xl hover:opacity-90 transition-all shadow-md cursor-pointer"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Detail Drawer Modal ── */}
      <AnimatePresence>
        {selectedWarmup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Dark Overlay Background */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedWarmup(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[85vh]"
            >
              {/* Card Color Bar top */}
              <div className={`h-2 bg-gradient-to-r ${selectedWarmup.gradient}`} />

              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedWarmup(null)}
                  className="absolute right-6 top-6 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>

                {/* Header Information */}
                <div className="mb-6 pr-12">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${selectedWarmup.tagColor} mb-3 inline-block`}>
                    {selectedWarmup.activityType}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900 dark:text-white mb-2">
                    {selectedWarmup.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} /> {selectedWarmup.duration}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    <span className="flex items-center gap-1.5">
                      <Trophy size={13} /> {selectedWarmup.engagementLevel} Engagement
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    <span className="flex items-center gap-1.5">
                      <User size={13} /> By {selectedWarmup.author}
                    </span>
                  </div>
                </div>

                <div className="space-y-6 text-sm">
                  {/* Summary */}
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">Objective</h4>
                    <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal bg-zinc-50 dark:bg-zinc-850 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                      {selectedWarmup.description}
                    </p>
                  </div>

                  {/* Step-by-Step Instructions */}
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">How to Play (Steps)</h4>
                    <div className="space-y-3">
                      {selectedWarmup.instructions.map((step, idx) => (
                        <div key={idx} className="flex gap-4">
                          <span 
                            className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[11px] font-bold font-mono" 
                            style={{ backgroundColor: `${selectedWarmup.accent}15`, color: selectedWarmup.accent }}
                          >
                            {idx + 1}
                          </span>
                          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed pt-0.5">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tips */}
                  {selectedWarmup.tips && (
                    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">Teacher Pro-Tips</h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed italic">
                        💡 {selectedWarmup.tips}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Quick Play CTA */}
              <div className="p-6 bg-zinc-50 dark:bg-zinc-850 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between shrink-0">
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold tracking-wider">Ready to bring energy to class?</span>
                <button
                  onClick={() => setSelectedWarmup(null)}
                  className="px-6 py-2.5 bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-xs rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-md"
                >
                  Start Activity
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WarmupsPage;
