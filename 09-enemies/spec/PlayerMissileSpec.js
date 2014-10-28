/*

  Requisitos: 

  La nave del usuario disparar� 2 misiles si est� pulsada la tecla de
  espacio y ha pasado el tiempo de recarga del arma.

  El arma tendr� un tiempo de recarga de 0,25s, no pudi�ndose enviar
  dos nuevos misiles antes de que pasen 0,25s desde que se enviaron
  los anteriores



  Especificaci�n:

  - Hay que a�adir a la variable sprites la especificaci�n del sprite
    missile

  - Cada vez que el usuario presione la tecla de espacio se a�adir�n
    misiles al tablero de juego en la posici�n en la que est� la nave
    del usuario. En el c�digo de la clase PlayerSip es donde tienen
    que a�adirse los misiles

  - La clase PlayerMissile es la que implementa los misiles. Es
    importante que la creaci�n de los misiles sea poco costosa pues va
    a haber muchos disparos, para lo cual se declarar�n los m�todos de
    la clase en el prototipo

*/

describe("Prueba de funcion PlayerMissile", function(){

    var canvas, ctx;

    beforeEach(function(){
	    loadFixtures('index.html');

	    canvas = $('#game')[0];
	    expect(canvas).toExist();

	    ctx = canvas.getContext('2d');
	    expect(ctx).toBeDefined();
	
	    //SpriteSheet.load (sprites,function(){});    MAL la dejo comentada para saber que la quite y acordarme 
	    oldGame = Game;
	   	
    });

    afterEach(function(){
	    Game = oldGame;
    }); 
    
    
    it ("step", function(){
        
        // Pruebo que haga bien el valor de y, debe darme (20), calculado yo a mano
        SpriteSheet = {     
            draw : function () {},
            map : {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 }}
        }
        
        //al hacer el problema 6 del protocolo 08 y tocar PlayerShipSpec.js me da error la linea que tengo comentada en la 44 y para no tener
        //que usar eso me hago este SpriteSheet. Me ha costado entenderlo.
    
        misil = new PlayerMissile(10,100);
        
        var dt = 0.1;
        misil.step(dt);
        
        expect(misil.y).toEqual(20);
        
        //Pruebo que ahora this.y < -this.h para que haga llamar a remove.
        misil2 = new PlayerMissile(10,50);
        
        var boarddummie = {     //Game board en el que estaria el misil.
            remove: function (){}
        };
        
        misil2.board = boarddummie;
        
        spyOn(misil2.board, "remove")
        
        misil2.step(dt);
        expect(misil2.board.remove).toHaveBeenCalled();
           
    });
    
    
    it ("draw", function(){
        
        SpriteSheet = {
            draw: function(ctx, name, x, y) {},        
            map : {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 }}    
        }
        
        misil = new PlayerMissile(10,100);
             
        spyOn(SpriteSheet, "draw");
        misil.draw(ctx)
        expect(SpriteSheet.draw).toHaveBeenCalled();
        expect(SpriteSheet.draw.calls[0].args[0]).toEqual(ctx);
        expect(SpriteSheet.draw.calls[0].args[1]).toEqual("missile");
        expect(SpriteSheet.draw.calls[0].args[2]).toEqual(misil.x);
        expect(SpriteSheet.draw.calls[0].args[3]).toEqual(misil.y);
        
    });
    
    
});
