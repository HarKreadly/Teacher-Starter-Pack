// Filter Configurations
export const textbookFilters = [
  {
    id: 'level',
    title: 'Grade Level',
    options: [
      { label: '7th Grade', value: '7th Grade' },
      { label: '8th Grade', value: '8th Grade' },
      { label: '9th Grade', value: '9th Grade' },
      { label: '1st Bac', value: '1st Bac' },
      { label: '2nd Bac', value: '2nd Bac' },
      { label: 'Common Core', value: 'Common Core' },
    ]
  },
  {
    id: 'skill',
    title: 'Skill Focus',
    options: [
      { label: 'Reading', value: 'Reading' },
      { label: 'Writing', value: 'Writing' },
      { label: 'Listening', value: 'Listening' },
      { label: 'Speaking', value: 'Speaking' },
      { label: 'Grammar', value: 'Grammar' },
      { label: 'Vocabulary', value: 'Vocabulary' },
    ]
  }
];

export const warmUpFilters = [
  {
    id: 'activityType',
    title: 'Activity Type',
    options: [
      { label: 'TPR', value: 'TPR' },
      { label: 'Discussion', value: 'Discussion' },
      { label: 'Ice Breakers', value: 'Ice Breakers' },
      { label: 'Brainstorming', value: 'Brainstorming' },
      { label: 'Games', value: 'Games' },
    ]
  },
  {
    id: 'engagementLevel',
    title: 'Engagement Level',
    options: [
      { label: 'Low', value: 'Low' },
      { label: 'Medium', value: 'Medium' },
      { label: 'High', value: 'High' },
    ]
  }
];

// Mock Resources
export const mockResources = [
  {
    id: 1,
    title: "Present Simple Interactive Lesson",
    type: "lesson-plan",
    level: "8th Grade",
    skill: "Grammar",
    topic: "Present Simple",
    tags: ["verbs", "grammar", "present simple", "interactive"],
    format: "pdf",
    author: "Sarah Jenkins",
    description: "A complete 45-minute lesson plan for introducing and practicing the present simple tense with interactive group activities.",
    duration: "45 min",
    createdAt: "2026-05-09"
  },
  {
    id: 2,
    title: "Environment Vocabulary Match",
    type: "exercise",
    level: "1st Bac",
    skill: "Vocabulary",
    topic: "Environment",
    tags: ["environment", "matching", "vocabulary"],
    format: "pdf",
    author: "David Chen",
    description: "Matching exercise for advanced environmental vocabulary, perfect for 1st Bac students.",
    duration: "15 min",
    createdAt: "2026-05-08"
  },
  {
    id: 3,
    title: "Two Truths and a Lie Icebreaker",
    type: "warm-up",
    level: "Common Core",
    activityType: "Ice Breakers",
    engagementLevel: "High",
    tags: ["icebreaker", "speaking", "fun"],
    format: "pdf",
    author: "Emma Wilson",
    description: "A classic warm-up activity adapted for ESL classrooms to get students speaking immediately.",
    duration: "10 min",
    createdAt: "2026-05-07"
  },
  {
    id: 4,
    title: "Unit 3 Summative Assessment",
    type: "assessment",
    level: "2nd Bac",
    skill: "Reading",
    tags: ["test", "reading comprehension", "unit 3"],
    format: "docx",
    author: "Michael Brown",
    description: "Comprehensive reading assessment covering the topics from Unit 3. Includes answer key.",
    duration: "60 min",
    createdAt: "2026-05-06"
  },
  {
    id: 5,
    title: "Future Tense Debate Prompts",
    type: "warm-up",
    level: "9th Grade",
    activityType: "Discussion",
    engagementLevel: "High",
    tags: ["debate", "speaking", "future tense"],
    format: "pdf",
    author: "Sarah Jenkins",
    description: "Provocative questions using the future tense to stimulate class discussion.",
    duration: "15 min",
    createdAt: "2026-05-05"
  },
  {
    id: 6,
    title: "Gateway to English 2nd Bac - Unit 1 Guide",
    type: "textbook",
    level: "2nd Bac",
    skill: "Reading",
    tags: ["textbook", "guide", "unit 1"],
    format: "pdf",
    author: "Official Ministry",
    description: "Digital companion guide for the first unit of the Gateway to English textbook.",
    duration: "N/A",
    createdAt: "2026-05-01"
  }
];
