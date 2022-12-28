
import { usePositionContext } from '../contexts/PositionContext'
export interface TBoardHeaderDetails {
  White?: string,
  Black?: string,
  WhiteElo?: string,
  BlackElo?: string,
  Round?: string,
  Result?: string,
  Site?: string,
  Event?: string
}
export interface TBoardHeaderStyles {
  boardHeaderContainerClassName?: string
  boardHeaderTextClassName?: string
  boardHeaderTextDetailClassName?: string
}

export interface TBoardHeaderConfig {
  useHoodieGuyWhenUnknown?: boolean
}

interface TProps {
  boardHeaderStyles?: TBoardHeaderStyles,
  boardHeaderConfig?: TBoardHeaderConfig
}

const BoardHeader = (props: TProps) => {
  const {
    boardHeaderConfig = {},
    boardHeaderStyles = {},
  } = props
  const boardHeaderContainerClassName = boardHeaderStyles?.boardHeaderContainerClassName ?? 'RCAB-board-header-container'
  const boardHeaderTextClassName = boardHeaderStyles?.boardHeaderTextClassName ?? 'RCAB-board-header-text'
  const boardHeaderTextDetailClassName = boardHeaderStyles?.boardHeaderTextDetailClassName ?? 'RCAB-board-header-text-detail'
  

  const { chessRootNode } = usePositionContext()
  if (!chessRootNode) {
    return <></>
  }

  const boardHeaderDetails: TBoardHeaderDetails = chessRootNode.header()
  if (!boardHeaderDetails) {
    return <></>
  }


  const {
    useHoodieGuyWhenUnknown = false
  } = boardHeaderConfig
  const nameDefault = useHoodieGuyWhenUnknown 
    ? 'Mr. Hoodie Guy'
    : 'Unknown'

  const {
    White = nameDefault, Black = nameDefault,
    WhiteElo, BlackElo,
    Round, Result, Event,
    Site
  } = boardHeaderDetails

  return (
    <div className={boardHeaderContainerClassName}>
      <div className={boardHeaderTextClassName}>
        {White} {WhiteElo && WhiteElo.length > 0 && WhiteElo !== '?' ? `(${WhiteElo})` : ''}
        vs.{` `}
        {Black} {BlackElo && BlackElo.length > 0 && BlackElo !== '?' ? `(${BlackElo})` : ''}</div>
      <div className={boardHeaderTextDetailClassName}> 
        {Event && Event.length > 0 ? `${Event} | ` : ''}
        {Site && Site.length > 0 ? `${Site} | ` : ''}
        {Round && Round.length > 0 && Round !== '?' ? `${Round} | ` : ''}
        {Result ? Result : ''}
      </div>
    </div>
  )
}

export default BoardHeader