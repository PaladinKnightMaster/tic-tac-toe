import { useState, useCallback } from 'react';
import { GameState, GameMove, GameHistory } from './types';
import { 
  createInitialGameState, 
  updateGameState, 
  createEmptyBoard,
  checkWinner,
  getGameStatus,
  getNextPlayer
} from './gameLogic';

export function useGame() {
  const [state, setState] = useState<{
    gameState: GameState;
    gameHistory: GameHistory;
  }>(() => ({
    gameState: createInitialGameState(),
    gameHistory: { moves: [], currentIndex: -1 }
  }));

  // Make a move
  const makeMove = useCallback((row: number, col: number) => {
    let didMove = false;
    setState(prev => {
      if (prev.gameState.gameStatus !== 'playing' || prev.gameState.board[row][col] !== null) {
        return prev;
      }
      const newGameState = updateGameState(prev.gameState, row, col);
      const newMove: GameMove = {
        row,
        col,
        player: prev.gameState.currentPlayer
      };
      const newMoves = prev.gameHistory.moves.slice(0, prev.gameHistory.currentIndex + 1);
      newMoves.push(newMove);
      didMove = true;
      return {
        gameState: newGameState,
        gameHistory: {
          moves: newMoves,
          currentIndex: newMoves.length - 1
        }
      };
    });
    return didMove;
  }, []);

  // Reset the game
  const resetGame = useCallback(() => {
    setState(() => ({
      gameState: createInitialGameState(),
      gameHistory: { moves: [], currentIndex: -1 }
    }));
  }, []);

  // Go to a specific move in history
  const goToMove = useCallback((moveIndex: number) => {
    setState(prev => {
      if (moveIndex < -1 || moveIndex >= prev.gameHistory.moves.length) {
        return prev;
      }
      if (moveIndex === -1) {
        return {
          ...prev,
          gameState: createInitialGameState(),
          gameHistory: { ...prev.gameHistory, currentIndex: -1 }
        };
      }
      // Reconstruct board up to the selected move
      const board = createEmptyBoard();
      const moves = prev.gameHistory.moves.slice(0, moveIndex + 1);
      for (const move of moves) {
        board[move.row][move.col] = move.player;
      }
      const { winner, winningLine } = checkWinner(board);
      const gameStatus = getGameStatus(board);
      const currentPlayer = moveIndex % 2 === 0 ? 'X' : 'O';
      return {
        ...prev,
        gameState: {
          board,
          currentPlayer: getNextPlayer(currentPlayer),
          gameStatus,
          winner,
          winningLine
        },
        gameHistory: { ...prev.gameHistory, currentIndex: moveIndex }
      };
    });
  }, []);

  // Get current move number
  const getCurrentMoveNumber = useCallback(() => {
    return state.gameHistory.currentIndex + 1;
  }, [state.gameHistory.currentIndex]);

  // Check if we can go back
  const canGoBack = useCallback(() => {
    return state.gameHistory.currentIndex >= 0;
  }, [state.gameHistory.currentIndex]);

  // Check if we can go forward
  const canGoForward = useCallback(() => {
    return state.gameHistory.currentIndex < state.gameHistory.moves.length - 1;
  }, [state.gameHistory.currentIndex, state.gameHistory.moves.length]);

  return {
    gameState: state.gameState,
    gameHistory: state.gameHistory,
    makeMove,
    resetGame,
    goToMove,
    getCurrentMoveNumber,
    canGoBack,
    canGoForward
  };
} 