import './style.scss'

import { PositionContextProvider, TPositionTreeSetter } from './contexts/PositionContext';
import { TPanelStyles } from './components/Panel';
import { TBoardHeaderConfig, TBoardHeaderStyles } from './components/BoardHeader';
import { TBoardConfig } from './components/Board';

import AnalysisBoard , { TAnalysisBoardStyles } from './components/AnalysisBoard';
import { TMovesStyles } from './components/Moves';

export interface TProps {
  pgnString?: string
  config?: {
    boardHeaderConfig?: TBoardHeaderConfig,
    boardConfig?: TBoardConfig
  },
  getAnalysisPosition?: Function,
  analysisPosition?: TPositionTreeSetter,
  styles?: {
    analysisBoardStyles?: TAnalysisBoardStyles,
    panelStyles?: TPanelStyles,
    movesStyles?: TMovesStyles,
    boardHeaderStyles?: TBoardHeaderStyles
  }
}

const ChessAnalysisBoard = (props: TProps) => {

  const { config } = props

  return (
    <PositionContextProvider
      initialFen={config?.boardConfig?.fen}
    >
      <AnalysisBoard {...props} />
    </PositionContextProvider>
  )
}

export default ChessAnalysisBoard
