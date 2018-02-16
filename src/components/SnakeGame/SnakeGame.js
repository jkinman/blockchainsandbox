import React, { Component, PropTypes } from 'react';
import Web3 from 'web3';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SnakeGame.scss';

const ETHERIUM_ENDPOINT = 'https://mainnet.infura.io/mRUmnxLJW2t5fZP6WfDN';
let web3;

// Canvas & Context
var canvas;
var ctx;

// Snake
var snake;
var snake_dir;
    var snake_next_dir;
var snake_speed;

// Food
var food = [{x: 0, y: 0}];

// Score
var score;

// Wall
var wall;

// HTML Elements
var screen_snake;
var screen_menu;
var screen_setting;
var screen_gameover;
var button_newgame_menu;
var button_newgame_setting;
var button_newgame_gameover;
var button_setting_menu;
var button_setting_gameover;
var ele_score;
var speed_setting;
var wall_setting;


class SnakeGame extends Component {

    constructor( props, context ) {
        super( props, context);

        this.state = {
            blockNumber:0,
            blockArray:[],
        }

        web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/mRUmnxLJW2t5fZP6WfDN'));
        
    }
    

     activeDot(x, y){
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(x * 10, y * 10, 10, 10);
    }
    

     changeDir(key){
        
        if(key == 38 && snake_dir != 2){
            snake_next_dir = 0;
        }else{
        
        if (key == 39 && snake_dir != 3){
            snake_next_dir = 1;
        }else{
        
        if (key == 40 && snake_dir != 0){
            snake_next_dir = 2;
        }else{
            
        if(key == 37 && snake_dir != 1){
            snake_next_dir = 3;
        } } } }
        
    }

     addFood( data ){
         let x = Math.floor(Math.random() * ((canvas.width / 10) - 1));
         let y = Math.floor(Math.random() * ((canvas.height / 10) - 1));
         for(var i = 0; i < snake.length; i++){
             if(this.checkBlock(x, y, snake[i].x, snake[i].y)){
                 this.addFood();
                }
            }
        food.push({x,y});
    }

     checkBlock(x, y, _x, _y){
        return (x == _x && y == _y) ? true : false;
    }
    
     altScore(score_val){
        this.refs.ele_score.innerHTML = String(score_val);
    }

     mainLoop(){
        
            var _x = snake[0].x;
            var _y = snake[0].y;
			snake_dir = snake_next_dir;

            // 0 - Up, 1 - Right, 2 - Down, 3 - Left
            switch(snake_dir){
                case 0: _y--; break;
                case 1: _x++; break;
                case 2: _y++; break;
                case 3: _x--; break;
            }

            snake.pop();
            snake.unshift({x: _x, y: _y});

        // Wall
        
            if(wall == 1){
            // On
                if (snake[0].x < 0 || snake[0].x == canvas.width / 10 || snake[0].y < 0 || snake[0].y == canvas.height / 10){
                    this.showScreen(3);
                    return;
                }
            }else{
            // Off
                for(var i = 0, x = snake.length; i < x; i++){
                    if(snake[i].x < 0){
                        snake[i].x = snake[i].x + (canvas.width / 10);
                    }
                    if(snake[i].x == canvas.width / 10){
                        snake[i].x = snake[i].x - (canvas.width / 10);
                    }
                    if(snake[i].y < 0){
                        snake[i].y = snake[i].y + (canvas.height / 10);
                    }
                    if(snake[i].y == canvas.height / 10){
                        snake[i].y = snake[i].y - (canvas.height / 10);
                    }
                }
            }
        
        // Autophagy death
            for(var i = 1; i < snake.length; i++){
                if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
                    this.showScreen(3);
                    return;
                }
            }
        
      // Eat Food
      food.map( (nug, i, a) => {
          if(this.checkBlock(snake[0].x, snake[0].y, nug.x, nug.y)){
              snake[snake.length] = {x: snake[0].x, y: snake[0].y};
              score += 1;
              this.altScore(score);
              // this.addFood();
              a.splice( i, 1)
              this.activeDot(nug.x, nug.y);
          }

      })
        
            ctx.beginPath();
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            for(var i = 0; i < snake.length; i++){
                this.activeDot(snake[i].x, snake[i].y);
            }
        
        food.map( (e,i) => this.activeDot(e.x, e.y));
        setTimeout(this.mainLoop.bind(this), snake_speed);
    }

     newGame(){
        
        this.showScreen(0);
        this.refs.screen_snake.focus();
      
        snake = [];
        for(var i = 4; i >= 0; i--){
            snake.push({x: i, y: 15});
        }
      
        snake_next_dir = 1;
        
        score = 0;
        this.altScore(score);
        
        this.addFood();
        
        canvas.onkeydown = (evt) => {
            evt = evt || window.event;
            this.changeDir(evt.keyCode);
        }
        this.mainLoop();
                
    }
    
    // Change the snake speed...
    // 150 = slow
    // 100 = normal
    // 50 = fast
     setSnakeSpeed(speed_value){
        snake_speed = speed_value;
    }
    
    setWall(wall_value){
        wall = wall_value;
        if(wall == 0){this.refs.screen_snake.style.borderColor = "#606060";}
        if(wall == 1){this.refs.screen_snake.style.borderColor = "#202020";}
    }
     
    /////////////////////////////////////////////////////////////
    
    // 0 for the game
    // 1 for the main menu
    // 2 for the settings screen
    // 3 for the game over screen
     showScreen(screen_opt){

        switch(screen_opt){
                
            case 0:  this.refs.screen_snake.style.display = "block";
                     this.refs.screen_menu.style.display = "none";
                     this.refs.screen_setting.style.display = "none";
                     this.refs.screen_gameover.style.display = "none";
                     break;
                
            case 1:  this.refs.screen_snake.style.display = "none";
                     this.refs.screen_menu.style.display = "block";
                     this.refs.screen_setting.style.display = "none";
                     this.refs.screen_gameover.style.display = "none";
                     break;
                
            case 2:  this.refs.screen_snake.style.display = "none";
                     this.refs.screen_menu.style.display = "none";
                     this.refs.screen_setting.style.display = "block";
                     this.refs.screen_gameover.style.display = "none";
                     break;
                
            case 3: this.refs.screen_snake.style.display = "none";
                    this.refs.screen_menu.style.display = "none";
                    this.refs.screen_setting.style.display = "none";
                    this.refs.screen_gameover.style.display = "block";
                    break;
        }
    }
        
        makeBlockChainEvents() {
            this.syncingSubscription = web3.eth.subscribe('syncing', (error, sync) => {
                console.log(`syncing event ${sync}`);
                if (!error)
                    console.log(`error syncing event ${error}`);
    
            })
            .on("data", (sync) => {
                console.log(`data event ${sync}`);
            })
            .on("changed", (isSyncing) => {
                console.log(`changed event ${sync}`);
                if(isSyncing) {
                    // stop app operation
                } else {
                    // regain app operation
                }
            })

            this.newBlocksSubscription = web3.eth.subscribe( 'newBlockHeaders', console.log)
            .on("data", console.log)
            
            web3.eth.getBlockNumber()
            .then((data) => {
                console.log('getBlockNumber ' + data);
                if( this.state.blockNumber !== data){
                    var currBlockObj = web3.eth.getBlock(data)
                    .then( (block) => {
                        if(!block) return
                        this.setState({blockArray: [...this.state.blockArray, block]})
                        this.addFood(block)
                    })
                    .error(console.error)            
                }
                this.setState({blockNumber: data})
            })
            .error(console.error)
            
            
            setTimeout( this.makeBlockChainEvents.bind(this), 3000 )
        }


        componentWillUnmount() {
            this.newBlocksSubscription.unsubscribe();
            this.syncingSubscription.unsubscribe();
        }


    componentDidMount() {
        this.makeBlockChainEvents()
      
        canvas = document.getElementById("snake");
        ctx = canvas.getContext("2d");
               
        this.refs.button_newgame_menu.onclick = () => {this.newGame();};
        this.refs.button_newgame_gameover.onclick = () => {this.newGame();}; 
        // this.refs.button_newgame_setting.onclick = () =>  {this.newGame();}; 
        // this.refs.button_setting_menu.onclick = () => {this.showScreen(2);};
        // this.refs.button_setting_gameover.onclick = () => {this.showScreen(2)};

        this.setSnakeSpeed(150);
        this.setWall(1);
        this.showScreen(1);
        
        document.addEventListener("keydown",  (evt) => {
            if(this.refs.screen_gameover.style.display == "block"){
                evt = evt || window.event;
                if(evt.keyCode == 32){
                    this.newGame();
                }
            }
        })
        
        this.newGame()
    }

    render() {

        return(
            <div>
        <header className="wrap">
            <h1>Current Block - {this.state.blockNumber}</h1>
            <p className="score">Score: <span id="score_value" ref="ele_score">0</span></p>
        </header>
    
        <canvas className="wrap" id="snake" ref="screen_snake" width="800" height="600" tabIndex="1"></canvas>

        <div id="gameover" ref="screen_gameover">
            <h2>Game Over</h2>
            <p>press <span>space</span> to begin a</p>
            <h2><a id="newgame_gameover" ref="button_newgame_gameover">new game</a></h2>
            {/* <a id="setting_gameover">settings</a> */}
        </div>
        <ul>
            {this.state.blockArray.map((e,i) => (<li key={i}>{e.hash}</li>))}
        </ul>
        {/* <p >{JSON.stringify(this.state.blockArray)}</p> */}

        <div id="setting" ref="screen_setting">
            <h2>Settings</h2>
            
          <h2>  <a id="newgame_setting">new game</a></h2>
            
            <p>Speed:
                <input id="speed1" type="radio" name="speed" value="120" checked/>
                <label for="speed1">Slow</label>
                <input id="speed2" type="radio" name="speed" ref="speed_setting" value="75"/>
                <label for="speed2">Normal</label>
                <input id="speed3" type="radio" name="speed" value="35"/>
                <label for="speed3">Fast</label>
            </p>
            
            <p>Wall:
                <input id="wallon" type="radio" name="wall" value="1"/>
                <label for="wallon">On</label>
                <input id="walloff" type="radio" name="wall" value="0"/>
                <label for="walloff">Off</label>
            </p>

        </div>
    

        <div id="menu" ref="screen_menu">
            <h2>Snake</h2>

            <a id="newgame_menu" ref="button_newgame_menu">new game</a>
            {/* <a id="setting_menu">settings</a> */}
        </div>
        </div>
        )
    }
}

export default withStyles(SnakeGame, s);
