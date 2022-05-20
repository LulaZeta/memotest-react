import './MemoBlock.css';

const MemoBlock = ({memoBlock}) => (
    <div className='memo-block'>
        <div className={`memo-block-inner ${memoBlock.flipped && 'memo-block-flipped'}`} >
            <div className='memo-block-front'>

            </div>
            <div className='memo-block-back'>
                {memoBlock.img}
            </div>
        </div>
    </div>
)
export default MemoBlock;