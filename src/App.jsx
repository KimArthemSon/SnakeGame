import { useEffect, useState } from 'react';
import { player } from './chract.js';
import './App.css';

function App() {
  let [data, setData] = useState(new player());
  let [Current, setCurrent] = useState('d');
  let [apple, setapple] = useState([7, 9]);
  let [score, setscore] = useState(0);
  let [snakeBody, setsnakeBody] = useState([
    { x: 7, y: 5 }, 
    { x: 7, y: 4 }, 
    { x: 7, y: 3 },
    { x: 7, y: 2 }
  ]);
  let partsRelocate = (letter, move)=>{
    let newBody  = [...snakeBody];
   let lastXandY = [newBody[newBody.length-1].x, newBody[newBody.length-1].y];
    for(let i=newBody.length-1;i>=1;i--){
     newBody[i].x = newBody[i-1].x;
     newBody[i].y = newBody[i-1].y;
   }

   if(letter === 'w')newBody[0].x--;
   if(letter === 'a') newBody[0].y--;
   if(letter === 's') newBody[0].x++;
   if(letter === 'd') newBody[0].y++;

  
   
   setsnakeBody(snakeBody = [...newBody]);
    console.log(snakeBody);
    if(newBody[0].x >= 15 || newBody[0].y >= 15 || newBody[0].x <= -1 || newBody[0].y <= -1){
       lose(move);
       return 0;
   }
   
   newBody.splice(1, newBody.length).map(coordinates =>{
      if(coordinates.x === newBody[0].x && coordinates.y === newBody[0].y){
        lose(move);
        return 0;
      }
   })

    let newBoard = data.Emptyboard();

   snakeBody.map((s)=>{
      newBoard[s.x][s.y] = 1;
   })
   
  if(newBody[0].x === apple[0] && newBody[0].y === apple[1]){
     while(newBoard[apple[0]][apple[1]] === 1){
      setapple(apple = [...data.AppleGenerator()]);
   }
  setscore(score => score +1)
  setsnakeBody(snakeBody = [...snakeBody, { x: lastXandY[0], y: lastXandY[1] }]);
  snakeBody.map((s)=>{
    newBoard[s.x][s.y] = 1;
 })

  }
 
  newBoard[apple[0]][apple[1]] = 2;

    setData(() => ({
      board: newBoard
   }));

   

  }

useEffect(() => {
  let move = setInterval(() => {
    
  },10000000000);
  const handleKeyPress = (e) => {
     if(!"aswd".includes(e.key))return 0;
    if(e.key === 'a' && Current === 'd')return 0;
    if(e.key === 'd' && Current === 'a')return 0;
    if(e.key === 'w' && Current === 's')return 0;
    if(e.key === 's' && Current === 'w')return 0;
    console.log(Current+" "+e.key)
      setCurrent(Current = e.key);
   
      clearInterval(move)
 move = setInterval(() => {
   partsRelocate(Current, move);    
}, 110);
  
  }
  let newBoard = [...data.board];
  
  snakeBody.map((s)=>{
     newBoard[s.x][s.y] = 1;
  })
  
   newBoard[7][9] = 2;

   setData(() => ({
     board: newBoard
  }));
  
  document.addEventListener('keydown', handleKeyPress);
  
  return () => {
    document.removeEventListener('keydown', handleKeyPress);
  };
},[]); 


function lose(move){
  alert('Lose');
  setCurrent(c=> c = '');
  setsnakeBody(snakeBody = [
    { x: 7, y: 5 }, 
    { x: 7, y: 4 }, 
    { x: 7, y: 3 },
    { x: 7, y: 2 }
  ]);
 setapple(apple = [7, 9])
  setData.board = data.Emptyboard();
   clearInterval(move)
   setscore(score = 0)
   let newBoard = [...data.board];
  
  snakeBody.map((s)=>{
     newBoard[s.x][s.y] = 1;
  })

   setData(() => ({
     board: newBoard
  }));
 

}


  return (
    <>
       <h1>Score {score}</h1>
      <div className="board">
        {data.board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => {
              if (cell === 1) {
                return <div key={colIndex} className="snakeBody"></div>;
              } else if (cell === 2) {
                return <div key={colIndex} className="apple"></div>;
              } else {
                return <div key={colIndex} className="normal"></div>;
              }
            })}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
