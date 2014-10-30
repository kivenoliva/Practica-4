describe("Clase FireBall", function(){

    var canvas, ctx;

    beforeEach(function(){
	    loadFixtures('index.html');

	    canvas = $('#game')[0];
	    expect(canvas).toExist();

	    ctx = canvas.getContext('2d');
	    expect(ctx).toBeDefined();
	    
        SpriteSheet = {
            map : {fireball: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 }},
            draw : function () {}
        }
	
	    oldGame = Game;

    });

    afterEach(function(){
	    Game = oldGame;
    });
    
    it ("draw", function(){
       
        var fireBall = new PlayerFireball(5,5,2);
        
        spyOn(SpriteSheet, "draw");
        
        fireBall.draw(ctx);
        expect(SpriteSheet.draw).toHaveBeenCalled();
        expect(SpriteSheet.draw.calls[0].args[1]).toEqual("fireball");
        expect(SpriteSheet.draw.calls[0].args[2]).toEqual(fireBall.x);
        expect(SpriteSheet.draw.calls[0].args[3]).toEqual(fireBall.y);
    
    }); 
    
    /*
    it ("step", function(){
        var fireBall1 = new PlayerFireball(200,480,2);
        var fireBall2 = new PlayerFireball(15,15,-2);
        var fireBall3 = new PlayerFireball(25,25,2);
        
        var dt = 0.1;
        fireBall1.step(dt);
        
        expect(fireBall1.vx).toBe(160);
        expect(fireBall1.x).toBe(184);
        expect(fireBall1.y).toBe(246);
    
    });
    
    */
    
    
});
