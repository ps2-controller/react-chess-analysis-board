
import Board from "./Board";
import { TBoardConfig } from './Board';

import BoardHeader, { TBoardHeaderStyles } from "./BoardHeader";
import { TBoardHeaderConfig } from './BoardHeader';

import Panel from './Panel';
import { TPanelStyles } from './Panel';

import { TPositionTreeSetter, usePositionContext } from "../contexts/PositionContext";
import { Key, useEffect } from "react";
import Moves, { TMovesStyles } from "./Moves";

export interface TAnalysisBoardStyles {
  analysisBoardContainerClassName: string
}

interface TProps {
  pgnString?: string,
  currentPosition?: TPositionTreeSetter,
  getCurrentPosition?: Function,
  config?: {
    boardHeaderConfig?: TBoardHeaderConfig,
    boardConfig?: TBoardConfig
  },
  styles?: {
    analysisBoardStyles?: TAnalysisBoardStyles,
    panelStyles?: TPanelStyles,
    movesStyles?: TMovesStyles,
    boardHeaderStyles?: TBoardHeaderStyles
  }
}

const AnalysisBoard = (props: TProps) => {
  const {
    pgnString,
    config,
    styles,
    currentPosition,
    getCurrentPosition
  } = props


  const analysisBoardContainerClassName = styles?.analysisBoardStyles?.analysisBoardContainerClassName ?? 'RCAB-analysis-board-container'


  const { boardPosition, chessRootNode, handleLeftClick, handleRightClick, fen, chessNodes, setPosition } = usePositionContext()
  if(!pgnString || !chessRootNode) {
    return <></>
  }
  useEffect(() => {
    if (currentPosition) {
      setPosition(currentPosition)
    }
  }, [currentPosition])

  useEffect(() => {
    if (getCurrentPosition) {
      const position = {
        pgnString,
        boardPosition,
        fen,
        chessNodes
      }
      getCurrentPosition(position)
    }
  }, [boardPosition, getCurrentPosition])

  chessRootNode.loadPgn(pgnString)

  const handleKeyDown = (k: Key) => {
    if (k === 'ArrowRight') {
      handleRightClick()
    }
    if (k === 'ArrowLeft') {
      handleLeftClick()
    }
  }

  return (
    <div className={analysisBoardContainerClassName} onKeyDown={(k) => handleKeyDown(k.key)} tabIndex={0}>
      <div>
      <BoardHeader 
        boardHeaderConfig= {config?.boardHeaderConfig}
        boardHeaderStyles={styles?.boardHeaderStyles}
      />
      <Board 
        boardConfig={config?.boardConfig}
      />
      <Panel
        panelStyles={styles?.panelStyles}
      />
      </div>
      <div>
        <Moves 
          movesStyles={styles?.movesStyles}
        />
      </div>
    </div>
  )
}
  


export default AnalysisBoard