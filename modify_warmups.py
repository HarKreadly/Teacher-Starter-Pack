import re

with open('src/pages/WarmupsPage.jsx', 'r') as f:
    content = f.read()

# 1. Update container class
content = content.replace(
    'className="container mx-auto px-6 py-28 min-h-screen font-sans bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300"',
    'className="w-full max-w-[100vw] overflow-x-hidden px-6 md:px-12 lg:px-16 py-28 min-h-screen font-sans bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300"'
)

# 2. Add layoutId to minimalist grid
content = content.replace(
    '<motion.div\n                    key={warmup.id}\n                    onClick={() => setSelectedWarmup(warmup)}\n                    whileHover={{ y: -4 }}\n                    className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between h-64 cursor-pointer hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-300"\n                  >',
    '<motion.div\n                    key={warmup.id}\n                    layoutId={`warmup-card-${warmup.id}`}\n                    onClick={() => setSelectedWarmup(warmup)}\n                    whileHover={{ y: -4 }}\n                    className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between h-64 cursor-pointer hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-300"\n                  >'
)

# 3. Add layoutId to compact list (not motion.div right now, it's a regular div. Need to change to motion.div)
content = content.replace(
    '<div\n                    key={warmup.id}\n                    onClick={() => setSelectedWarmup(warmup)}\n                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 cursor-pointer transition-colors duration-300 ${\n                      idx !== filteredWarmups.length - 1 ? "border-b border-zinc-100 dark:border-zinc-800/80" : ""\n                    } hover:bg-zinc-50 dark:hover:bg-zinc-800/30`}\n                  >',
    '<motion.div\n                    key={warmup.id}\n                    layoutId={`warmup-card-${warmup.id}`}\n                    onClick={() => setSelectedWarmup(warmup)}\n                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 cursor-pointer transition-colors duration-300 ${\n                      idx !== filteredWarmups.length - 1 ? "border-b border-zinc-100 dark:border-zinc-800/80" : ""\n                    } hover:bg-zinc-50 dark:hover:bg-zinc-800/30`}\n                  >'
)
content = content.replace('</PlayCircle>\n                    </div>\n                  </div>', '</PlayCircle>\n                    </div>\n                  </motion.div>')
# Fix: The closing tag for compact list was `</div>`, but since it was a normal div replacing it to motion.div means we replace its closing tag.
# Let's use regex for the compact list closing tag replacement:
content = re.sub(
    r'(<PlayCircle size=\{18\}.*?/>\n\s*</div>\n\s*)</div>',
    r'\1</motion.div>',
    content
)

# 4. Insert expanded card view into AnimatePresence
expanded_view_code = """{selectedWarmup ? (
          <motion.div
            key="expanded-card"
            layoutId={`warmup-card-${selectedWarmup.id}`}
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col mb-10"
          >
            {/* Card Color Bar top */}
            <div className={`h-2 bg-gradient-to-r ${selectedWarmup.gradient}`} />

            <div className="p-6 md:p-8 flex-1">
              {/* Close Button / Back Button */}
              <button
                onClick={() => setSelectedWarmup(null)}
                className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider"
              >
                <X size={14} /> Back to Warm-Ups
              </button>

              {/* Header Information */}
              <div className="mb-8">
                <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${selectedWarmup.tagColor} mb-4 inline-block`}>
                  {selectedWarmup.activityType}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-4">
                  {selectedWarmup.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} /> {selectedWarmup.duration}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <span className="flex items-center gap-1.5">
                    <Trophy size={14} /> {selectedWarmup.engagementLevel} Engagement
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <span className="flex items-center gap-1.5">
                    <User size={14} /> By {selectedWarmup.author}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-sm">
                {/* Left Column: Objective & Tips */}
                <div className="lg:col-span-1 space-y-6">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">Objective</h4>
                    <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal bg-zinc-50 dark:bg-zinc-850 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                      {selectedWarmup.description}
                    </p>
                  </div>

                  {selectedWarmup.tips && (
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">Teacher Pro-Tips</h4>
                      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 p-5 rounded-2xl">
                        <p className="text-amber-800 dark:text-amber-400/90 leading-relaxed italic text-sm">
                          💡 {selectedWarmup.tips}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Step-by-Step Instructions */}
                <div className="lg:col-span-2">
                  <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">How to Play (Steps)</h4>
                  <div className="space-y-4">
                    {selectedWarmup.instructions.map((step, idx) => (
                      <div key={idx} className="flex gap-4 p-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                        <span 
                          className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold font-mono shadow-sm" 
                          style={{ backgroundColor: `${selectedWarmup.accent}15`, color: selectedWarmup.accent }}
                        >
                          {idx + 1}
                        </span>
                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed pt-1 text-base">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Quick Play CTA */}
            <div className="p-6 md:p-8 bg-zinc-50 dark:bg-zinc-850 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between mt-auto">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold tracking-wider">Ready to bring energy to class?</span>
              <button
                onClick={() => setSelectedWarmup(null)}
                className="px-8 py-3 bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-xs rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-md flex items-center gap-2"
              >
                Complete Activity <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        ) : filteredWarmups.length > 0 ? ("""

content = content.replace(
    '{filteredWarmups.length > 0 ? (',
    expanded_view_code
)

# 5. Remove the Detail Drawer Modal code block
modal_start = content.find('{/* ── Detail Drawer Modal ── */}')
if modal_start != -1:
    modal_end = content.find('    </div>\n  );\n};\n\nexport default WarmupsPage;')
    if modal_end != -1:
        # Erase from modal_start up to modal_end
        content = content[:modal_start] + content[modal_end:]

with open('src/pages/WarmupsPage.jsx', 'w') as f:
    f.write(content)

print("Done")
