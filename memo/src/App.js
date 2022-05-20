import './App.css';
import { useEffect, useState } from 'react';
import Board from './components/Board/Board';
const imgList = [...'💣🧤🎩🌮🎱🌶🍕🦖'];

const App = () => {
    const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]);
    const [selectedMemoBlock, setselectedMemoBlock] = useState(null); //vamos a guardarla card seleccionada
    const [animating, setAnimating] = useState(false);   //para  q el usuario no pueda hacer click en el bloque cuando aun se está animando

    useEffect( () => {
        const shuffledImgList = shuffleArray([...imgList, ...imgList]);
        setShuffledMemoBlocks(shuffledImgList.map((card, i) => ({ index: i, card, flipped: false })));
    }, []);
  
    const shuffleArray = a => {                                 
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a
    }

    const handleMemoClick = memoBlock => {
        const flippedMemoBlock = { ...memoBlock, flipped: true };
        let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
        setShuffledMemoBlocks(shuffledMemoBlocksCopy);
        if(selectedMemoBlock === null) {
            setselectedMemoBlock(memoBlock);
          } else if(selectedMemoBlock.emoji === memoBlock.emoji) {
            setselectedMemoBlock(null);
          } else {
            setAnimating(true);
            setTimeout(() => {
              shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
              shuffledMemoBlocksCopy.splice(selectedMemoBlock.index, 1, selectedMemoBlock);
              setShuffledMemoBlocks(shuffledMemoBlocksCopy);
              setselectedMemoBlock(null);
              setAnimating(false);
            }, 1000);
          }


    }
    return (
        <Board memoBlocks= {shuffledMemoBlocks} animating={animating}  handleMemoClick={handleMemoClick} />
    );
}


export default App;
