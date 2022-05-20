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
        const flippedMemoBlock = { ...memoBlock, flipped: true };  //constante q da vuelta la card clickeada
        let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];   //copia de la listade bloquees q vamos a usar
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock); //en la copia de arriba reemplamos el card q seleccionamos por el bloque dado vuelta
        setShuffledMemoBlocks(shuffledMemoBlocksCopy);  //seteamos el nuevo listado de Bloques con el card dado vuelta, hay 3 posibilidades:
        if(selectedMemoBlock === null) {        //no hay card seleccionada
            setselectedMemoBlock(memoBlock);
          } else if(selectedMemoBlock.card === memoBlock.card) {  //el seleccionado con el dado vuelta son iguales
            setselectedMemoBlock(null);   //dejamos todo como está para q el usuario pueda seguir jugando
          } else {   //el usuario no acertó . El seleccionado es distinto del dado vuelta, hacemos la animación de los bloques
            setAnimating(true);
            setTimeout(() => {
              shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);  //seleccionamos los dos bloques pero dado vuelta
              shuffledMemoBlocksCopy.splice(selectedMemoBlock.index, 1, selectedMemoBlock);
              setShuffledMemoBlocks(shuffledMemoBlocksCopy);  //seteamos la lista con los bloques cambiados (dado vueltas)
              setselectedMemoBlock(null); //ya terminó la animación
              setAnimating(false);
            }, 1000);
          }


    }
    return (
        <Board memoBlocks= {shuffledMemoBlocks} animating={animating}  handleMemoClick={handleMemoClick} />
        
    );
}


export default App;
