describe("Objetos construidos con Sprite", function(){
    var canvas, ctx;

    beforeEach(function(){
	    loadFixtures('index.html');

	    canvas = $('#game')[0];
	    expect(canvas).toExist();

	    ctx = canvas.getContext('2d');
	    expect(ctx).toBeDefined();
	    
        SpriteSheet ={
            draw : function () {},
            map: { ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 }}
        };
        
	
	    oldGame = Game;
    });

    afterEach(function(){
	    Game = oldGame;
    }); 
    
    
    it ("PlayerShip y draw", function(){

        objeto = new Sprite();
        objeto.setup('ship', { vx: 0, reloadTime: 0.25, maxVel: 200 });
        
        spyOn(SpriteSheet, "draw");
        objeto.draw(ctx);
        
        expect(SpriteSheet.draw).toHaveBeenCalled();
        expect(SpriteSheet.draw.calls[0].args[0]).toEqual(ctx);
        expect(SpriteSheet.draw.calls[0].args[1]).toEqual("ship");
        expect(SpriteSheet.draw.calls[0].args[2]).toEqual(objeto.x);
        expect(SpriteSheet.draw.calls[0].args[3]).toEqual(objeto.y);
    
    }); 
    
    it ("PlayerShip y merge", function(){
    
        objeto = new Sprite();
        objeto.setup('ship', { vx: 0, reloadTime: 0.25, maxVel: 200 });
        
        expect(objeto.vx).toBe(0);
        expect(objeto.reloadTime).toBe(0.25);
        expect(objeto.maxVel).toBe(200);        
    });
    
    //Queda testado como se crea un objeto con Sprite, poniendo como ejemplo PlayerShip y quedan probados draw y merge


});

