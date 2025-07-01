"use client";
import React from 'react';
import { GameStatus, Player } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, SkipBack, SkipForward } from 'lucide-react';

interface GameInfoProps {
  currentPlayer: Player;
  gameStatus: GameStatus;
  winner: Player | null;
  currentMoveNumber: number;
  totalMoves: number;
  canGoBack: boolean;
  canGoForward: boolean;
  onReset: () => void;
  onGoBack: () => void;
  onGoForward: () => void;
}

export function GameInfo({
  currentPlayer,
  gameStatus,
  winner,
  currentMoveNumber,
  totalMoves,
  canGoBack,
  canGoForward,
  onReset,
  onGoBack,
  onGoForward
}: GameInfoProps) {
  const getStatusMessage = () => {
    switch (gameStatus) {
      case 'won':
        return `🎉 ${winner} Wins!`;
      case 'draw':
        return "It's a Draw!";
      case 'playing':
        return `${currentPlayer}'s Turn`;
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (gameStatus) {
      case 'won':
        return 'bg-gradient-to-r from-emerald-400 to-fuchsia-500 text-white shadow-xl animate-bounce';
      case 'draw':
        return 'bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white shadow-lg animate-pulse';
      case 'playing':
        return 'bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white shadow-lg animate-none';
      default:
        return '';
    }
  };

  return (
    <div className="w-full max-w-xs p-6 sm:p-8 shadow-2xl bg-white/60 dark:bg-black/60 backdrop-blur-2xl border-0 flex flex-col items-center ring-2 ring-cyan-300/40 dark:ring-fuchsia-400/40 rounded-2xl">
      {/* Game Status */}
      <div className="text-center mb-4">
        <Badge className={`text-lg px-4 py-2 rounded-full font-semibold tracking-wide ${getStatusColor()}`}>
          {getStatusMessage()}
        </Badge>
      </div>

      {/* Move Counter */}
      <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">
        Move {currentMoveNumber} of {totalMoves}
      </div>

      {/* Game Controls */}
      <div className="flex justify-center gap-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onGoBack}
          disabled={!canGoBack}
          aria-label="Go to previous move"
          className="hover:scale-105 transition-all duration-200"
        >
          <SkipBack className="w-4 h-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onGoForward}
          disabled={!canGoForward}
          aria-label="Go to next move"
          className="hover:scale-105 transition-all duration-200"
        >
          <SkipForward className="w-4 h-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          aria-label="Reset game"
          className="hover:scale-105 transition-all duration-200"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Player Indicators */}
      <div className="flex justify-center gap-4">
        <div className={`text-center p-2 rounded transition-all duration-200 ${currentPlayer === 'X' && gameStatus === 'playing' ? 'bg-blue-100 dark:bg-blue-900 scale-110' : ''}`}>
          <div className="text-blue-600 dark:text-blue-400 font-bold text-lg">X</div>
          <div className="text-xs text-gray-500">Player X</div>
        </div>
        <div className={`text-center p-2 rounded transition-all duration-200 ${currentPlayer === 'O' && gameStatus === 'playing' ? 'bg-red-100 dark:bg-red-900 scale-110' : ''}`}>
          <div className="text-red-600 dark:text-red-400 font-bold text-lg">O</div>
          <div className="text-xs text-gray-500">Player O</div>
        </div>
      </div>
    </div>
  );
} 