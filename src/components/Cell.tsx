"use client";
import React from 'react';
import { Player } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CellProps {
  value: Player | null;
  row: number;
  col: number;
  isWinning: boolean;
  onClick: () => void;
  disabled: boolean;
}

export function Cell({ value, row, col, isWinning, onClick, disabled }: CellProps) {
  return (
    <button
      className={cn(
        "h-20 w-20 sm:h-20 sm:w-20 text-3xl font-bold rounded-xl shadow bg-white/90 dark:bg-black/70 transition-all duration-200 border-2 border-cyan-300 dark:border-fuchsia-400 flex items-center justify-center p-0",
        "hover:bg-fuchsia-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        isWinning && "bg-gradient-to-br from-fuchsia-400 to-emerald-300 text-white border-4 border-yellow-300 shadow-[0_0_16px_4px_rgba(253,224,71,0.7)] animate-pulse",
        value === 'X' && "text-blue-600 dark:text-blue-400",
        value === 'O' && "text-red-600 dark:text-red-400"
      )}
      onClick={onClick}
      disabled={disabled || value !== null}
      aria-label={`Cell ${row + 1}, ${col + 1}${value ? ` - ${value}` : ''}`}
      tabIndex={0}
    >
      {value}
    </button>
  );
} 