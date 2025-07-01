import {
  createEmptyBoard,
  makeMove,
  isValidMove,
  checkWinner,
  getGameStatus,
  updateGameState,
  BOARD_SIZE,
  coordsTo1D,
  indexTo2D,
  createInitialGameState,
  isBoardFull,
  getAvailableMoves,
  isWinningCell
} from '../gameLogic';
import { Board } from '../types';

describe('Tic-Tac-Toe Game Logic', () => {
  it('should create an empty 3x3 board', () => {
    const board = createEmptyBoard();
    expect(board.length).toBe(BOARD_SIZE);
    expect(board.every(row => row.length === BOARD_SIZE)).toBe(true);
    expect(board.flat().every(cell => cell === null)).toBe(true);
  });

  it('should allow valid moves', () => {
    const board = createEmptyBoard();
    expect(isValidMove(board, 0, 0)).toBe(true);
    expect(isValidMove(board, 2, 2)).toBe(true);
  });

  it('should reject moves out of bounds', () => {
    const board = createEmptyBoard();
    expect(isValidMove(board, -1, 0)).toBe(false);
    expect(isValidMove(board, 0, 3)).toBe(false);
    expect(isValidMove(board, 3, 3)).toBe(false);
  });

  it('should reject moves on occupied cells', () => {
    let board = createEmptyBoard();
    board = makeMove(board, 0, 0, 'X');
    expect(isValidMove(board, 0, 0)).toBe(false);
  });

  it('should correctly apply a move', () => {
    let board = createEmptyBoard();
    board = makeMove(board, 1, 1, 'O');
    expect(board[1][1]).toBe('O');
  });

  it('should detect a row win', () => {
    let board = createEmptyBoard();
    board = makeMove(board, 0, 0, 'X');
    board = makeMove(board, 0, 1, 'X');
    board = makeMove(board, 0, 2, 'X');
    const { winner, winningLine } = checkWinner(board);
    expect(winner).toBe('X');
    expect(winningLine).toContain(0);
    expect(winningLine).toContain(1);
    expect(winningLine).toContain(2);
  });

  it('should detect a column win', () => {
    let board = createEmptyBoard();
    board = makeMove(board, 0, 1, 'O');
    board = makeMove(board, 1, 1, 'O');
    board = makeMove(board, 2, 1, 'O');
    const { winner, winningLine } = checkWinner(board);
    expect(winner).toBe('O');
    expect(winningLine).toContain(1);
    expect(winningLine).toContain(4);
    expect(winningLine).toContain(7);
  });

  it('should detect a diagonal win', () => {
    let board = createEmptyBoard();
    board = makeMove(board, 0, 0, 'X');
    board = makeMove(board, 1, 1, 'X');
    board = makeMove(board, 2, 2, 'X');
    const { winner, winningLine } = checkWinner(board);
    expect(winner).toBe('X');
    expect(winningLine).toContain(0);
    expect(winningLine).toContain(4);
    expect(winningLine).toContain(8);
  });

  it('should not detect a win when there is none', () => {
    let board = createEmptyBoard();
    board = makeMove(board, 0, 0, 'X');
    board = makeMove(board, 0, 1, 'O');
    board = makeMove(board, 0, 2, 'X');
    const { winner } = checkWinner(board);
    expect(winner).toBeNull();
  });

  it('should detect a draw when the board is full and no winner', () => {
    const board: Board = [
      ['X', 'O', 'X'],
      ['X', 'O', 'O'],
      ['O', 'X', 'X'],
    ];
    expect(getGameStatus(board)).toBe('draw');
  });

  it('should update game state and switch players', () => {
    let state = createInitialGameState();
    state = updateGameState(state, 0, 0);
    expect(state.board[0][0]).toBe('X');
    expect(state.currentPlayer).toBe('O');
    expect(state.gameStatus).toBe('playing');
  });

  it('should convert between 1D and 2D indices correctly', () => {
    expect(coordsTo1D(1, 2)).toBe(5);
    expect(indexTo2D(5)).toEqual({ row: 1, col: 2 });
  });

  it('should detect when the board is full', () => {
    const board: Board = [
      ['X', 'O', 'X'],
      ['O', 'X', 'O'],
      ['O', 'X', 'O'],
    ];
    expect(isBoardFull(board)).toBe(true);
    const notFull: Board = [
      ['X', 'O', 'X'],
      ['O', 'X', 'O'],
      ['O', 'X', null],
    ];
    expect(isBoardFull(notFull)).toBe(false);
  });

  it('should get available moves', () => {
    const board: Board = [
      ['X', 'O', null],
      ['O', 'X', 'O'],
      ['O', 'X', 'O'],
    ];
    const moves = getAvailableMoves(board);
    expect(moves).toEqual([{ row: 0, col: 2 }]);
  });

  it('should identify winning cells', () => {
    let board = createEmptyBoard();
    board = makeMove(board, 0, 0, 'X');
    board = makeMove(board, 0, 1, 'X');
    board = makeMove(board, 0, 2, 'X');
    const { winningLine } = checkWinner(board);
    expect(isWinningCell(0, 0, winningLine)).toBe(true);
    expect(isWinningCell(1, 1, winningLine)).toBe(false);
  });

  it('should throw error for invalid move', () => {
    let board = createEmptyBoard();
    board = makeMove(board, 0, 0, 'X');
    expect(() => makeMove(board, 0, 0, 'O')).toThrow();
    expect(() => makeMove(board, -1, 0, 'O')).toThrow();
    expect(() => makeMove(board, 0, 3, 'O')).toThrow();
  });

  it('should not update game state after win or draw', () => {
    const state = createInitialGameState();
    // Fill the board for a draw
    state.board = [
      ['X', 'O', 'X'],
      ['X', 'O', 'O'],
      ['O', 'X', 'X'],
    ];
    state.gameStatus = 'draw';
    expect(() => updateGameState(state, 0, 0)).toThrow();
  });
}); 