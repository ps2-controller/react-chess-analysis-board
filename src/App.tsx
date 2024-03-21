import { useState, useCallback } from 'react'
import ChessAnalysisBoard from './lib'
import { TPositionTreeSetter } from './lib/contexts/PositionContext'
import './style.scss'

const App = () => {

  const [boardOnePosition, setBoardOnePosition] = useState<TPositionTreeSetter>()
  const [boardTwoPosition, setBoardTwoPosition] = useState<TPositionTreeSetter>()
  const boardOneStream = useCallback((analysisPosition: TPositionTreeSetter) => {
    setBoardTwoPosition(analysisPosition)
  }, [])
  const boardTwoStream = useCallback((analysisPosition: TPositionTreeSetter) => {
    setBoardOnePosition(analysisPosition)
  }, [])

  return (
    <div>
      <ChessAnalysisBoard
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
        
        1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.b4 Bxb4 5.c3 Ba5 6.d4 exd4 7.O-O
        d3 8.Qb3 Qf6 9.e5 Qg6 10.Re1 Nge7 11.Ba3 b5 12.Qxb5 Rb8 13.Qa4
        Bb6 14.Nbd2 Bb7 15.Ne4 Qf5 16.Bxd3 Qh5 17.Nf6+ gxf6 18.exf6
        Rg8 19.Rad1 Qxf3 20.Rxe7+ Nxe7 21.Qxd7+ Kxd7 22.Bf5+ Ke8
        23.Bd7+ Kf8 1-0'
        config = {{
          boardConfig: {
            fen: 'rnbqk2r/pppp1ppp/4p3/4P3/3P2Q1/2b5/P1PB1PPP/R3KBNR b KQkq - 1 7',
            ChessBoardProps: {
              // showBoardNotation: true,
              // boardOrientation:'black',
            }
          }
        }}
      />
    <br />
    <span>Sync Board</span>
    <ChessAnalysisBoard
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
      
      1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.b4 Bxb4 5.c3 Ba5 6.d4 exd4 7.O-O
      d3 8.Qb3 Qf6 9.e5 Qg6 10.Re1 Nge7 11.Ba3 b5 12.Qxb5 Rb8 13.Qa4
      Bb6 14.Nbd2 Bb7 15.Ne4 Qf5 16.Bxd3 Qh5 17.Nf6+ gxf6 18.exf6
      Rg8 19.Rad1 Qxf3 20.Rxe7+ Nxe7 21.Qxd7+ Kxd7 22.Bf5+ Ke8
      23.Bd7+ Kf8 24.Bxe7# 1-0'
      config = {{
        boardHeaderConfig: {
          useHoodieGuyWhenUnknown: false
        },
        boardConfig: {
          ChessBoardProps: {
            showBoardNotation: true,
            boardOrientation:'black',
          }
        }
      }}
      analysisPosition={boardTwoPosition}
      getAnalysisPosition={(analysisPosition: TPositionTreeSetter) => {boardTwoStream(analysisPosition)}}
      styles = {{
        boardHeaderStyles: {
          boardHeaderContainerClassName: 'board-header-container',
          boardHeaderTextClassName: 'board-header-text',
          boardHeaderTextDetailClassName: 'board-header-text-detail'
        },
        panelStyles: {
          panelContainerClassName: 'panel-container'
        }
      }}
    />
    <br />
    <span>Board Loaded from FEN</span>
    <ChessAnalysisBoard
        config = {{
          boardConfig: {
            fen: 'rnbqk2r/pppp1ppp/4p3/4P3/3P2Q1/2b5/P1PB1PPP/R3KBNR b KQkq - 1 7',
            ChessBoardProps: {
              // showBoardNotation: true,
              // boardOrientation:'black',
            }
          }
        }}
      />
    </div>
  )
}

export default App