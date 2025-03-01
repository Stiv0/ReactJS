import React, { Component } from 'react';
import Snake from './Snake';
import Food from './Food';

const getRandomCoordinates=() =>{
    let min = 1;
    let max = 96;
    let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    return [x,y]
}

const initState = {
    food: getRandomCoordinates(),
    speed: 100,
    direction: 'RIGHT',
    snakeDots: [
      [0,0],
      [2,0]
    ]
  }

class App extends Component {

    state = initState;

    componentDidMount(){
        console.log("enne");
        setInterval(this.moveSnake, this.state.speed);
        document.onkeydown = this.onKeyDown;
        console.log("pärast");
    }

    componentDidUpdate() {
        this.checkIfOutOfBorders();
        this.checkIfCollapsed();
        this.checkIfEat();
      }

    onKeyDown = (e) => {
        e = e || window.event;
        switch (e.keyCode) {
            case 38:
                if(this.state.direction!=='DOWN'){
                    this.setState({direction: 'UP'});
                }
                break;
            case 40:
                if(this.state.direction!=='UP'){
                    this.setState({direction: 'DOWN'});
                }
                break;
            case 37:
                if(this.state.direction!=='RIGHT'){
                    this.setState({direction: 'LEFT'});
                }
                break;
            case 39:
                if(this.state.direction!=='LEFT'){
                    this.setState({direction: 'RIGHT'});
                }
                break;
        }
    }

    moveSnake=()=>{
        let dots= [...this.state.snakeDots];
        let head = dots[dots.length-1];

        switch (this.state.direction){
            case 'RIGHT':
                head=[head[0]+2, head[1]];
                break;
            case 'LEFT':
                head = [head[0] - 2, head[1]];
                break;
            case 'DOWN':
                head = [head[0], head[1] + 2];
                break;
            case 'UP':
                head = [head[0], head[1] - 2];
                break;
        }
        dots.push(head);
        dots.shift();
        this.setState({
            snakeDots: dots
        })
    }

    moveSnakeBorder=()=>{
        let dots= [...this.state.snakeDots];
        let head = dots[dots.length-1];

        switch (this.state.direction){
            case 'RIGHT':
                head=[head[0]-100, head[1]];
                break;
            case 'LEFT':
                head = [head[0] +100, head[1]];
                break;
            case 'DOWN':
                head = [head[0], head[1] -100];
                break;
            case 'UP':
                head = [head[0], head[1] +100];
                break;
        }
        dots.push(head);
        dots.shift();
        this.setState({
            snakeDots: dots
        })
    }



    
    checkIfEat() {
        let head = this.state.snakeDots[this.state.snakeDots.length - 1];
        let food = this.state.food;
        if (head[0] == food[0] && head[1] == food[1]) {
            this.setState({
            food: getRandomCoordinates()
            })
            this.enlargeSnake();
            this.increaseSpeed();
        }
    }

    enlargeSnake() {
        let newSnake = [...this.state.snakeDots];
        newSnake.unshift([])
        this.setState({
          snakeDots: newSnake
        })
    }
    
      increaseSpeed() {
        if (this.state.speed > 50) {
          this.setState({
            speed: this.state.speed - 5
          })
        }
    }

    checkIfOutOfBorders() {
        let head = this.state.snakeDots[this.state.snakeDots.length - 1];
        if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
            this.moveSnakeBorder();
        }
    }

    checkIfCollapsed() {
        let snake = [...this.state.snakeDots];
        let head = snake[snake.length - 1];
        snake.pop();
        snake.forEach(dot => {
          if (head[0] == dot[0] && head[1] == dot[1]) {
            this.onGameOver();
          }
        })
    }

    onGameOver() {
        alert(`Mäng läbi. Sinu skoor: ${this.state.snakeDots.length}`);
        this.setState(initState)
    }

    render(){
        return(
            <div className="game-area">
                <Snake snakeDots={this.state.snakeDots}></Snake>
                <Food dot={this.state.food}></Food>
            </div>
        )
    }
}

export default App; 