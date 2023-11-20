class CodePattern { 

    static init(){
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.w = null;
        this.h = null;
        // this.symbols = '◘○♣♦♠♥';
        this.symbols = '❄❆❅❉❊❋❄';
        this.data = [];
        this.speed = 30;
        this.symbCount = 200


        this.resize();
        addEventListener('resize', this.resize.bind(this)); // опущен window.
        this.update();
    }

    static get size() { return this.w / this.symbCount }
    static random(min, max) { return Math.round(Math.random()* (max-min)+min) }

    static resize(){
        this.w = this.canvas.width = innerWidth
        this.h = this.canvas.height = innerHeight
    }

    static pushData() {
        while (this.data.length < 1000) {
            this.data.push( new Syb( 
                this.random(0, this.symbCount)*this.size,
                this.random(0,this.size),
                this.symbols[this.random(0, this.symbols.length - 1)],
                
                ));
                if (this.random(0, 100) < 20) break;
        }
    }
    static draw() {
        this.ctx.fillStyle = 'hsl(200,100%,50%)';
        this.ctx.fillRect(0,0,this.w,this.h)


        this.data.forEach((e,i) => {
            e.y += e.size;
            e.y > this.h + this.size ? this.data.splice(i, 1) : null;
            e.draw(this.ctx);
        })

    }

    static update(){
        this.pushData();
        this.draw();

        setTimeout(this.update.bind(this), this.speed)
    }
}

class Syb { 
    constructor(x, size, sybl){
        this.x = x;
        this.y = -size;
        this.size = size;
        this.s = sybl;
    }

    draw(ctx) {
        ctx.fillStyle = 'hsl(200,100%,100%)';
        ctx.font = this.size + 'px monospace';
        ctx.fillText(this.s, this.x, this.y)
    }
}

CodePattern.init()