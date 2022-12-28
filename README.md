# Welcome to React Chess Analysis Board!

# Description
React Chess Analysis Board provides a React component you can drop into your React app to render an analysis board of any [PGN string](http://www.saremba.de/chessgml/standards/pgn/pgn-complete.htm).

# Usage
## Getting Started
1. Install the library
`npm install react-chess-analysis-board` 
or
`yarn add react-chess-analysis-board`

2. Use the component
```jsx
import ChessPGNAnalysisBoard from 'react-chess-analysis-board'

return (
	<ChessPGNAnalysisBoard
		pgnString='[Event "Berlin"]
		[Site "Berlin GER"]
		[Date "1852.??.??"]
		[EventDate "?"]
		[Round "?"]
		[Result "1-0"]
		[White "Adolf Anderssen"]
		[Black "Jean Dufresne"]
		[ECO "C52"]
		[WhiteElo "?"]
		[BlackElo "?"]
		[PlyCount "47"]

		1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.b4 Bxb4 5.c3 Ba5 6.d4 exd4 7.O-O d3 8.Qb3 Qf6 9.e5 Qg6 10.Re1 Nge7 11.Ba3 b5 12.Qxb5 Rb8 13.Qa4 Bb6 14.Nbd2 Bb7 15.Ne4 Qf5 16.Bxd3 Qh5 17.Nf6+ gxf6 18.exf6 Rg8 19.Rad1 Qxf3 20.Rxe7+ Nxe7 21.Qxd7+ Kxd7 22.Bf5+ Ke8 23.Bd7+ Kf8 24.Bxe7# 1-0'
	/>
)

```

## API

React Chess Analysis Board accepts the following props:

- `pgnString` **[string | required]**: any valid PGN
- `config` **[object | optional]**: an object for various components
	- `boardHeaderConfig` **[object | optional]**: an object for configs related to the board header
		- `useHoodieGuyWhenUnknown` **[boolean | optional]** -- if `true`, if the PGN being used does not have a player's name, it will be replaced with "Mr. Hoodie Guy". if `false`, it will say "Unknown". Defaults to `false`
	- `boardConfig` **[object | optional]**: an object for configs related to the board
		- `fen` **[string | optional]**: a [fen string](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation) to indicate the initial position of the board for analysis
		- `ChessBoardProps` **[object | optional]**: props that are passed directly to [React-Chessboard](https://github.com/Clariity/react-chessboard#props), used for styling the board. 
- `getCurrentPosition` **[function | optional]**: calls your callback function, passing a `currentPosition` object as a parameter, which can be used to construct another analysis board you are keeping in sync with this one.
- `currentPosition`** [object | optional]**: sets the entire state of the analysis board. Used, for example, if keeping two analysis boards in sync with one another. You should directly pass the object from a `getCurrentPosition` call from another analysis board you are keeping in sync with this one.
- `styles` **[object | optional]**: pass strings for each style that correspond to your own css classes to override the default classes used by React Chess Analysis Board.
	- `analysisBoardStyles` **[object | optional]**
		- `analysisBoardContainerClassName` **[string | optional]**
	- `panelStyles` **[object | optional]**
		- `panelContainerClassName` **[string | optional]**
		- `panelClassName` **[string | optional]**
	- `movesStyles` **[object | optional]**
		- `movesContainerClassName `**[string | optional]**
		- `movesClassName` **[string | optional]**
		- `rootNodeClassName` **[string | optional]**
		- `activeNodeClassName` **[string | optional]**
		- `activeMoveClassName` **[string | optional]**
		- `inactiveNodeClassName` **[string | optional]**
	- `boardHeaderStyles` **[object | optional]**
		- `boardHeaderContainerClassName `**[string | optional]**
		- `boardHeaderTextClassName` **[string | optional]**
		- `boardHeaderTextDetailClassName` **[string | optional]**


# Features
## Current
- Full React Analysis Board component
- Subcomponents can be accessed individually (BoardHeader, Board, Panel, and Moves)
- Managed state for unlimited branches of analysis
	- Traverse state with panel buttons or arrow keys
	- Create an alternative branch by exploring new moves 
	- Access any board state on any branch by clicking on the move
- PGN-viewer functionality
- Style with your own css classes
- Optional use of "Mr. Hoodie Guy" when the PGN does not include player names.

## Planned
- Ability to show chess engine notation from a connected engine
- Stronger control over styles and layout, especially around `Moves` component
- Handling pawn promotion in side lines outside the root PGN [(planned inclusion in react-chessboard)](https://github.com/Clariity/react-chessboard#planned) and will then be handled in this library

# Contributing

## Making Contributions
- Use your judgement -- if it's an obvious need or a bugfix, feel free to open a PR directly.
- If it materially changes the experience of using the library, is a major new feature, or is something you think someone else might already be working on, please open an issue for discussion before contributing, or confirm that you're working on it within the discussion on an existing issue.
- Unsure what to contribute? Check out the existing issues for inspiration. 

## Opening a PR

1.  Fork this repository
2.  Clone your forked repository onto your development machine  `git clone https://github.com/yourUsernameHere/react-chess-analysis-board.git`  `cd react-chess-analysis-board`
3.  Create a branch for your PR  `git checkout -b your-branch-name`
4.  Set upstream remote  `git remote add upstream https://github.com/ps2-controller/react-chess-analysis-board.git`
5.  Make your changes -- the `lib` folder contains the library with `index.tsx` as the entry point, and `App.tsx` imports and uses the library to make local development easy. Use `npm run dev` to run `App.tsx` in your browser.
6.  Push your changes  `git add .`  `git commit -m "feature/cool-new-feature"`  `git push --set-upstream origin your-branch-name`
7.  Create pull request on GitHub
8.  Contribute again  `git checkout main`  `git pull upstream main`  `git checkout -b your-new-branch-name`