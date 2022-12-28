import { useState, useContext, createContext } from 'react';
import { Chess } from 'chess.js'

interface TChessNodes {
  edgeNodeIndex: number, 
  node: Chess,
  nodeId: number,
  parentNodeId: number
}

interface TBoardPosition {
  nodeId: number,
  moveIndex: number
}

interface TPositionTree {
  boardPosition: TBoardPosition,
  setBoardPosition: Function,
  fen?: string,
  chessRootNode?: Chess,
  chessNodes?: TChessNodes[],
  handleRightClick: Function,
  handleLeftClick: Function,
  setChessNodes: Function,
  setFen: Function,
  getPosition?: Function,
  setPosition: Function
}

export interface TPositionTreeSetter {
  pgnString: string,
  boardPosition: TBoardPosition,
  fen?: string,
  chessNodes: TChessNodes[],
}

const PositionContext = createContext<TPositionTree>({
  boardPosition: {
    nodeId: 0,
    moveIndex: 0
  },
  setBoardPosition: () => {},
  handleRightClick: () => {},
  handleLeftClick: () => {},
  setChessNodes: () => {},
  setFen: () => {},
  setPosition: () => {}
});

export const PositionContextProvider = (props: any) => {

  const [boardPosition, setBoardPosition] = useState<TBoardPosition>({
    nodeId: 0,
    moveIndex: 0
  })
  const [chessRootNode] = useState<Chess>(new Chess)
  const [chessNodes, setChessNodes] = useState<TChessNodes[]>([{
    edgeNodeIndex: 0,
    node: chessRootNode,
    nodeId: 0,
    parentNodeId: -1
  }])

  const [fen, setFen] = useState<string>('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')

  const handleRightClick = () => {
    let currentNode = chessNodes.filter(el => el.nodeId === boardPosition.nodeId)[0]
    let boardHistory = currentNode.node.history()
    if (boardPosition?.moveIndex < boardHistory.length) {
      let newMoveIndex = boardPosition.moveIndex + 1
      setBoardPosition({
        ...boardPosition,
        moveIndex: newMoveIndex
      })
      currentNode.node.move(boardHistory[newMoveIndex])
    }
  }

  const handleLeftClick = () => {
    if (boardPosition.nodeId === 0 && boardPosition.moveIndex === 0) {
      return
    }
    if (boardPosition.nodeId === 0 && boardPosition.moveIndex === 1) {
      setBoardPosition({
        ...boardPosition,
        moveIndex: 0
      })
      return
    }
    let currentNode = chessNodes.filter(el => el.nodeId === boardPosition.nodeId)[0]
    let edgeNodeIndex = currentNode.edgeNodeIndex
    let newMoveIndex = boardPosition.moveIndex - 1
    if (newMoveIndex > edgeNodeIndex) {
      setBoardPosition({
        ...boardPosition,
        moveIndex: newMoveIndex
      })
    } else {
      setBoardPosition({
        ...boardPosition,
        moveIndex: newMoveIndex,
        nodeId: currentNode.parentNodeId
      })
    }
  }

  const setPosition = (initalPosition: TPositionTreeSetter) => {
    setBoardPosition(initalPosition.boardPosition)
    if (initalPosition.fen) {
      setFen(initalPosition.fen)
    }
    setChessNodes(initalPosition.chessNodes)
  }

  return <PositionContext.Provider value={{
    boardPosition, setBoardPosition, 
    chessRootNode, chessNodes, setChessNodes,
    fen, setFen,
    handleRightClick, handleLeftClick, setPosition
  }} >{props.children}</PositionContext.Provider>
}

export const usePositionContext = () => useContext(PositionContext);
