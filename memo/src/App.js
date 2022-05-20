import './App.css';
import { useEffect, useState } from 'react';
import Board from './components/Board/Board';
const imgList = [...'💣🧤🎩🌮🎱🌶🍕🦖'];

const App = () => {
    const [shuffleMemoBlocks, setShuffleMemoBlocks] = useState([]);

    useEffect( () => {
        const shuffledImgList = shuffleArray([...imgList, ...imgList]);
        setShuffleMemoBlocks(shuffledImgList.map((card, i) => ({ index: i, card, flipped: false })));
    }, []);
  
    const shuffleArray = a => {                                 
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a
    }
    return (
        <Board memoBlocks= {shuffleMemoBlocks} />
    );
}


export default App;
