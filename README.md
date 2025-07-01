# Tic-Tac-Toe Game

A modern, well-structured tic-tac-toe game built with Next.js, TypeScript, and React, following software engineering best practices.

## 🏗️ Architecture & Design Principles

This project demonstrates clean architecture with clear separation of concerns:

### 📁 Project Structure
```
src/
├── lib/                    # Core business logic
│   ├── types.ts           # TypeScript type definitions
│   ├── gameLogic.ts       # Pure game logic functions
│   └── useGame.ts         # Custom React hook for game state
├── components/            # React components
│   ├── Game.tsx          # Main game orchestrator
│   ├── Board.tsx         # Game board component
│   ├── Cell.tsx          # Individual cell component
│   ├── GameInfo.tsx      # Game status and controls
│   ├── MoveHistory.tsx   # Move history navigation
│   └── ui/               # Reusable UI components
└── app/                  # Next.js app directory
```

### 🎯 Separation of Concerns

1. **Types (`lib/types.ts`)**: Centralized TypeScript definitions
   - `Player`, `CellValue`, `Board`, `GameStatus`
   - `GameState`, `GameMove`, `GameHistory` interfaces

2. **Game Logic (`lib/gameLogic.ts`)**: Pure functions for game operations
   - Board manipulation and validation
   - Win detection algorithms
   - Game state calculations
   - No side effects or dependencies

3. **State Management (`lib/useGame.ts`)**: Custom React hook
   - Game state management
   - Move history tracking
   - Navigation controls
   - Encapsulated business logic

4. **UI Components**: Reusable, focused components
   - Each component has a single responsibility
   - Proper TypeScript interfaces
   - Accessible and responsive design

## 🚀 Features

### Core Gameplay
- ✅ Classic 3x3 tic-tac-toe gameplay
- ✅ Turn-based player system (X and O)
- ✅ Win detection for rows, columns, and diagonals
- ✅ Draw detection when board is full
- ✅ Visual highlighting of winning combinations

### Advanced Features
- ✅ **Move History**: Complete game replay functionality
- ✅ **Time Travel**: Navigate through previous moves
- ✅ **Game Reset**: Start fresh games
- ✅ **Sound Effects**: Audio feedback for moves, wins, and draws
- ✅ **Dark Mode**: Toggle between light and dark themes
- ✅ **Responsive Design**: Works on desktop and mobile

### Developer Experience
- ✅ **TypeScript**: Full type safety throughout the application
- ✅ **ESLint**: Code quality and consistency
- ✅ **Tailwind CSS**: Utility-first styling
- ✅ **Accessibility**: ARIA labels and keyboard navigation
- ✅ **Performance**: Optimized React components with proper memoization

## 🛠️ Technical Implementation

### Game Logic Architecture
```typescript
// Pure functions for game operations
export function makeMove(board: Board, row: number, col: number, player: Player): Board
export function checkWinner(board: Board): { winner: Player | null; winningLine: number[] | null }
export function getGameStatus(board: Board): GameStatus
```

### State Management Pattern
```typescript
// Custom hook encapsulates all game logic
const {
  gameState,
  gameHistory,
  makeMove,
  resetGame,
  goToMove,
  // ... other methods
} = useGame();
```

### Component Composition
- **Game**: Main orchestrator component
- **Board**: Renders the 3x3 grid
- **Cell**: Individual clickable cells
- **GameInfo**: Status display and controls
- **MoveHistory**: Navigation through game history

## 🎨 UI/UX Design

### Visual Design
- Clean, modern interface with gradient backgrounds
- Smooth animations and transitions
- Responsive grid layout
- Visual feedback for game states

### Accessibility
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast color schemes
- Focus indicators

### Sound Design
- Move sound effects for player feedback
- Victory and draw celebration sounds
- Volume-controlled audio

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd tic-tac-toe

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🧪 Testing Strategy

The codebase is designed for easy testing:

### Unit Testing
- Pure functions in `gameLogic.ts` are easily testable
- No side effects or external dependencies
- Clear input/output contracts

### Component Testing
- Components are focused and isolated
- Props interfaces are well-defined
- Custom hooks can be tested independently

### Integration Testing
- Game flow can be tested end-to-end
- State management is predictable
- User interactions are well-defined

## 🔧 Customization

### Adding New Features
1. **Game Logic**: Add functions to `lib/gameLogic.ts`
2. **Types**: Extend interfaces in `lib/types.ts`
3. **State**: Update the `useGame` hook
4. **UI**: Create new components in `components/`

### Styling
- Tailwind CSS classes for consistent styling
- Dark mode support built-in
- Responsive design patterns

### Sound Effects
- Audio files in `public/` directory
- `use-sound` hook for audio management
- Volume controls and accessibility considerations

## 📚 Learning Outcomes

This project demonstrates:

1. **Clean Architecture**: Separation of concerns between logic, state, and UI
2. **TypeScript Best Practices**: Strong typing throughout the application
3. **React Patterns**: Custom hooks, component composition, and state management
4. **Modern Development**: Next.js, Tailwind CSS, and modern tooling
5. **User Experience**: Accessibility, responsiveness, and intuitive design
6. **Code Quality**: ESLint, consistent formatting, and maintainable code

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the established patterns
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
