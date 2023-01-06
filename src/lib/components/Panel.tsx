import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import { usePositionContext } from '../contexts/PositionContext'


export interface TPanelStyles {
  panelContainerClassName?: string
  panelClassName?: string
}

interface TProps {
  panelStyles?: TPanelStyles
}
const Panel = (props: TProps) => {
  const {
    panelStyles
  } = props

  const panelContainerClassName = panelStyles?.panelContainerClassName ?? 'RCAB-panel-container'
  // const panelClassName = panelStyles?.panelClassName ?? 'RCAB-panel'

  const { chessRootNode, chessNodes, handleLeftClick, handleRightClick } = usePositionContext()
  if (!chessRootNode || !chessNodes) {
    return <></>
  }

  return (
    <div className={panelContainerClassName}>
      <div className='RCAB-panel-item' onClick={() => handleLeftClick()}>
        <FontAwesomeIcon icon={faArrowLeftLong} />
      </div>
      <div></div>
      <div className='RCAB-panel-item' onClick={() => handleRightClick()}>
        <FontAwesomeIcon icon={faArrowRightLong} />
      </div>
    </div>
  )
}

export default Panel