export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Board = CellValue[][];
export type GameStatus = 'playing' | 'won' | 'draw';

export interface GameState {
  board: Board;
  currentPlayer: Player;
  gameStatus: GameStatus;
  winner: Player | null;
  winningLine: number[] | null;
}

export interface GameMove {
  row: number;
  col: number;
  player: Player;
}

export interface GameHistory {
  moves: GameMove[];
  currentIndex: number;
} 