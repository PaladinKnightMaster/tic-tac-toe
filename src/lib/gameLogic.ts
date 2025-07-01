import { Board, Player, GameState, GameStatus } from './types';

// Constants
export const BOARD_SIZE = 3;
export const WINNING_COMBINATIONS = [
  // Rows
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  // Columns
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  // Diagonals
  [0, 4, 8], [2, 4, 6]
];

// Initialize an empty board
export function createEmptyBoard(): Board {
  return Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
}

// Convert 2D board to 1D array for easier win checking
export function boardTo1D(board: Board): (Player | null)[] {
  return board.flat();
}

// Convert 1D index to 2D coordinates
export function indexTo2D(index: number): { row: number; col: number } {
  return {
    row: Math.floor(index / BOARD_SIZE),
    col: index % BOARD_SIZE
  };
}

// Convert 2D coordinates to 1D index
export function coordsTo1D(row: number, col: number): number {
  return row * BOARD_SIZE + col;
}

// Check if a move is valid
export function isValidMove(board: Board, row: number, col: number): boolean {
  return row >= 0 && row < BOARD_SIZE && 
         col >= 0 && col < BOARD_SIZE && 
         board[row][col] === null;
}

// Make a move on the board
export function makeMove(board: Board, row: number, col: number, player: Player): Board {
  if (!isValidMove(board, row, col)) {
    throw new Error(`Invalid move: ${row}, ${col}`);
  }
  
  const newBoard = board.map(row => [...row]);
  newBoard[row][col] = player;
  return newBoard;
}

// Check if the board is full (draw)
export function isBoardFull(board: Board): boolean {
  return board.every(row => row.every(cell => cell !== null));
}

// Check for a winner and return winning line
export function checkWinner(board: Board): { winner: Player | null; winningLine: number[] | null } {
  const board1D = boardTo1D(board);
  
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board1D[a] && board1D[a] === board1D[b] && board1D[a] === board1D[c]) {
      return { winner: board1D[a], winningLine: combination };
    }
  }
  
  return { winner: null, winningLine: null };
}

// Determine game status
export function getGameStatus(board: Board): GameStatus {
  const { winner } = checkWinner(board);
  
  if (winner) {
    return 'won';
  }
  
  if (isBoardFull(board)) {
    return 'draw';
  }
  
  return 'playing';
}

// Get the next player
export function getNextPlayer(currentPlayer: Player): Player {
  return currentPlayer === 'X' ? 'O' : 'X';
}

// Create initial game state
export function createInitialGameState(): GameState {
  return {
    board: createEmptyBoard(),
    currentPlayer: 'X',
    gameStatus: 'playing',
    winner: null,
    winningLine: null
  };
}

// Update game state after a move
export function updateGameState(
  currentState: GameState, 
  row: number, 
  col: number
): GameState {
  const newBoard = makeMove(currentState.board, row, col, currentState.currentPlayer);
  const { winner, winningLine } = checkWinner(newBoard);
  const gameStatus = getGameStatus(newBoard);
  const nextPlayer = getNextPlayer(currentState.currentPlayer);
  
  return {
    board: newBoard,
    currentPlayer: nextPlayer,
    gameStatus,
    winner,
    winningLine
  };
}

// Check if a cell is part of the winning line
export function isWinningCell(row: number, col: number, winningLine: number[] | null): boolean {
  if (!winningLine) return false;
  const index = coordsTo1D(row, col);
  return winningLine.includes(index);
}

// Get available moves
export function getAvailableMoves(board: Board): Array<{ row: number; col: number }> {
  const moves: Array<{ row: number; col: number }> = [];
  
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (isValidMove(board, row, col)) {
        moves.push({ row, col });
      }
    }
  }
  
  return moves;
} 