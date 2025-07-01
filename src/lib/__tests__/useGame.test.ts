import { renderHook, act, waitFor } from '@testing-library/react';
import { useGame } from '../useGame';

describe('useGame hook', () => {
  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useGame());
    expect(result.current.gameState.board.flat().every(cell => cell === null)).toBe(true);
    expect(result.current.gameState.currentPlayer).toBe('X');
    expect(result.current.gameState.gameStatus).toBe('playing');
    expect(result.current.gameState.winner).toBeNull();
    expect(result.current.gameHistory.moves).toEqual([]);
    expect(result.current.gameHistory.currentIndex).toBe(-1);
  });

  it('should make a move and update state', () => {
    const { result } = renderHook(() => useGame());
    act(() => {
      result.current.makeMove(0, 0);
    });
    expect(result.current.gameState.board[0][0]).toBe('X');
    expect(result.current.gameState.currentPlayer).toBe('O');
    expect(result.current.gameHistory.moves.length).toBe(1);
  });

  it('should not allow moves on occupied cells', () => {
    const { result } = renderHook(() => useGame());
    act(() => {
      result.current.makeMove(0, 0);
    });
    act(() => {
      const success = result.current.makeMove(0, 0);
      expect(success).toBe(false);
    });
    expect(result.current.gameHistory.moves.length).toBe(1);
  });

  it('should reset the game', () => {
    const { result } = renderHook(() => useGame());
    act(() => {
      result.current.makeMove(0, 0);
      result.current.resetGame();
    });
    expect(result.current.gameState.board.flat().every(cell => cell === null)).toBe(true);
    expect(result.current.gameHistory.moves).toEqual([]);
    expect(result.current.gameHistory.currentIndex).toBe(-1);
  });

  it('should navigate move history', async () => {
    const { result } = renderHook(() => useGame());
    act(() => {
      result.current.makeMove(0, 0); // X
      result.current.makeMove(1, 1); // O
      result.current.makeMove(2, 2); // X
    });
    act(() => {
      result.current.goToMove(1);
    });
    await waitFor(() => {
      expect(result.current.gameHistory.currentIndex).toBe(1);
      expect(result.current.gameState.board[0][0]).toBe('X');
      expect(result.current.gameState.board[1][1]).toBe('O');
      expect(result.current.gameState.board[2][2]).toBeNull();
    });
    act(() => {
      result.current.goToMove(-1);
    });
    await waitFor(() => {
      expect(result.current.gameHistory.currentIndex).toBe(-1);
      expect(result.current.gameState.board.flat().every(cell => cell === null)).toBe(true);
    });
  });

  it('should not go to an invalid move index (too low)', () => {
    const { result } = renderHook(() => useGame());
    act(() => {
      result.current.makeMove(0, 0);
      result.current.goToMove(-2); // invalid
    });
    expect(result.current.gameHistory.currentIndex).toBe(0);
  });

  it('should not go to an invalid move index (too high)', () => {
    const { result } = renderHook(() => useGame());
    act(() => {
      result.current.makeMove(0, 0);
      result.current.goToMove(5); // invalid
    });
    expect(result.current.gameHistory.currentIndex).toBe(0);
  });

  it('should not make a move if game is not playing', () => {
    const { result } = renderHook(() => useGame());
    act(() => {
      result.current.makeMove(0, 0); // X
      result.current.makeMove(0, 1); // O
      result.current.makeMove(0, 2); // X
      result.current.makeMove(1, 1); // O
      result.current.makeMove(1, 0); // X
      result.current.makeMove(1, 2); // O
      result.current.makeMove(2, 1); // X
      result.current.makeMove(2, 0); // O
      result.current.makeMove(2, 2); // X
    });
    const status = result.current.gameState.gameStatus;
    expect(status).toBe('draw');
    act(() => {
      const success = result.current.makeMove(0, 0);
      expect(success).toBe(false);
    });
  });

  it('should not make a move on an occupied cell', () => {
    const { result } = renderHook(() => useGame());
    act(() => {
      result.current.makeMove(0, 0);
    });
    act(() => {
      const success = result.current.makeMove(0, 0);
      expect(success).toBe(false);
    });
  });

  it('canGoBack and canGoForward edge cases', () => {
    const { result } = renderHook(() => useGame());
    // Initially, can't go back or forward
    expect(result.current.canGoBack()).toBe(false);
    expect(result.current.canGoForward()).toBe(false);
    // After a move, can go back but not forward
    act(() => {
      result.current.makeMove(0, 0);
    });
    expect(result.current.canGoBack()).toBe(true);
    expect(result.current.canGoForward()).toBe(false);
    // Go to start, can go forward
    act(() => {
      result.current.goToMove(-1);
    });
    expect(result.current.canGoBack()).toBe(false);
    expect(result.current.canGoForward()).toBe(true);
  });
}); 