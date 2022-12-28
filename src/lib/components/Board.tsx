import { Chessboard, 
  ChessBoardProps as TChessBoardProps, 
  CurrentPosition as TCurrentPosition, 
  Pieces, 
  Square} from "react-chessboard";
import { Chess, Move } from 'chess.js'
import { usePositionContext } from "../contexts/PositionContext";
import { useEffect, useState } from "react";

export interface TBoardConfig {
  fen?: string
  ChessBoardProps?: TChessBoardProps
}

interface TProps {
  boardConfig?: TBoardConfig
}

const Board = (props: TProps) => {
  const { boardPosition, setBoardPosition, 
    chessRootNode, chessNodes, setChessNodes,
    handleRightClick, 
    fen, setFen
  } = usePositionContext();
  if (!chessRootNode || !chessNodes || !boardPosition) {
    return <></>
  }

  const {
    boardConfig = {}
  } = props
  if (!boardConfig.ChessBoardProps) {
    boardConfig.ChessBoardProps = {}
  }

  const [chessBoardProps, setChessBoardProps] = useState<TChessBoardProps>(boardConfig.ChessBoardProps)

  const handleGetCurrentPosition = (currentPosition: TCurrentPosition) => {
    if (callerGetPositionObject) {
      callerGetPositionObject(currentPosition)
    }
    const previousBoard = new Chess(fen)
    const legalMoves = previousBoard.moves()    
  }
  const handleOnPieceDrop = (sourceSquare: Square, targetSquare: Square, piece: Pieces) => {
    return onDrop(sourceSquare, targetSquare, piece) 
  }

  const callerGetPositionObject = chessBoardProps.getPositionObject
  const callerOnPieceDrop = chessBoardProps.onPieceDrop

  useEffect(() => {
    const currentNodeId = boardPosition?.nodeId
    let currentNode = chessNodes.filter(el => el.nodeId === currentNodeId)[0]
    const currNodeHistory = currentNode.node.history()
    const tempChessRender = new Chess()
    currNodeHistory.map((el, i) => {
      if (i < boardPosition?.moveIndex) {
        tempChessRender.move(el)
      }
    })
    const newFen = tempChessRender.fen()
    setFen(newFen)
  }, [chessNodes, boardPosition])
  
  useEffect(() => {
    setChessBoardProps({
      ...chessBoardProps,
      getPositionObject: (currentPosition) => handleGetCurrentPosition(currentPosition),
      onPieceDrop: (sourceSquare, targetSquare, piece) => handleOnPieceDrop(sourceSquare, targetSquare, piece),
      position: fen
    })
  }, [fen])

  function makeAMove(move: Move, startingFen: string) {
    const boardCopy = new Chess(startingFen);
    const newMove = boardCopy.move(move);
    if (!newMove) {
      return null
    }
    let newFen = boardCopy.fen()
    const result = {
      newFen,
      newMove
    }
    return result
  }
  
  
  function onDrop(sourceSquare: Square, targetSquare: Square, piece: Pieces) {  
    let droppedMove
    console.log('hmm...')
    if (targetSquare[1] === '8' && piece[1] === 'P') {
      droppedMove = {
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q' // TODO: react-chessboard has promotion selection on their roadmap
      }
    } else {
      droppedMove = {
        from: sourceSquare,
        to: targetSquare
      }
    }
    // @ts-ignore -- Square is an enum, Move type expects a string
    const nextPosition = makeAMove(droppedMove, fen);
    const newFen = nextPosition?.newFen
    const newMove = nextPosition?.newMove
  
    // illegal move
    if (!newFen) {
      return false
    };
    if (chessNodes) {
      const currentNode = chessNodes.filter(el => el.nodeId === boardPosition.nodeId)[0]
      const currentNodeCopy = currentNode.node
      const currentNodeHistory = currentNode.node.history()
      const nextMove = currentNodeHistory[boardPosition?.moveIndex]
      if (nextMove === newMove?.san) {
        handleRightClick()
      } else {
        const newNodeHistory = currentNodeHistory.slice(0, boardPosition?.moveIndex)
        if (newMove?.san) {
          if (newNodeHistory.length === currentNodeHistory.length && boardPosition?.nodeId !== 0) {
            currentNodeHistory.push(newMove?.san)
            currentNodeCopy.move(newMove?.san)
            let newChessNodes = chessNodes
            let replacementNode = {
              edgeNodeIndex: currentNode.edgeNodeIndex,
              node: currentNodeCopy,
              nodeId: currentNode.nodeId,
              parentNodeId: currentNode.parentNodeId
            }
            newChessNodes[boardPosition.nodeId] = replacementNode
            const newMoveIndex = boardPosition.moveIndex + 1
            setBoardPosition({
              ...boardPosition,
              moveIndex: newMoveIndex
            })
          }
          else {
            newNodeHistory.push(newMove?.san)
            const newNode = new Chess()
            newNodeHistory.map(el => newNode.move(el))
            let newNodeId = Math.max(...chessNodes.map(el => el.nodeId)) + 1
            const newChessNode = {
              edgeNodeIndex: boardPosition?.moveIndex,
              node: newNode,
              nodeId: newNodeId,
              parentNodeId: currentNode.nodeId
            }
            let newChessNodesCopy = chessNodes
            newChessNodesCopy.push(newChessNode)
            setChessNodes(newChessNodesCopy)
            const newMoveIndex = boardPosition.moveIndex + 1
            setBoardPosition({
              ...boardPosition,
              moveIndex: newMoveIndex,
              nodeId: newNodeId
            })
          }
        } 
      }
    }
    setFen(newFen)
    return true;
  }

  return (
    <div>
      <Chessboard 
        {...chessBoardProps}
      />
    </div>
  )

}

export default Board