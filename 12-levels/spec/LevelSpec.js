/*

  Requisitos:

    El objetivo de este prototipo es añadir niveles al juego. En cada
    nivel deberán ir apareciendo baterías de enemigos según avanza el
    tiempo.

    Cada nivel termina cuando no quedan enemigos por crear en ninguno
    de sus niveles, y cuando todos los enemigos del nivel han
    desaparecido del tablero de juegos (eliminados por misiles/bolas
    de fuego o desaparecidos por la parte de abajo de la pantalla).

    Cuando terminan todos los niveles sin que la nave haya colisionado
    termina el juego, ganando el jugador.

    Cuando la nave del jugador colisiona con un enemigo debe terminar
    el juego, perdiendo el jugador.


  Especificación:

    El constructor Level() recibirá como argumentos la definición del
    nivel y la función callback a la que llamar cuando termine el
    nivel.

    La definición del nivel tiene este formato:
      [ 
        [ parametros de bateria de enemigos ] , 
        [ parametros de bateria de enemigos ] , 
        ... 
      ]


      Los parámetros de cada batería de enemigos son estos:
           Comienzo (ms),  Fin (ms),   Frecuencia (ms),  Tipo,    Override
 Ejemplo:
         [ 0,              4000,       500,              'step',  { x: 100 } ]


    Cada vez que se llame al método step() del nivel éste comprobará:

      - si ha llegado ya el momento de añadir nuevos sprites de alguna
        de las baterías de enemigos.
    
      - si hay que eliminar alguna batería del nivel porque ya ha
        pasado la ventana de tiempo durante la que hay tiene que crear
        enemigos

      - si hay que terminar porque no quedan baterías de enemigos en
        el nivel ni enemigos en el tablero de juegos.

*/





describe("LevelSpec", function(){

    beforeEach(function(){
	    loadFixtures('index.html');

	    canvas = $('#game')[0];
	    expect(canvas).toExist();

	    ctx = canvas.getContext('2d');
	    expect(ctx).toBeDefined();	
        
	    oldGame = Game;
	    
    });

    afterEach(function(){
	    Game = oldGame;
	    
    }); 
    
    
    // ----------- PRUEBAS UNITARIAS ------------------------- //
    
    it ("Level.step", function(){
    
        board = new GameBoard();
        
        var LevelDummie = [
            // Comienzo, Fin, Frecuencia, Tipo, Override
            [ 0, 4000, 500, 'step' ],
            [ 6000, 13000, 800, 'ltr' ],
            [ 10000, 16000, 400, 'circle' ],
            [ 17800, 20000, 500, 'straight', { x: 50 } ],
            [ 18200, 20000, 500, 'straight', { x: 90 } ],
            [ 18200, 20000, 500, 'straight', { x: 10 } ],
            [ 22000, 25000, 400, 'wiggle', { x: 150 } ],
            [ 22000, 25000, 400, 'wiggle', { x: 100 } ]
        ]; 
        
        SpriteSheet.map = {
            ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 },
            missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
            enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
            enemy_bee: { sx: 79, sy: 0, w: 37, h: 43, frames: 1 },
            enemy_ship: { sx: 116, sy: 0, w: 42, h: 43, frames: 1 },
            enemy_circle: { sx: 158, sy: 0, w: 32, h: 33, frames: 1 },
            explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 },
            fireball: { sx: 0, sy: 64, w: 64, h: 64, frames: 1 }
        };
                       
        var callback = function() {};
        
        var level = new Level(LevelDummie, callback);
        board.add(level);
                            
        level.step(5);
        expect(level.t).toBe(5000);
        expect(level.levelData.length).toBe(LevelDummie.length -1 );
        
        spyOn(level.board, "add");  
        level.step(7); //YA debe crear uno porque  6000 < 7000
        expect(level.board.add).toHaveBeenCalled();
        
        //no hay enemigos, pasa el tiempo del ultimo, asique se acaba el tablero
        spyOn(level, "callback");  
        level.board.cnt[OBJECT_ENEMY] = 0;
        level.step(26);
        expect(level.callback).toHaveBeenCalled();               
    });
    
    
    
    it("Despues del nivel 1, nivel 2, despues ganar", function() {
    
        
        
        /*
        SpriteSheet.load = function(spriteData,callback) { 
	            this.map = spriteData;
	            this.image = new Image();
	            this.image.onload = callback;
	            this.image.src = 'images/sprites.png';
        };
        
        //level1 = [[ 0, 1000, 500, 'step'],];
        //level2 = [[ 0, 500, 500, 'step'],];

           
        Game.initialize("game",sprites,startGame);
        Game.keys['right'] = true;
        spyOn(window, "playGame").andCallThrough();
        spyOn(window, "winGame").andCallThrough();
        spyOn(window, "ANivel2").andCallThrough();
        spyOn(window, "playNivel2").andCallThrough();
        Game.loop(); //Empieza el bucle
        expect(window.playGame).not.toHaveBeenCalled(); //todavia no empieza 
        Game.keys['fire'] = false;
        waits(100);   
        
        
        */
        
          
    
    });

});
