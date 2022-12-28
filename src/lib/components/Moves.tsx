import { render } from "chessground/anim"
import { useEffect, useState } from "react"
import { usePositionContext } from "../contexts/PositionContext"

export interface TMovesStyles {
  movesContainerClassName?: string
  movesClassName?: string
  rootNodeClassName?: string
  activeNodeClassName?: string
  activeMoveClassName?: string
  inactiveNodeClassName?: string
}

interface TProps {
  movesStyles?: TMovesStyles
}

interface TMove {
  index: number,
  moveNumber: number,
  move: string,
  nodeId: number,
  parentNodeId: number,
  edgeNodeIndex: number
}

export type TNodeMoves = TMove[]

export type TMoves = TNodeMoves[]

const Moves = (props: TProps) => {
  const {
    movesStyles
  } = props

  const movesContainerClassName = movesStyles?.movesContainerClassName ?? 'RCAB-moves-container'
  const rootNodeClassName = movesStyles?.rootNodeClassName ?? 'RCAB-root-node'
  const activeNodeClassName = movesStyles?.activeNodeClassName ?? 'RCAB-active-node'
  const activeMoveClassName = movesStyles?.activeMoveClassName ?? 'RCAB-active-move'
  const inactiveNodeClassName = movesStyles?.inactiveNodeClassName ?? 'RCAB-inactive-node'


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
    let moves = chessNodes.map(el => {
      let history = el.node.history()
      let nodeMoves = history.map((move, i) => {
        if (typeof(move) !== 'string') {
          move = move.san
        }
        let moveNumber = Math.floor(i / 2) + 1
        return {
          index: i,
          moveNumber,
          move,
          nodeId: el.nodeId,
          parentNodeId: el.parentNodeId,
          edgeNodeIndex: el.edgeNodeIndex
        }
      })
      return nodeMoves
    })
    moves.sort((a, b) => a[0].parentNodeId - b[0].parentNodeId)
    const compressMoves = (moves: TMoves) => {
      let movesCopy = moves
      if (movesCopy.length === 1) {
        moves = movesCopy
        return
      }
      let child = movesCopy[movesCopy.length - 1]
      let parent = movesCopy.filter(el => el[0].nodeId === child[0].parentNodeId)[0]
      let parentIndex = movesCopy.indexOf(parent)
      let parentCopy = parent
      for (let i = child[0].edgeNodeIndex; i < child.length; i++) {
        parentCopy.splice(i, 0, child[i])
      }
      movesCopy[parentIndex] = parentCopy
      movesCopy.pop()
      compressMoves(movesCopy)
    }
    compressMoves(moves)
    setRenderMoves(moves[0])
  }, [chessNodes, boardPosition])

  return (
    <div className={movesContainerClassName}>
      {renderMoves.map((move: TMove) => {
        
        let moveClass
        if (move.nodeId === 0) {
          if (move.index + 1 === boardPosition.moveIndex && boardPosition.nodeId === 0) {
            moveClass = activeMoveClassName
          } else {
            moveClass = rootNodeClassName
          }
        }
        else if (move.nodeId === boardPosition.nodeId) {
          if (move.index + 1 === boardPosition.moveIndex && boardPosition.nodeId === move.nodeId) {
            moveClass = activeMoveClassName
          } else {
            moveClass = activeNodeClassName
          }
        } else {
          moveClass = inactiveNodeClassName
        }
        let openingParentheses = move.nodeId !== 0 && move.index - move.edgeNodeIndex === 0
          ? '('
          : ''
        let moveNodeLength = renderMoves.filter((el) => el.nodeId === move.nodeId).length
        let closingParentheses = move.nodeId !== 0 && move.index - move.edgeNodeIndex === moveNodeLength - 1
          ? ')'
          : ''
        let moveNumber = move.index % 2 === 0 ? move.moveNumber + '.' : ''
        return (
          <span 
            onClick={() => handleSelectMove(move)} 
            className={moveClass} 
            key={`${move.nodeId}${move.index}`}
          >
            {`${openingParentheses}${moveNumber} ${move.move}${closingParentheses} `}
          </span>
        )
      })}
    </div>
  )
}

export default Moves