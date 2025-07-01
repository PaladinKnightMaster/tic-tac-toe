"use client";
import React from 'react';
import { GameMove } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface MoveHistoryProps {
  moves: GameMove[];
  currentIndex: number;
  onMoveClick: (index: number) => void;
}

export function MoveHistory({ moves, currentIndex, onMoveClick }: MoveHistoryProps) {
  if (moves.length === 0) {
    return (
      <Card className="w-full max-w-xs p-6 sm:p-8 shadow-2xl bg-white/60 dark:bg-black/60 backdrop-blur-2xl border-0 ring-2 ring-cyan-300/40 dark:ring-fuchsia-400/40 rounded-2xl">
        <h3 className="text-lg font-semibold mb-2 text-center">Move History</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
          No moves yet. Start playing!
        </p>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-xs p-6 sm:p-8 shadow-2xl bg-white/60 dark:bg-black/60 backdrop-blur-2xl border-0 ring-2 ring-cyan-300/40 dark:ring-fuchsia-400/40 rounded-2xl">
      <h3 className="text-lg font-semibold mb-3 text-center">Move History</h3>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        <Button
          variant={currentIndex === -1 ? "default" : "outline"}
          size="sm"
          onClick={() => onMoveClick(-1)}
          className="w-full justify-start hover:scale-105 transition-all duration-200"
        >
          <span className="text-gray-500">#0</span>
          <span className="ml-2">Game start</span>
        </Button>
        
        {moves.map((move, index) => (
          <Button
            key={index}
            variant={currentIndex === index ? "default" : "outline"}
            size="sm"
            onClick={() => onMoveClick(index)}
            className="w-full justify-start hover:scale-105 transition-all duration-200"
          >
            <span className="text-gray-500">#{index + 1}</span>
            <span className="ml-2">
              Player {move.player} → ({move.row + 1}, {move.col + 1})
            </span>
          </Button>
        ))}
      </div>
    </Card>
  );
} 