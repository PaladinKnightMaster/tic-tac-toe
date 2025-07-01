"use client";
import React from 'react';
import { Board as BoardType } from '@/lib/types';
import { isWinningCell } from '@/lib/gameLogic';
import { Cell } from './Cell';

interface BoardProps {
  board: BoardType;
  winningLine: number[] | null;
  onCellClick: (row: number, col: number) => void;
  disabled: boolean;
}

export function Board({ board, winningLine, onCellClick, disabled }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-2 shadow-[0_0_32px_0_rgba(56,189,248,0.25)] dark:shadow-[0_0_32px_0_rgba(232,121,249,0.25)] rounded-2xl bg-white/30 dark:bg-black/30 backdrop-blur-md p-4">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            row={rowIndex}
            col={colIndex}
            isWinning={isWinningCell(rowIndex, colIndex, winningLine)}
            onClick={() => onCellClick(rowIndex, colIndex)}
            disabled={disabled}
          />
        ))
      )}
    </div>
  );
} 