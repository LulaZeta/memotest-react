import MemoBlock from '../MemoBlock/MemoBlock';
import './Board.css';

const Board = ({ memoBlocks }) => {
    return (
        <main className="board">
            {memoBlocks.map((memoBlock, i) => {
                return <MemoBlock key={`${i}_${memoBlock.img}`} memoBlock={memoBlock} />
            })}
        </main>
    )
}

export default Board;