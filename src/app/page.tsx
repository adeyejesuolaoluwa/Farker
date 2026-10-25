"use client";

import { useEffect, useState } from "react";

const worlds = [
  {
    name: "Logic Lab",
    accent: "from-cyan-400 to-blue-500",
    description: "Patterns, logic, deduction, and smart reasoning.",
    badge: "Level 1",
  },
  {
    name: "School Mastery",
    accent: "from-violet-500 to-purple-600",
    description: "Math, grammar, science, and stronger study habits.",
    badge: "Core Skills",
  },
  {
    name: "AI Brain Academy",
    accent: "from-amber-400 to-yellow-500",
    description: "Learn how AI thinks, compares options, and learns from data.",
    badge: "New",
  },
  {
    name: "Strategy Arena",
    accent: "from-pink-500 to-fuchsia-600",
    description: "Memory, planning, and decision-making missions.",
    badge: "Tactics",
  },
  {
    name: "Creative Thinkers",
    accent: "from-emerald-400 to-teal-500",
    description: "Imagination, algorithms, creative solutions, and ideas.",
    badge: "Invent",
  },
];

const dailyMissions = [
  "Complete 2 logic missions",
  "Earn 120 XP",
  "Solve 1 AI challenge",
];

function BrandMark() {
  return (
    <svg viewBox="0 0 120 120" className="h-12 w-12" aria-label="Goalk logo" role="img">
      <defs>
        <linearGradient id="goalk-gradient" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="50%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="52" fill="url(#goalk-gradient)" opacity="0.96" />
      <circle cx="60" cy="60" r="40" fill="#0c1830" opacity="0.85" />
      <circle cx="60" cy="60" r="22" fill="none" stroke="#facc15" strokeWidth="6" strokeDasharray="2 10" />
      <circle cx="60" cy="60" r="8" fill="#f8fafc" />
      <path
        d="M41 68c3-12 14-21 28-21 14 0 24 8 28 21-7 6-13 9-20 9-10 0-17-6-20-9-3 4-7 6-16 6Z"
        fill="#f8fafc"
        opacity="0.96"
      />
      <path d="M50 48c0-8 5-14 10-14 6 0 11 7 11 15" fill="none" stroke="#f8fafc" strokeWidth="5" strokeLinecap="round" />
      <path d="M46 75c5 3 13 5 17 5 4 0 11-2 16-5" fill="none" stroke="#facc15" strokeWidth="4" strokeLinecap="round" />
      <circle cx="75" cy="40" r="4" fill="#facc15" />
      <circle cx="48" cy="42" r="4" fill="#7dd3fc" />
    </svg>
  );
}

const achievements = [
  { title: "Pattern Scout", unlocked: true },
  { title: "Math Explorer", unlocked: true },
  { title: "Critical Thinker", unlocked: false },
  { title: "AI Detective", unlocked: false },
];

const mastery = [
  { subject: "Logic", value: 92 },
  { subject: "Math", value: 84 },
  { subject: "Science", value: 76 },
  { subject: "Reading", value: 88 },
  { subject: "AI", value: 71 },
];

const challengeBank = [
  {
    title: "The Missing Number",
    difficulty: "Level 1 · Warm-up",
    prompt: "What number comes next?",
    sequence: [3, 6, 12, 24, "?"],
    options: ["30", "36", "48", "42"],
    correctIndex: 2,
    explanation:
      "Each number is multiplied by 2 to get the next one: 3 × 2 = 6, 6 × 2 = 12, 12 × 2 = 24, so 24 × 2 = 48.",
    hint: "Look for a repeated pattern: what happens between each number?",
  },
  {
    title: "Growing Gaps",
    difficulty: "Level 2 · Thinker",
    prompt: "What number comes next?",
    sequence: [2, 5, 10, 17, 26, "?"],
    options: ["35", "37", "36", "39"],
    correctIndex: 1,
    explanation:
      "The gaps are 3, 5, 7, and 9: consecutive odd numbers. The next gap is 11, so 26 + 11 = 37.",
    hint: "Compare the gaps between neighboring numbers. Do the gaps follow a pattern?",
  },
  {
    title: "Double the Difference",
    difficulty: "Level 3 · Challenger",
    prompt: "What number comes next?",
    sequence: [4, 7, 13, 25, 49, "?"],
    options: ["95", "96", "97", "99"],
    correctIndex: 2,
    explanation:
      "Each step doubles the previous number and subtracts 1: 4 × 2 − 1 = 7, 7 × 2 − 1 = 13, and so on. Therefore 49 × 2 − 1 = 97.",
    hint: "Try doubling each number, then compare that result with the next term.",
  },
  {
    title: "Fibonacci Trail",
    difficulty: "Level 4 · Brain Bender",
    prompt: "What number comes next?",
    sequence: [2, 3, 5, 8, 13, "?"],
    options: ["18", "20", "21", "24"],
    correctIndex: 2,
    explanation:
      "Each number is the sum of the two before it: 2 + 3 = 5, 3 + 5 = 8, 5 + 8 = 13. So the next number is 8 + 13 = 21.",
    hint: "Check whether each term can be made by combining the two terms before it.",
  },
  {
    title: "Factorial Climb",
    difficulty: "Level 5 · Master",
    prompt: "What number comes next?",
    sequence: [1, 2, 6, 24, 120, "?"],
    options: ["480", "600", "720", "840"],
    correctIndex: 2,
    explanation:
      "The multipliers increase by one: ×2, ×3, ×4, ×5. The next step is ×6, so 120 × 6 = 720.",
    hint: "Look at the multiplier from one term to the next. It changes each time.",
  },
];

type PlayerState = {
  level: number;
  xp: number;
  coins: number;
  streak: number;
  world: string;
};

export default function Home() {
  const [player, setPlayer] = useState<PlayerState>(() => {
    const defaultPlayer: PlayerState = {
      level: 8,
      xp: 1200,
      coins: 180,
      streak: 5,
      world: "Logic Lab",
    };

    if (typeof window === "undefined") {
      return defaultPlayer;
    }

    try {
      const saved = window.localStorage.getItem("goalk-player");
      if (!saved) {
        return defaultPlayer;
      }

      return { ...defaultPlayer, ...(JSON.parse(saved) as Partial<PlayerState>) };
    } catch {
      return defaultPlayer;
    }
  });

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [seriesComplete, setSeriesComplete] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("goalk-player", JSON.stringify(player));
    }
  }, [player]);

  const currentChallenge = challengeBank[challengeIndex];

  const handleSubmit = () => {
    if (selectedOption === null || isSubmitted) return;

    const correct = selectedOption === currentChallenge.correctIndex;
    setResult(correct ? "correct" : "incorrect");

    if (correct) {
      setIsSubmitted(true);
      setPlayer((previous) => ({
        ...previous,
        xp: previous.xp + 120 + challengeIndex * 30,
        coins: previous.coins + 35 + challengeIndex * 5,
        streak: previous.streak + 1,
        world: "Logic Lab",
      }));
    } else {
      setAttempts((previous) => previous + 1);
      setShowHint(true);
    }
  };

  const handleNextChallenge = () => {
    if (seriesComplete) {
      setChallengeIndex(0);
      setSeriesComplete(false);
    } else if (challengeIndex === challengeBank.length - 1) {
      setSeriesComplete(true);
      setSelectedOption(null);
      setIsSubmitted(false);
      setShowHint(false);
      setResult(null);
      setAttempts(0);
      return;
    } else {
      setChallengeIndex((previous) => previous + 1);
    }

    setSelectedOption(null);
    setIsSubmitted(false);
    setShowHint(false);
    setResult(null);
    setAttempts(0);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const startAdventure = () => {
    scrollToSection("gameplay");
  };

  return (
    <main className="min-h-screen bg-[#071224] text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="rounded-[20px] border border-cyan-300/40 bg-slate-950/60 p-1.5 shadow-[0_0_30px_rgba(56,189,248,0.35)]">
            <BrandMark />
          </div>
          <div>
            <p className="text-xl font-black tracking-tight text-white">Goalk</p>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Level up your thinking</p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm text-slate-200 md:flex">
          <a href="#worlds" className="hover:text-cyan-300">Worlds</a>
          <a href="#dashboard" className="hover:text-cyan-300">Dashboard</a>
          <a href="#gameplay" className="hover:text-cyan-300">Challenges</a>
          <a href="#academy" className="hover:text-cyan-300">Academy</a>
        </nav>

        <button
          type="button"
          onClick={() => scrollToSection("gameplay")}
          className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/20"
        >
          Play Now
        </button>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),transparent_26%),radial-gradient(circle_at_right,_rgba(168,85,247,0.18),transparent_32%),linear-gradient(135deg,#071224_0%,#0d1d36_35%,#10162c_100%)]" />
        <div className="absolute left-1/2 top-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 pb-16 pt-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:pt-16">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-300/50 bg-yellow-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-yellow-100">
              <span className="h-2 w-2 rounded-full bg-yellow-300" />
              Smart learning adventure
            </div>

            <h1 className="max-w-xl text-5xl font-black leading-[1.02] tracking-tight text-white md:text-6xl">
              Train Your Brain. <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">Level Up</span> Your Future.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
              Goalk turns school skills into exciting missions. Explore logic puzzles, AI learning,
              creativity challenges, and real progress that feels like a game.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={startAdventure}
                className="rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-6 py-3 text-base font-bold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:scale-[1.02]"
              >
                Start Your Adventure
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("worlds")}
                className="rounded-full border border-slate-600 bg-slate-900/60 px-6 py-3 text-base font-semibold text-slate-100 transition hover:border-cyan-400/60 hover:text-cyan-200"
              >
                Explore Worlds
              </button>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 text-left">
              <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 backdrop-blur-sm">
                <p className="text-3xl font-black text-cyan-300">24k</p>
                <p className="mt-1 text-sm text-slate-300">brain quests</p>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 backdrop-blur-sm">
                <p className="text-3xl font-black text-yellow-300">4.9/5</p>
                <p className="mt-1 text-sm text-slate-300">player joy</p>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 backdrop-blur-sm">
                <p className="text-3xl font-black text-violet-300">87%</p>
                <p className="mt-1 text-sm text-slate-300">retention boost</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="glass-card relative overflow-hidden rounded-[32px] border border-slate-700 bg-slate-900/75 p-5 shadow-2xl shadow-cyan-950/50">
              <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-300">
                <span>Current mission</span>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-200">
                  +120 XP
                </span>
              </div>

              <div className="rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-950 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300">Rookie Thinker</p>
                    <p className="text-2xl font-black">Level {player.level}</p>
                  </div>
                  <div className="rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 px-3 py-2 text-sm font-black text-slate-950">
                    {player.coins} coins
                  </div>
                </div>

                <div className="mb-3 flex justify-between text-xs text-slate-300">
                  <span>Progress</span>
                  <span>{player.xp} XP</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />
                </div>

                <div className="mt-6 grid gap-3">
                  {[
                    "Logic Lab unlocked",
                    "Daily streak x{player.streak}",
                    "Achievement badge earned",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-200">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                        ✓
                      </span>
                      <span>{item.replace("{player.streak}", String(player.streak))}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="worlds" className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="mb-8 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Game worlds</p>
            <h2 className="mt-2 text-3xl font-black text-white">Choose your next quest</h2>
          </div>
          <button
            type="button"
            onClick={() => scrollToSection("gameplay")}
            className="hidden rounded-full border border-slate-700 bg-slate-900/50 px-4 py-2 text-sm text-slate-200 md:inline-flex"
          >
            Unlock all worlds
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {worlds.map((world) => (
            <article key={world.name} className="rounded-[28px] border border-slate-700 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/25">
              <div className={`mb-4 h-24 rounded-2xl bg-gradient-to-br ${world.accent} p-3`}>
                <div className="flex h-full items-end justify-between">
                  <span className="rounded-full border border-white/30 bg-white/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/90">
                    {world.badge}
                  </span>
                  <span className="text-4xl">★</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">{world.name}</h3>
              <p className="mt-2 min-h-[54px] text-sm leading-6 text-slate-300">{world.description}</p>
              <button
                type="button"
                onClick={startAdventure}
                className="mt-4 inline-flex rounded-full bg-slate-800 px-3 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-slate-700"
              >
                Enter world
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="dashboard" className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[30px] border border-slate-700 bg-slate-900/70 p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-500 text-2xl font-black text-slate-900">
                A
              </div>
              <div>
                <p className="text-sm text-slate-300">Player profile</p>
                <h3 className="text-2xl font-black">Ava Genius</h3>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">XP</p>
                <p className="mt-2 text-2xl font-black text-cyan-300">{player.xp}</p>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Coins</p>
                <p className="mt-2 text-2xl font-black text-yellow-300">{player.coins}</p>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Streak</p>
                <p className="mt-2 text-2xl font-black text-emerald-300">{player.streak}d</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm text-slate-200">
                <span>Daily missions</span>
                <span className="text-cyan-300">3/3</span>
              </div>
              <div className="space-y-3">
                {dailyMissions.map((mission) => (
                  <div key={mission} className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-950/50 px-3 py-3 text-sm text-slate-200">
                    <span>{mission}</span>
                    <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs text-emerald-300">Done</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-slate-700 bg-slate-900/70 p-5">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-2xl font-black">Subject mastery</h3>
              <button
                type="button"
                onClick={startAdventure}
                className="rounded-full bg-cyan-500/10 px-3 py-1.5 text-sm font-semibold text-cyan-200"
              >
                Continue playing
              </button>
            </div>

            <div className="space-y-4">
              {mastery.map((item) => (
                <div key={item.subject}>
                  <div className="mb-1 flex items-center justify-between text-sm text-slate-200">
                    <span>{item.subject}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {achievements.map((achievement) => (
                <div
                  key={achievement.title}
                  className={`rounded-2xl border px-3 py-3 text-sm ${
                    achievement.unlocked
                      ? "border-yellow-300/40 bg-yellow-500/10 text-yellow-100"
                      : "border-slate-700 bg-slate-950/50 text-slate-400"
                  }`}
                >
                  <div className="mb-2 text-lg">{achievement.unlocked ? "🏆" : "🔒"}</div>
                  <div className="font-semibold">{achievement.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="gameplay" className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
        <div className="rounded-[32px] border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 p-6 shadow-xl shadow-cyan-950/20">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Challenge screen</p>
              <h2 className="mt-2 text-3xl font-black text-white">
                {seriesComplete ? "Logic Lab complete!" : currentChallenge.title}
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-3 py-2 text-sm font-semibold text-violet-100">
              {seriesComplete ? "All 5 levels mastered" : currentChallenge.difficulty}
            </div>
          </div>

          {seriesComplete ? (
            <div className="rounded-[28px] border border-emerald-400/40 bg-emerald-500/10 p-8 text-center">
              <p className="text-2xl font-black text-emerald-100">Every puzzle solved. Brilliant work!</p>
              <p className="mx-auto mt-3 max-w-xl text-slate-200">
                You worked through five challenges that grew more complex at each level. Ready to sharpen your skills again?
              </p>
              <button
                type="button"
                onClick={handleNextChallenge}
                className="mt-6 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-6 py-3 font-bold text-slate-950"
              >
                Play again from Level 1
              </button>
            </div>
          ) : (
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[28px] border border-slate-700 bg-slate-950/50 p-5">
              <p className="mb-4 text-sm uppercase tracking-[0.2em] text-slate-300">Sequence</p>
              <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
                <span>Challenge {challengeIndex + 1} of {challengeBank.length}</span>
                <span>Correct answers earn {120 + challengeIndex * 30} XP</span>
              </div>
              <div className="mb-5 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 transition-all"
                  style={{ width: `${((challengeIndex + 1) / challengeBank.length) * 100}%` }}
                />
              </div>
              <div className="flex flex-wrap items-center gap-3 text-3xl font-black text-white md:text-4xl">
                {currentChallenge.sequence.map((item, index) => (
                  <span key={`${item}-${index}`} className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3">
                    {item}
                  </span>
                ))}
              </div>

              <p className="mt-6 text-lg text-slate-200">
                {currentChallenge.prompt}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {currentChallenge.options.map((option, index) => {
                  const isSelected = selectedOption === index;
                  const isCorrect = isSubmitted && index === currentChallenge.correctIndex;
                  const isWrongChoice = isSubmitted && isSelected && !isCorrect;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => !isSubmitted && setSelectedOption(index)}
                      className={`rounded-2xl border px-4 py-4 text-left text-lg font-semibold transition ${
                        isCorrect
                          ? "border-emerald-400 bg-emerald-500/15 text-emerald-100"
                          : isWrongChoice
                            ? "border-rose-400 bg-rose-500/15 text-rose-100"
                            : isSelected
                              ? "border-cyan-400 bg-cyan-500/10 text-cyan-100"
                              : "border-slate-700 bg-slate-900/60 text-slate-200 hover:border-slate-500"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setShowHint(true)}
                  className="rounded-full border border-slate-600 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-cyan-400/50 hover:text-cyan-200"
                >
                  Need a hint?
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={selectedOption === null || isSubmitted}
                  className="rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-5 py-2 text-sm font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Submit answer
                </button>
              </div>

              {showHint && !isSubmitted && (
                <div className="mt-5 rounded-2xl border border-yellow-400/40 bg-yellow-500/10 p-4 text-sm text-yellow-100">
                  <span className="font-semibold">Think before you answer:</span> {currentChallenge.hint}
                </div>
              )}
            </div>

            <div className="rounded-[28px] border border-slate-700 bg-slate-950/40 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Feedback</p>

              {result === "correct" ? (
                <div className="mt-4 rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-4 text-emerald-100">
                  <p className="text-lg font-black">Correct! +{120 + challengeIndex * 30} XP</p>
                  <p className="mt-2 text-sm leading-6 text-emerald-50">{currentChallenge.explanation}</p>
                </div>
              ) : result === "incorrect" ? (
                <div className="mt-4 rounded-2xl border border-rose-400/40 bg-rose-500/10 p-4 text-rose-100">
                  <p className="text-lg font-black">Not quite — have another try.</p>
                  <p className="mt-2 text-sm leading-6 text-rose-50">
                    {attempts > 1
                      ? currentChallenge.explanation
                      : "Look for a rule that stays consistent from one term to the next. Your progress is safe."}
                  </p>
                </div>
              ) : (
                <div className="mt-4 rounded-2xl border border-slate-700 bg-slate-900/60 p-4 text-slate-200">
                  <p className="text-lg font-bold">Think Before You Answer</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Identify the pattern, compare the options, and check whether each step follows the same rule.
                  </p>
                </div>
              )}

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/60 px-3 py-3 text-sm text-slate-200">
                  <span>Current world</span>
                  <span className="font-semibold text-cyan-300">{player.world}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/60 px-3 py-3 text-sm text-slate-200">
                  <span>Unlock next world</span>
                  <span className="font-semibold text-yellow-300">Next level</span>
                </div>
              </div>

              {isSubmitted && (
                <button
                  type="button"
                  onClick={handleNextChallenge}
                  className="mt-6 w-full rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 px-5 py-3 text-base font-black text-slate-900"
                >
                  {challengeIndex === challengeBank.length - 1 ? "Finish challenge set" : "Next harder challenge"}
                </button>
              )}
            </div>
          </div>
          )}
        </div>
      </section>

      <section id="academy" className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Learning academy</p>
            <h2 className="mt-2 text-3xl font-black text-white">Short lessons, big ideas</h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: "What is AI?",
              body: "AI learns patterns from data, compares possibilities, and follows rules to make decisions.",
            },
            {
              title: "If / Then Logic",
              body: "Logic systems use clear conditions. If one fact is true, then another outcome follows.",
            },
            {
              title: "Good questions beat blind trust",
              body: "A smart learner checks evidence, compares answers, and asks the right follow-up question.",
            },
          ].map((lesson) => (
            <article key={lesson.title} className="rounded-[28px] border border-slate-700 bg-slate-900/70 p-5">
              <div className="mb-4 inline-flex rounded-full bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                Lesson
              </div>
              <h3 className="text-xl font-black text-white">{lesson.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{lesson.body}</p>
              <button
                type="button"
                onClick={startAdventure}
                className="mt-5 rounded-full border border-slate-600 bg-slate-950/60 px-4 py-2 text-sm font-semibold text-slate-100 hover:border-cyan-400/50"
              >
                Start lesson
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
