import './style.scss'

import { PositionContextProvider, TPositionTreeSetter } from './contexts/PositionContext';
import { TPanelStyles } from './components/Panel';
import { TBoardHeaderConfig, TBoardHeaderStyles } from './components/BoardHeader';
import { TBoardConfig } from './components/Board';

import AnalysisBoard, { TAnalysisBoardStyles } from './components/AnalysisBoard';
import { TMovesStyles } from './components/Moves';

interface TProps {
  pgnString?: string
  config?: {
    boardHeaderConfig?: TBoardHeaderConfig,
    boardConfig?: TBoardConfig
  },
  getCurrentPosition?: Function,
  currentPosition?: TPositionTreeSetter,
  styles?: {
    analysisBoardStyles?: TAnalysisBoardStyles,
    panelStyles?: TPanelStyles,
    movesStyles?: TMovesStyles,
    boardHeaderStyles?: TBoardHeaderStyles
  }
}

const ChessPGNAnalysisBoard = (props: TProps) => {


  return (
    <PositionContextProvider>
      <AnalysisBoard {...props} />
    </PositionContextProvider>
  )
}

export default ChessPGNAnalysisBoard
