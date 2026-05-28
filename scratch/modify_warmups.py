import re

# Read current file
with open('src/pages/WarmupsPage.jsx', 'r') as f:
    content = f.read()

# 1. Update imports to include all needed lucide icons
import_stmt_pattern = r'import \{.*Search, Grid, List, SlidersHorizontal, Zap, Clock, User,.*\} from "lucide-react";'
new_import_stmt = '''import { 
  Search, Grid, List, SlidersHorizontal, Zap, Clock, User, 
  Sparkles, X, ChevronRight, PlayCircle, Trophy, RefreshCw, ArrowUpRight,
  ChevronDown, ChevronUp, Download, UserCheck, MessageSquare, Activity, Link, Compass, Tv, ArrowRight
} from "lucide-react";'''

content = re.sub(r'import\s+\{\s*Search,\s*Grid,\s*List,\s*SlidersHorizontal,\s*Zap,\s*Clock,\s*User,\s*Sparkles,\s*X,\s*ChevronRight,\s*PlayCircle,\s*Trophy,\s*RefreshCw,\s*ArrowUpRight,\s*ChevronDown,\s*ChevronUp,\s*Download\s*\} from "lucide-react";', new_import_stmt, content)

# 2. Complete rewrite of warmupsData array
new_warmups_data = """// Curaetd high-fidelity warmups data
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
    gradient: "group-hover:from-rose-500 group-hover:to-pink-500 dark:group-hover:from-rose-600 dark:group-hover:to-pink-600",
    border: "border-zinc-100 dark:border-zinc-800 hover:border-transparent",
    shadow: "hover:shadow-rose-500/20",
    tagColor: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 group-hover:bg-white/20 group-hover:text-white",
    accent: "rgb(244, 63, 94)",
    lessonExamples: [
      { subject: "English Language Arts", topic: "Autobiographical Writing (Facts vs. embellishments)" },
      { subject: "History", topic: "Historical Myths (Identifying factual records vs. historical rumors)" },
      { subject: "Science", topic: "Scientific Method (Differentiating proven facts from general misconceptions)" }
    ]
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
    gradient: "group-hover:from-blue-500 group-hover:to-indigo-500 dark:group-hover:from-blue-600 dark:group-hover:to-indigo-600",
    border: "border-zinc-100 dark:border-zinc-800 hover:border-transparent",
    shadow: "hover:shadow-blue-500/20",
    tagColor: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 group-hover:bg-white/20 group-hover:text-white",
    accent: "rgb(59, 130, 246)",
    lessonExamples: [
      { subject: "Social Studies & Civics", topic: "Public Debates (Expressing arguments on civic policies)" },
      { subject: "English Literature", topic: "Character Analysis (Debating the moral decisions of central characters)" },
      { subject: "Environmental Science", topic: "Conservation Tactics (Immediate action vs. long-term planning)" }
    ]
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
    gradient: "group-hover:from-emerald-500 group-hover:to-teal-500 dark:group-hover:from-emerald-600 dark:group-hover:to-teal-600",
    border: "border-zinc-100 dark:border-zinc-800 hover:border-transparent",
    shadow: "hover:shadow-emerald-500/20",
    tagColor: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 group-hover:bg-white/20 group-hover:text-white",
    accent: "rgb(16, 185, 129)",
    lessonExamples: [
      { subject: "Physical Education", topic: "Teamwork & Leadership (Practicing clear, spoken physical guidance)" },
      { subject: "STEM / Computing", topic: "Sequencing & Optimization (Sorting out linear processes physically)" },
      { subject: "Drama & Theater", topic: "Stage Trust Exercises (Improving body coordination and communication)" }
    ]
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
    gradient: "group-hover:from-amber-500 group-hover:to-orange-500 dark:group-hover:from-amber-600 dark:group-hover:to-orange-600",
    border: "border-zinc-100 dark:border-zinc-800 hover:border-transparent",
    shadow: "hover:shadow-amber-500/20",
    tagColor: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 group-hover:bg-white/20 group-hover:text-white",
    accent: "rgb(245, 158, 11)",
    lessonExamples: [
      { subject: "Foreign Languages", topic: "Rapid Theme Recall (Spontaneous vocabulary connection)" },
      { subject: "Chemistry", topic: "Elemental Groups (Linking elemental properties or compounds)" },
      { subject: "Creative Writing", topic: "Metaphorical Association (Fostering fluid transitions in poetry)" }
    ]
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
    gradient: "group-hover:from-violet-500 group-hover:to-purple-500 dark:group-hover:from-violet-600 dark:group-hover:to-purple-600",
    border: "border-zinc-100 dark:border-zinc-800 hover:border-transparent",
    shadow: "hover:shadow-violet-500/20",
    tagColor: "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400 group-hover:bg-white/20 group-hover:text-white",
    accent: "rgb(139, 92, 246)",
    lessonExamples: [
      { subject: "Philosophy & Ethics", topic: "Ethical Dilemmas (Evaluating viewpoints on complex choices)" },
      { subject: "History", topic: "Turning Point Events (Deciphering multi-faceted public reactions)" },
      { subject: "Mathematics", topic: "Spectrum Mapping (Aligning physical locations to number lines)" }
    ]
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
    gradient: "group-hover:from-cyan-500 group-hover:to-sky-500 dark:group-hover:from-cyan-600 dark:group-hover:to-sky-600",
    border: "border-zinc-100 dark:border-zinc-800 hover:border-transparent",
    shadow: "hover:shadow-cyan-500/20",
    tagColor: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400 group-hover:bg-white/20 group-hover:text-white",
    accent: "rgb(6, 182, 212)",
    lessonExamples: [
      { subject: "Biology", topic: "Cellular Roles (Acting out organelle processes non-verbally)" },
      { subject: "English & ESL", topic: "Action Verbs & Idioms (Visualizing phrases and expressions physically)" },
      { subject: "Earth Science", topic: "Tectonic Movements (Enacting plate subduction and fault actions)" }
    ]
  }
];"""

# Replace the warmupsData array
content = re.sub(
    r'// Curaetd high-fidelity warmups data\s*const warmupsData = \[\s*\{[\s\S]*?\}\s*\];',
    new_warmups_data,
    content
)

# 3. Add GeometricShapes helper component and iconMap
helpers_code = """
const iconMap = {
  1: UserCheck,
  2: MessageSquare,
  3: Activity,
  4: Link,
  5: Compass,
  6: Tv
};

const GeometricShapes = ({ id }) => {
  // Clean pastel/vector geometric graphics modeled directly after e-commerce mockup reference
  const themes = {
    1: {
      primary: "fill-rose-400/90 dark:fill-rose-500/80 group-hover:fill-white/80 transition-all duration-300",
      secondary: "fill-pink-300/80 dark:fill-pink-400/70 group-hover:fill-white/60 transition-all duration-300",
      accent: "fill-rose-200/90 dark:fill-rose-300/80 group-hover:fill-white/40 transition-all duration-300"
    },
    2: {
      primary: "fill-blue-400/90 dark:fill-blue-500/80 group-hover:fill-white/80 transition-all duration-300",
      secondary: "fill-indigo-300/80 dark:fill-indigo-400/70 group-hover:fill-white/60 transition-all duration-300",
      accent: "fill-blue-200/90 dark:fill-blue-300/80 group-hover:fill-white/40 transition-all duration-300"
    },
    3: {
      primary: "fill-emerald-400/90 dark:fill-emerald-500/80 group-hover:fill-white/80 transition-all duration-300",
      secondary: "fill-teal-300/80 dark:fill-teal-400/70 group-hover:fill-white/60 transition-all duration-300",
      accent: "fill-emerald-200/90 dark:fill-emerald-300/80 group-hover:fill-white/40 transition-all duration-300"
    },
    4: {
      primary: "fill-amber-400/90 dark:fill-amber-500/80 group-hover:fill-white/80 transition-all duration-300",
      secondary: "fill-orange-300/80 dark:fill-orange-400/70 group-hover:fill-white/60 transition-all duration-300",
      accent: "fill-amber-200/90 dark:fill-amber-300/80 group-hover:fill-white/40 transition-all duration-300"
    },
    5: {
      primary: "fill-violet-400/90 dark:fill-violet-500/80 group-hover:fill-white/80 transition-all duration-300",
      secondary: "fill-purple-300/80 dark:fill-purple-400/70 group-hover:fill-white/60 transition-all duration-300",
      accent: "fill-violet-200/90 dark:fill-violet-300/80 group-hover:fill-white/40 transition-all duration-300"
    },
    6: {
      primary: "fill-cyan-400/90 dark:fill-cyan-500/80 group-hover:fill-white/80 transition-all duration-300",
      secondary: "fill-sky-300/80 dark:fill-sky-400/70 group-hover:fill-white/60 transition-all duration-300",
      accent: "fill-cyan-200/90 dark:fill-cyan-300/80 group-hover:fill-white/40 transition-all duration-300"
    }
  };

  const colors = themes[id] || themes[1];

  if (id === 1) {
    return (
      <svg className="w-28 h-28 absolute bottom-0 right-0 pointer-events-none z-0" viewBox="0 0 100 100">
        <circle cx="75" cy="75" r="22" className={colors.primary} />
        <rect x="35" y="45" width="28" height="28" rx="6" className={colors.secondary} transform="rotate(15 49 59)" />
        <circle cx="45" cy="78" r="11" className={colors.accent} />
      </svg>
    );
  }
  if (id === 2) {
    return (
      <svg className="w-28 h-28 absolute bottom-0 right-0 pointer-events-none z-0" viewBox="0 0 100 100">
        <path d="M40 75 L75 40 L90 75 Z" className={colors.primary} />
        <circle cx="50" cy="75" r="18" className={colors.secondary} />
        <rect x="68" y="68" width="18" height="18" rx="4" className={colors.accent} transform="rotate(45 77 77)" />
      </svg>
    );
  }
  if (id === 3) {
    return (
      <svg className="w-28 h-28 absolute bottom-0 right-0 pointer-events-none z-0" viewBox="0 0 100 100">
        <rect x="52" y="38" width="32" height="32" rx="8" className={colors.primary} transform="rotate(-20 68 54)" />
        <circle cx="38" cy="75" r="16" className={colors.secondary} />
        <path d="M68 75 A 14 14 0 0 0 96 75 Z" className={colors.accent} />
      </svg>
    );
  }
  if (id === 4) {
    return (
      <svg className="w-28 h-28 absolute bottom-0 right-0 pointer-events-none z-0" viewBox="0 0 100 100">
        <circle cx="68" cy="48" r="18" className={colors.primary} />
        <rect x="35" y="62" width="38" height="22" rx="5" className={colors.secondary} transform="rotate(5 54 73)" />
        <circle cx="78" cy="78" r="9" className={colors.accent} />
      </svg>
    );
  }
  if (id === 5) {
    return (
      <svg className="w-28 h-28 absolute bottom-0 right-0 pointer-events-none z-0" viewBox="0 0 100 100">
        <path d="M40 75 A 24 24 0 0 1 88 75 Z" className={colors.primary} />
        <circle cx="45" cy="48" r="14" className={colors.secondary} />
        <rect x="72" y="58" width="14" height="14" rx="3" className={colors.accent} transform="rotate(30 79 65)" />
      </svg>
    );
  }
  return (
    <svg className="w-28 h-28 absolute bottom-0 right-0 pointer-events-none z-0" viewBox="0 0 100 100">
      <rect x="48" y="48" width="28" height="28" rx="14" className={colors.primary} />
      <path d="M35 75 L68 42 L82 75 Z" className={colors.secondary} />
      <circle cx="78" cy="78" r="10" className={colors.accent} />
    </svg>
  );
};
"""

content = content.replace("const WarmupsPage = () => {", helpers_code + "\nconst WarmupsPage = () => {")

# 4. Redesign "Curated Grid" Colorful card rendering block
# Let's search for `{viewMode === "colorful" && (`
curated_grid_start = content.find('{viewMode === "colorful" && (')
colorful_card_pattern = r'\{viewMode === "colorful" && \(\s*<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">[\s\S]*?</div>\s*\)\}'

new_colorful_cards = """{viewMode === "colorful" && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredWarmups.map((warmup) => {
                  const IconComponent = iconMap[warmup.id] || Sparkles;
                  return (
                    <motion.div
                      key={warmup.id}
                      layoutId={`warmup-card-${warmup.id}`}
                      onClick={() => setSelectedWarmup(warmup)}
                      whileHover={{ 
                        y: -8,
                        scale: 1.015,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      className={`group relative p-6 rounded-[1.8rem] border ${warmup.border} bg-white dark:bg-zinc-900 flex flex-col justify-between h-72 cursor-pointer transition-all duration-300 shadow-sm shadow-zinc-100/50 dark:shadow-none hover:border-transparent ${warmup.gradient} ${warmup.shadow}`}
                    >
                      <div className="z-10 relative">
                        {/* Top Header Row */}
                        <div className="flex items-center justify-between mb-5">
                          <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all duration-300 ${warmup.tagColor}`}>
                            {warmup.activityType}
                          </span>
                          <div className="flex items-center gap-1 text-zinc-400 group-hover:text-white/80 transition-colors duration-300">
                            <Clock size={12} />
                            <span className="text-[10px] font-mono font-bold">{warmup.duration}</span>
                          </div>
                        </div>

                        {/* Title & Desc */}
                        <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-white transition-colors duration-300 mb-2">
                          {warmup.title}
                        </h3>
                        <p className="text-[12px] text-zinc-500 dark:text-zinc-400 group-hover:text-white/80 transition-colors duration-300 line-clamp-3 leading-relaxed font-normal pr-4">
                          {warmup.description}
                        </p>
                      </div>

                      {/* Top Right Floating Icon */}
                      <div className={`absolute top-6 right-6 w-9 h-9 rounded-full flex items-center justify-center border border-zinc-100 dark:border-zinc-800/80 group-hover:border-white/20 transition-all duration-300 z-10 ${warmup.tagColor}`}>
                        <IconComponent size={14} className="stroke-[2.5]" />
                      </div>

                      {/* Bottom Footer Details */}
                      <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800/40 group-hover:border-white/10 mt-auto z-10 relative">
                        <div className="flex items-center gap-1.5 text-zinc-400 group-hover:text-white/80 transition-colors duration-300">
                          <ArrowRight size={15} />
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 group-hover:text-white uppercase tracking-wider transition-colors duration-300">
                          {warmup.engagementLevel} Engagement
                        </div>
                      </div>

                      {/* Embedded Clean Geometric SVG Art */}
                      <GeometricShapes id={warmup.id} />
                    </motion.div>
                  );
                })}
              </div>
            )}"""

content = re.sub(colorful_card_pattern, new_colorful_cards, content)

# 5. Redesign "Minimalist Grid" Card
minimalist_card_pattern = r'\{viewMode === "minimalist" && \(\s*<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">[\s\S]*?</div>\s*\)\}'

new_minimalist_cards = """{viewMode === "minimalist" && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredWarmups.map((warmup) => {
                  const IconComponent = iconMap[warmup.id] || Sparkles;
                  return (
                    <motion.div
                      key={warmup.id}
                      layoutId={`warmup-card-${warmup.id}`}
                      onClick={() => setSelectedWarmup(warmup)}
                      whileHover={{ y: -4 }}
                      className="group p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between h-64 cursor-pointer hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-300 relative overflow-hidden"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[9px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                            {warmup.activityType}
                          </span>
                          <span className="text-[10px] font-bold text-zinc-500">{warmup.duration}</span>
                        </div>
                        <h3 className="text-[16px] font-bold tracking-tight text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                          <IconComponent size={14} className="text-zinc-400" />
                          {warmup.title}
                        </h3>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                          {warmup.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 mt-auto border-t border-zinc-100 dark:border-zinc-800/40">
                        <span className="text-[9px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Author: {warmup.author}</span>
                        <span className="text-[10px] font-black text-zinc-900 dark:text-white uppercase tracking-widest flex items-center gap-1">
                          Open <ChevronRight size={12} />
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}"""

content = re.sub(minimalist_card_pattern, new_minimalist_cards, content)

# 6. Revamp Expanded Card Details - Relabel instructions, add Examples of Lessons to Use With
expanded_card_pattern = r'<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-sm">[\s\S]*?</div>\s*</div>\s*</div>\s*</div>\s*\{\/\* Bottom Quick Play CTA \*\/\}'

new_expanded_details_grid = """<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-sm">
                {/* Left Column: Objective & Tips */}
                <div className="lg:col-span-1 space-y-6">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">Objective</h4>
                    <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal bg-zinc-50 dark:bg-zinc-850 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                      {selectedWarmup.description}
                    </p>
                  </div>

                  {selectedWarmup.tips && (
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">Teacher Pro-Tips</h4>
                      <div className="bg-amber-50/60 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/30 p-5 rounded-2xl shadow-sm">
                        <p className="text-amber-800 dark:text-amber-400/90 leading-relaxed italic text-sm">
                          💡 {selectedWarmup.tips}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Step-by-Step Instructions & Lesson Examples */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Instructions on How to Use */}
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">Instructions on How to Use</h4>
                    <div className="space-y-4">
                      {selectedWarmup.instructions.map((step, idx) => (
                        <div key={idx} className="flex gap-4 p-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors border border-transparent hover:border-zinc-100 dark:hover:border-zinc-800/50">
                          <span 
                            className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold font-mono shadow-sm" 
                            style={{ backgroundColor: `${selectedWarmup.accent}15`, color: selectedWarmup.accent }}
                          >
                            {idx + 1}
                          </span>
                          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed pt-1 text-base font-normal">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Examples of Lessons to Use With */}
                  <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800/80">
                    <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">Examples of Lessons to Use With</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedWarmup.lessonExamples.map((example, idx) => (
                        <div key={idx} className="p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/50 flex flex-col justify-between shadow-sm">
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block mb-1">
                              {example.subject}
                            </span>
                            <p className="text-zinc-700 dark:text-zinc-300 font-bold text-sm leading-snug">
                              {example.topic}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>"""

# Replace in expanded grid details
# We can find exact start and end to replace
expanded_div_start = content.find('<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-sm">')
expanded_div_end = content.find('            {/* Bottom Quick Play CTA */}')

if expanded_div_start != -1 and expanded_div_end != -1:
    content = content[:expanded_div_start] + new_expanded_details_grid + '\n\n' + content[expanded_div_end:]

# Write back
with open('src/pages/WarmupsPage.jsx', 'w') as f:
    f.write(content)

print("Modification Completed Successfully")
