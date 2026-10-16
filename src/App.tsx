/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowUpRight,
  ExternalLink,
  Copy,
  Check,
  Download,
  Terminal,
  GitBranch,
  Film,
  Cpu,
} from 'lucide-react';

const ROJO_TREE_SNIPPET = `the-rising-miracle/
├── default.project.json       # Rojo build & sync manifest
├── aftman.toml                # Toolchain pinning (rojo, selene, stylua)
├── src/
│   ├── ServerScriptService/
│   │   ├── CombatEngine/
│   │   │   ├── TurnAuthority.server.luau
│   │   │   ├── ActionValidator.luau
│   │   │   └── StateReplicator.luau
│   ├── ReplicatedStorage/
│   │   ├── Shared/
│   │   │   ├── CombatTypes.luau
│   │   │   └── NetworkPackets.luau
│   └── StarterPlayerScripts/
│       └── CombatClientController.client.luau`;

const LUAU_VALIDATOR_SNIPPET = `--!strict
-- Server-Authoritative Turn Action Validator (The Rising Miracle)
local CombatTypes = require(game.ReplicatedStorage.Shared.CombatTypes)

local ActionValidator = {}

function ActionValidator.validateTurnIntent(
    matchState: CombatTypes.MatchState,
    playerUserId: number,
    payload: CombatTypes.ActionPayload
): (boolean, string?)
    if matchState.activeTurnOwner ~= playerUserId then
        return false, "TurnOwnershipMismatch"
    end
    if os.clock() - matchState.turnStartedAt > matchState.turnDurationLimit then
        return false, "TurnWindowExpired"
    end
    local actor = matchState.combatants[playerUserId]
    if not actor or actor.stamina < payload.requiredStamina then
        return false, "InsufficientResourcePool"
    end
    return true, nil
end

return ActionValidator`;

const POP32_CPP_SNIPPET = `// POP32 (ESP32) Autonomous Line-Tracking PD Control Routine
#include <POP32.h>

const int NUM_SENSORS = 5;
const int sensorPins[NUM_SENSORS] = {0, 1, 2, 3, 4};
const int threshold[NUM_SENSORS]  = {1850, 1820, 1790, 1830, 1860};

float Kp = 18.5f;
float Kd = 42.0f;
float prevError = 0.0f;
int baseSpeed = 55;

void trackLinePD() {
    float weightedSum = 0.0f;
    int activeCount = 0;
    const float weights[NUM_SENSORS] = {-2.0f, -1.0f, 0.0f, 1.0f, 2.0f};

    for (int i = 0; i < NUM_SENSORS; i++) {
        int raw = analog(sensorPins[i]);
        if (raw < threshold[i]) {
            weightedSum += weights[i];
            activeCount++;
        }
    }

    float error = (activeCount > 0) ? (weightedSum / activeCount) : prevError;
    float derivative = error - prevError;
    float correction = (Kp * error) + (Kd * derivative);
    prevError = error;

    int leftMotor  = constrain((int)(baseSpeed + correction), -100, 100);
    int rightMotor = constrain((int)(baseSpeed - correction), -100, 100);
    motor(1, leftMotor);
    motor(2, rightMotor);
}`;

const MANIM_PYTHON_SNIPPET = `# Manim Community Edition — 3D Shadow Projection & Vector Geometry
from manim import *
import numpy as np

class ShadowProjectionScene(ThreeDScene):
    def construct(self):
        axes = ThreeDAxes(x_range=[-4, 4], y_range=[-4, 4], z_range=[0, 4])
        self.set_camera_orientation(phi=68 * DEGREES, theta=-45 * DEGREES)

        light_source = np.array([0.0, 0.0, 3.6])
        polyhedron = Icosahedron(edge_length=1.2).shift(OUT * 1.6)
        polyhedron.set_stroke(color=PURPLE_B, width=2.0)

        def project_to_z0(point: np.ndarray) -> np.ndarray:
            direction = point - light_source
            t = -light_source[2] / direction[2]
            return light_source + t * direction

        shadow_mesh = polyhedron.copy().apply_function(project_to_z0)
        shadow_mesh.set_fill(color=VIOLET_D, opacity=0.35).set_stroke(VIOLET_B, 1.5)

        self.play(Create(axes), FadeIn(polyhedron))
        self.play(TransformFromCopy(polyhedron, shadow_mesh), run_time=2.2)
        self.wait(1)`;

export default function App() {
  const [gameViewTab, setGameViewTab] = useState<'rojo' | 'luau'>('rojo');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleDownloadStandaloneHtml = () => {
    const htmlContent = document.documentElement.outerHTML;
    const blob = new Blob([`<!doctype html>\n${htmlContent}`], {
      type: 'text/html;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#090a10] text-slate-100 flex flex-col">
      {/* 1. HEADER / NAVIGATION (Strict 3-Zone Top Bar Contract) */}
      <header className="sticky top-0 z-40 bg-[#090a10]/85 backdrop-blur-md border-b border-purple-900/40">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Brand wordmark */}
          <a
            href="#top"
            className="font-display text-lg font-bold tracking-tight text-slate-100 hover:text-purple-400 transition-colors whitespace-nowrap shrink-0"
          >
            bacondev123.github.io
          </a>

          {/* Zone 2: Navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400"
          >
            <a
              href="#projects"
              className="hover:text-purple-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Projects
            </a>
            <a
              href="#robotics"
              className="hover:text-purple-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Robotics
            </a>
            <a
              href="#visualizations"
              className="hover:text-purple-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Visualizations
            </a>
            <a
              href="https://github.com/bacondev123"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              GitHub
            </a>
          </nav>

          {/* Zone 3: Primary actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleDownloadStandaloneHtml}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-purple-950/25 hover:bg-purple-950/45 border border-purple-900/40 hover:border-purple-500/60 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-purple-400" />
              <span>Export index.html</span>
            </button>
            <a
              href="https://github.com/bacondev123"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 shadow-lg shadow-purple-500/10 rounded-lg transition-colors whitespace-nowrap"
            >
              <span>@bacondev123</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* 2. HERO SECTION */}
        <section className="max-w-[1200px] mx-auto px-6 pt-14 pb-20 md:pt-20 md:pb-24 border-b border-purple-900/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              {/* Unboxed Metadata Line */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                <span className="text-purple-400 font-medium">bacondev123</span>
                <span aria-hidden="true">·</span>
                <span>9th-Grade Systems & Game Developer</span>
                <span aria-hidden="true">·</span>
                <span>Thailand</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-50 leading-[1.12] max-w-2xl">
                Engineering Game Systems, Embedded Logic & Visual Mathematics.
              </h1>

              <p className="text-base text-slate-300 leading-relaxed max-w-[64ch]">
                9th-grade developer building server-authoritative turn-based game systems in Luau
                (Rojo toolchain) and tuning embedded control routines for robotics.
              </p>

              {/* Quick Stack Line (Unboxed clean metadata) */}
              <div className="pt-1 flex flex-wrap items-center gap-3 text-xs font-mono text-indigo-400">
                <span>Luau / Rojo</span>
                <span aria-hidden="true" className="text-slate-600">•</span>
                <span>C++ / POP32</span>
                <span aria-hidden="true" className="text-slate-600">•</span>
                <span>Python / Manim</span>
                <span aria-hidden="true" className="text-slate-600">•</span>
                <span>Git CLI</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="https://github.com/bacondev123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 shadow-lg shadow-purple-500/10 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>View Repositories</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-100 bg-purple-950/20 hover:bg-purple-950/40 border border-purple-900/40 hover:border-purple-500/60 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>Explore Architecture</span>
                  <ArrowUpRight className="w-4 h-4 text-purple-400" />
                </a>
              </div>
            </div>

            {/* Hero Terminal Session Box */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-purple-900/40 hover:border-purple-500/60 bg-[#0b0c16]/90 backdrop-blur-md shadow-lg shadow-purple-500/10 overflow-hidden transition-colors">
                <div className="px-4 py-3 border-b border-purple-900/40 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>rojo-sync · aftman.toml · git-cli</span>
                  <span className="text-purple-400 tabular-nums">port 34872</span>
                </div>
                <div className="p-5 font-mono text-xs space-y-2.5 text-slate-300 leading-relaxed">
                  <p className="text-slate-400">$ rojo serve default.project.json</p>
                  <p className="text-purple-400">
                    Rojo server listening on 127.0.0.1:34872 (The Rising Miracle)
                  </p>
                  <p className="text-slate-400 pt-2">$ git status --short</p>
                  <p className="text-indigo-400">
                    M src/ServerScriptService/CombatEngine/TurnAuthority.server.luau
                  </p>
                  <p className="text-indigo-400">
                    M robotics/pop32_pd_line_tracker/pop32_pd_line_tracker.ino
                  </p>
                  <p className="text-violet-400">
                    M scenes/shadow_projection_3d.py
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FEATURED WORK (3 Core Showcase Cards) */}
        <section id="projects" className="max-w-[1200px] mx-auto px-6 py-16 md:py-20 space-y-12">
          <div>
            <p className="text-xs font-mono text-purple-400 mb-2">
              Core Engineering Domains · Luau · Embedded C++ · Python Manim
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-50">
              01. Featured Technical Work
            </h2>
          </div>

          {/* CARD 1: Game Dev — The Rising Miracle */}
          <article className="rounded-2xl border border-purple-900/40 hover:border-purple-500/60 bg-[#0b0c16]/90 backdrop-blur-md shadow-lg shadow-purple-500/10 overflow-hidden transition-colors">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-purple-900/40">
                <div className="space-y-4">
                  {/* Unboxed Metadata */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-purple-400">
                    <span>Luau</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>Rojo</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>Aftman</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>VS Code</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>Git CLI</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-50">
                    The Rising Miracle — Server-Authoritative Turn-Based Combat
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    Production codebase featuring modular state management, server-authoritative
                    validation to prevent exploiters, and clean networking replication architecture.
                  </p>

                  {/* Real 16:9 OBS Gameplay Video Container */}
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-purple-900/40 bg-purple-950/20">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="relative z-10 w-full h-full object-cover"
                    >
                      <source src="assets/combat_demo.mp4" type="video/mp4" />
                    </video>
                    {/* Fallback subtle overlay text: "OBS Combat Gameplay Demo" */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center pointer-events-none">
                      <Film className="w-5 h-5 text-purple-400/70 mb-2" />
                      <span className="text-xs font-mono text-purple-300/80">
                        OBS Combat Gameplay Demo
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 mt-1">
                        assets/combat_demo.mp4
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-purple-900/40 flex items-center justify-between text-xs text-slate-400">
                  <span>Zero client trust · Strict typechecking (--!strict)</span>
                  <a
                    href="https://github.com/bacondev123"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 font-semibold hover:underline inline-flex items-center gap-1 whitespace-nowrap"
                  >
                    <span>GitHub Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Right Column: Rojo File Structure & Validator Code Mockup */}
              <div className="lg:col-span-6 p-6 sm:p-8 bg-[#090a10]/60 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1 p-1 bg-[#0b0c16] border border-purple-900/40 rounded-lg">
                      <button
                        type="button"
                        onClick={() => setGameViewTab('rojo')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                          gameViewTab === 'rojo'
                            ? 'bg-violet-600 text-white font-semibold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Rojo Project Tree
                      </button>
                      <button
                        type="button"
                        onClick={() => setGameViewTab('luau')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                          gameViewTab === 'luau'
                            ? 'bg-violet-600 text-white font-semibold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        ActionValidator.luau
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          'card-1',
                          gameViewTab === 'rojo' ? ROJO_TREE_SNIPPET : LUAU_VALIDATOR_SNIPPET
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-purple-950/30 hover:bg-purple-950/50 border border-purple-900/40 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                    >
                      {copiedId === 'card-1' ? (
                        <Check className="w-3.5 h-3.5 text-purple-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedId === 'card-1' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <pre className="rounded-xl border border-purple-900/40 bg-[#07080d] p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                    <code>
                      {gameViewTab === 'rojo' ? ROJO_TREE_SNIPPET : LUAU_VALIDATOR_SNIPPET}
                    </code>
                  </pre>
                </div>

                <div className="mt-6 pt-4 border-t border-purple-900/40 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-slate-400">Replication Model</p>
                    <p className="font-mono text-slate-200 mt-0.5">
                      Server State Machine → Delta Snapshots
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Exploit Mitigation</p>
                    <p className="font-mono text-purple-400 mt-0.5">
                      Server Cooldown & Stamina Verification
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* CARD 2 & CARD 3 Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* CARD 2: Robotics & Hardware */}
            <article
              id="robotics"
              className="rounded-2xl border border-purple-900/40 hover:border-purple-500/60 bg-[#0b0c16]/90 backdrop-blur-md shadow-lg shadow-purple-500/10 p-6 sm:p-8 flex flex-col justify-between transition-colors"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-indigo-400">
                  <span>C++</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>Arduino</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>POP32 (ESP32)</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>ATX2</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>PD Controller</span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-50">
                  Autonomous Robotics Control & Sensor Routines
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Hardware routines for school robotics club tasks. Includes practical PD control
                  loops for line tracking, analog sensor threshold tuning, and hardware actuation.
                </p>

                {/* Real Hardware Media Embed Container */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-purple-900/40 bg-purple-950/20">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="assets/robotics_hardware.jpg"
                    className="relative z-10 w-full h-full object-cover"
                  >
                    <source src="assets/robotics_demo.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center pointer-events-none">
                    <Cpu className="w-5 h-5 text-indigo-400/70 mb-2" />
                    <span className="text-xs font-mono text-purple-300/80">
                      POP32 / ATX2 Hardware & Line-Tracking Capture
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 mt-1">
                      assets/robotics_demo.mp4 · assets/robotics_hardware.jpg
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-mono text-slate-400">
                    robotics/pop32_pd_line_tracker.ino
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy('card-2', POP32_CPP_SNIPPET)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-300 bg-purple-950/30 hover:bg-purple-950/50 border border-purple-900/40 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {copiedId === 'card-2' ? (
                      <Check className="w-3.5 h-3.5 text-purple-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedId === 'card-2' ? 'Copied Routine' : 'Copy C++ Routine'}</span>
                  </button>
                </div>

                <pre className="rounded-xl border border-purple-900/40 bg-[#07080d] p-4 text-xs font-mono text-slate-200 overflow-x-auto max-h-56 leading-relaxed">
                  <code>{POP32_CPP_SNIPPET}</code>
                </pre>
              </div>

              <div className="pt-5 mt-6 border-t border-purple-900/40 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400">
                  MCU: POP32 (ESP32) · ATX2 Controller
                </span>
                <a
                  href="https://github.com/bacondev123/robotics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 font-semibold hover:underline inline-flex items-center gap-1 whitespace-nowrap"
                >
                  <span>bacondev123/robotics</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>

            {/* CARD 3: Mathematics & Manim Visualizations */}
            <article
              id="visualizations"
              className="rounded-2xl border border-purple-900/40 hover:border-purple-500/60 bg-[#0b0c16]/90 backdrop-blur-md shadow-lg shadow-purple-500/10 p-6 sm:p-8 flex flex-col justify-between transition-colors"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-purple-400">
                  <span>Python</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>Manim Community Edition</span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-50">
                  Mathematical Animations & Geometry Visuals
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Programmatic mathematical visualizations rendering geometry and shadow projection
                  algorithms using Python.
                </p>

                {/* Real 16:9 Manim Video Embed Container */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-purple-900/40 bg-purple-950/20">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="relative z-10 w-full h-full object-cover"
                  >
                    <source src="assets/manim_render.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center pointer-events-none">
                    <Film className="w-5 h-5 text-purple-400/70 mb-2" />
                    <span className="text-xs font-mono text-purple-300/80">
                      Manim Community Edition Video Render
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 mt-1">
                      assets/manim_render.mp4
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-mono text-slate-400">
                    scenes/shadow_projection_3d.py
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy('card-3', MANIM_PYTHON_SNIPPET)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-300 bg-purple-950/30 hover:bg-purple-950/50 border border-purple-900/40 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {copiedId === 'card-3' ? (
                      <Check className="w-3.5 h-3.5 text-purple-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedId === 'card-3' ? 'Copied Script' : 'Copy Manim Script'}</span>
                  </button>
                </div>

                <pre className="rounded-xl border border-purple-900/40 bg-[#07080d] p-4 text-xs font-mono text-slate-200 overflow-x-auto max-h-56 leading-relaxed">
                  <code>{MANIM_PYTHON_SNIPPET}</code>
                </pre>
              </div>

              <div className="pt-5 mt-6 border-t border-purple-900/40 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400">
                  60fps 1080p MP4 Renders · Ray-Plane Projection
                </span>
                <a
                  href="https://github.com/bacondev123/MathAnimations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 font-semibold hover:underline inline-flex items-center gap-1 whitespace-nowrap"
                >
                  <span>bacondev123/MathAnimations</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          </div>
        </section>

        {/* 4. GITHUB REPOSITORIES / ACTIVITY */}
        <section className="border-t border-purple-900/40 bg-[#0b0c16]/70 py-16 md:py-20">
          <div className="max-w-[1200px] mx-auto px-6 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="text-xs font-mono text-indigo-400 mb-2">
                  Open-Source Codebases · github.com/bacondev123
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-50">
                  02. Public GitHub Repositories & Workflow
                </h2>
              </div>

              <a
                href="https://github.com/bacondev123"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-100 bg-purple-950/25 hover:bg-purple-950/45 border border-purple-900/40 hover:border-purple-500/60 rounded-lg transition-colors whitespace-nowrap self-start"
              >
                <GitBranch className="w-3.5 h-3.5 text-purple-400" />
                <span>Open github.com/bacondev123</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Repo 1: robotics */}
              <a
                href="https://github.com/bacondev123/robotics"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-purple-900/40 bg-[#0b0c16]/90 backdrop-blur-md p-6 flex flex-col justify-between hover:border-purple-500/60 shadow-lg shadow-purple-500/10 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                    <span>C++ · POP32 · ATX2</span>
                    <span className="text-indigo-400">Public Repository</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-50 group-hover:text-purple-400 transition-colors inline-flex items-center gap-2">
                    <span>robotics</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    C++ hardware scratchpad & PD routines for autonomous robot line tracking,
                    reflectance sensor calibration, and motor actuation on POP32 (ESP32) and ATX2
                    controllers.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-purple-900/40 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Proportional-Derivative Control · Sensor Arrays</span>
                  <span className="text-purple-300 group-hover:underline">Inspect Source →</span>
                </div>
              </a>

              {/* Repo 2: MathAnimations */}
              <a
                href="https://github.com/bacondev123/MathAnimations"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-purple-900/40 bg-[#0b0c16]/90 backdrop-blur-md p-6 flex flex-col justify-between hover:border-purple-500/60 shadow-lg shadow-purple-500/10 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                    <span>Python · Manim CE</span>
                    <span className="text-purple-400">Public Repository</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-50 group-hover:text-purple-400 transition-colors inline-flex items-center gap-2">
                    <span>MathAnimations</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    Python Manim scripts & video renders demonstrating programmatic geometry,
                    coordinate transformations, and 3D shadow projection algorithms.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-purple-900/40 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Vector Projections · Procedural Animation</span>
                  <span className="text-purple-300 group-hover:underline">Inspect Source →</span>
                </div>
              </a>
            </div>

            {/* Active Daily Git Commitment & Terminal Workflow Callout */}
            <div className="rounded-2xl border border-purple-900/40 hover:border-purple-500/60 bg-[#090a10] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg shadow-purple-500/10 transition-colors">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
                  <Terminal className="w-4 h-4" />
                  <span>Terminal-Driven Engineering Workflow</span>
                </div>
                <p className="font-display text-base sm:text-lg font-bold text-slate-100">
                  Active Daily Git CLI Commits · Rojo + Aftman + Selene Toolchain
                </p>
                <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
                  All game architecture, embedded C++ sketches, and Manim scenes are managed via
                  command-line Git, versioned toolchains, and modular directory structures.
                </p>
              </div>

              <a
                href="https://github.com/bacondev123"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 shadow-lg shadow-purple-500/10 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <span>View Contribution Graph</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 5. FOOTER */}
      <footer className="border-t border-purple-900/40 bg-[#090a10] py-10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <p className="font-display text-sm font-bold text-slate-200">
              bacondev123.github.io — 9th-Grade Systems & Game Developer
            </p>
            <p className="mt-1">Built with raw HTML & Tailwind CSS • Hosted on GitHub Pages</p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://github.com/bacondev123"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 hover:underline underline-offset-4 transition-colors"
            >
              https://github.com/bacondev123
            </a>
            <a
              href="https://github.com/bacondev123/robotics"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 hover:underline underline-offset-4 transition-colors"
            >
              robotics
            </a>
            <a
              href="https://github.com/bacondev123/MathAnimations"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 hover:underline underline-offset-4 transition-colors"
            >
              MathAnimations
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
