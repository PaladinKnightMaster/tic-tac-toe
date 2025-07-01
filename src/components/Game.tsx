"use client";
import React, { useEffect, useState } from 'react';
import { useGame } from '@/lib/useGame';
import { Board } from './Board';
import { GameInfo } from './GameInfo';
import { MoveHistory } from './MoveHistory';
import ToggleThemeButton from './ui/ToggleThemeButton';
import useSound from 'use-sound';
import dynamic from 'next/dynamic';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

const trendingGradient = "bg-gradient-to-br from-fuchsia-500 via-cyan-400 to-emerald-400";

export function Game() {
  const {
    gameState,
    gameHistory,
    makeMove,
    resetGame,
    goToMove,
    getCurrentMoveNumber,
    canGoBack,
    canGoForward
  } = useGame();

  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [boardAnim, setBoardAnim] = useState("opacity-0 scale-95");

  // Sound effects
  const [playMove] = useSound('/move.mp3', { volume: 0.5 });
  const [playWin] = useSound('/win.mp3', { volume: 0.5 });
  const [playDraw] = useSound('/draw.mp3', { volume: 0.5 });

  // Handle window resize for confetti
  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Board animation
  useEffect(() => {
    setTimeout(() => setBoardAnim("opacity-100 scale-100"), 80);
  }, [gameState.board.toString()]);

  // Play sounds and show confetti based on game events
  useEffect(() => {
    if (gameState.gameStatus === 'won') {
      setShowConfetti(true);
      playWin();
    } else if (gameState.gameStatus === 'draw') {
      playDraw();
    }
  }, [gameState.gameStatus, playWin, playDraw]);

  const handleCellClick = (row: number, col: number) => {
    const success = makeMove(row, col);
    if (success) {
      playMove();
    }
  };

  const handleGoBack = () => {
    if (canGoBack()) {
      goToMove(gameHistory.currentIndex - 1);
    }
  };

  const handleGoForward = () => {
    if (canGoForward()) {
      goToMove(gameHistory.currentIndex + 1);
    }
  };

  const handleMoveClick = (index: number) => {
    goToMove(index);
  };

  const handleReset = () => {
    resetGame();
    setBoardAnim("opacity-0 scale-95");
    setTimeout(() => setBoardAnim("opacity-100 scale-100"), 80);
    setShowConfetti(false);
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center ${trendingGradient} transition-all duration-500`}>
      {showConfetti && windowSize.width > 0 && (
        <Confetti 
          width={windowSize.width} 
          height={windowSize.height} 
          numberOfPieces={250} 
          recycle={false} 
          gravity={0.25} 
        />
      )}
      
      <div className="w-full max-w-6xl p-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-center mb-2 bg-gradient-to-r from-fuchsia-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
            Tic-Tac-Toe
          </h1>
          <div className="flex justify-center">
            <ToggleThemeButton />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Board */}
          <div className="lg:col-span-2 flex flex-col items-center">
            <div className={`transition-all duration-500 ${boardAnim}`}>
              <Board
                board={gameState.board}
                winningLine={gameState.winningLine}
                onCellClick={handleCellClick}
                disabled={gameState.gameStatus !== 'playing'}
              />
            </div>
          </div>

          {/* Game Info and Controls */}
          <div className="space-y-6">
            <GameInfo
              currentPlayer={gameState.currentPlayer}
              gameStatus={gameState.gameStatus}
              winner={gameState.winner}
              currentMoveNumber={getCurrentMoveNumber()}
              totalMoves={gameHistory.moves.length}
              canGoBack={canGoBack()}
              canGoForward={canGoForward()}
              onReset={handleReset}
              onGoBack={handleGoBack}
              onGoForward={handleGoForward}
            />

            <MoveHistory
              moves={gameHistory.moves}
              currentIndex={gameHistory.currentIndex}
              onMoveClick={handleMoveClick}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-sm text-white/80 drop-shadow-lg">
        Inspired by trending UI palettes & powered by Next.js, React 19, Tailwind, and shadcn/ui.
      </footer>
    </div>
  );
} 