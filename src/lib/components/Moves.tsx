import { useEffect, useState } from "react"
import { usePositionContext } from "../contexts/PositionContext"

export interface TMovesStyles {
  movesContainerClassName?: string
  movesClassName?: string
}

interface TProps {
  movesStyles?: TMovesStyles
}

interface TMove {
  index: number,
  moveNumber: number,
  move: string,
  nodeId: number,
  parentNodeId?: number,
  edgeNodeIndex: number,
  className?: string
}

export type TNodeMoves = TMove[]

export type TMoves = TNodeMoves[]

const Moves = (props: TProps) => {
  const {
    movesStyles
  } = props

  const movesContainerClassName = movesStyles?.movesContainerClassName ?? 'RCAB-moves-container'

  const { chessNodes, boardPosition, setBoardPosition } = usePositionContext()
  if (!chessNodes) {
    return <></>
  }

  const handleSelectMove = (move: TMove) => {
    setBoardPosition({
      ...boardPosition,
      moveIndex: move.index + 1,
      nodeId: move.nodeId
    })
  }

  const [renderMoves, setRenderMoves] = useState<TNodeMoves>([])

  useEffect(() => {
    const moves = chessNodes.map(el => {
      const history = el.node.history()
      const nodeMoves = history.map((move, i) => {
        if (typeof(move) !== 'string') {
          move = move.san
        }
        const moveNumber = Math.floor(i / 2) + 1
        let className = 'RCAB-'
        if (el.nodeId === 0) {
          className += 'root-'
        }
        if (boardPosition.nodeId === el.nodeId) {
          className += 'active-node'
          if (i === el?.edgeNodeIndex) {
            className += '-first'
          }
          if (i === history.length - 1 && i !== 0) {
            className += '-last'
          }
          if (boardPosition.moveIndex === i + 1) {
            className += '-selected'
          }
        } else {
          className += 'inactive-node'
          if (i === el?.edgeNodeIndex) {
            className += '-first'
          }
          if (i === history.length - 1 && i !== 0) {
            className += '-last'
          }
        }
        return {
          index: i,
          moveNumber,
          move,
          nodeId: el?.nodeId,
          parentNodeId: el?.parentNodeId,
          edgeNodeIndex: el?.edgeNodeIndex,
          className
        }
      })
      return nodeMoves
    })
    moves.sort((a, b) => a[0]?.parentNodeId - b[0]?.parentNodeId)
    const compressMoves = (moves: TMoves) => {
      const movesCopy = moves
      if (movesCopy.length === 1) {
        moves = movesCopy
        return
      }
      const child = movesCopy[movesCopy.length - 1]
      const parent = movesCopy.filter(el => el[0]?.nodeId === child[0]?.parentNodeId)[0]
      const parentIndex = movesCopy.indexOf(parent)
      const parentCopy = parent
      for (let i = child[0]?.edgeNodeIndex; i < child.length; i++) {
        parentCopy?.splice(i, 0, child[i])
      }
      movesCopy[parentIndex] = parentCopy
      movesCopy?.pop()
      compressMoves(movesCopy)
    }
    compressMoves(moves)
    setRenderMoves(moves[0])
  }, [chessNodes, boardPosition])

  return (
    <div className={movesContainerClassName}>
      {renderMoves.map((move: TMove) => {
        const moveNumber = move.index % 2 === 0 ? move.moveNumber + '.' : ''
        if (move.className?.includes('first') && move?.parentNodeId === 0) {
          return (
            <span key={`${move.nodeId}${move.index}`}>
              <div className="RCAB-move-separator" />
              <span 
                onClick={() => handleSelectMove(move)} 
                className={move.className} 
              >
                {`${moveNumber} ${move.move} `}
              </span>
            </span>
          )
        }
        if (move.className?.includes('last') && (move.nodeId !== 0)) {
          return (
            <span key={`${move.nodeId}${move.index}`}>
              <span 
                onClick={() => handleSelectMove(move)} 
                className={move.className} 
              >
                {`${moveNumber} ${move.move} `}
              </span>
              <div className="RCAB-submove-separator" />
            </span>
          )
        }
        return (
          <span 
            onClick={() => handleSelectMove(move)} 
            className={move.className} 
            key={`${move.nodeId}${move.index}`}
          >
            {`${moveNumber} ${move.move} `}
          </span>
        )
      })}
    </div>
  )
}

export default Moves