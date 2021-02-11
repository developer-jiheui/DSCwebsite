import React from "react";
import {Container, Image} from 'semantic-ui-react';
import { GlowParticle } from "./glowparticle.js";
import "./index.css";

const COLORS = [
    {r: 45, g:74, b:277}, //b
    {r: 250, g:255, b:89}, //y
    {r: 255, g:104, b:248}, //p
    {r: 44, g:209, b:252}, //cian
    {r: 54, g:233, b:84}, //green
];

class MulticolorAnimation extends React.Component {
    
    constructor(props){
        super(props);
    }

    componentDidMount(){
        new App();
        alert("ALERERKLERJHEKJHR!!!!!!!!!!!!");
    }

    render(){
        return <div id="multicolorAnimation" >
        </div>;
    }
    
}



class App{
    constructor(){
        this.canvas = document.createElement('canvas');
        document.getElementById("multicolorAnimation").appendChild(this.canvas)
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = (window.devicePixelRatio >1) ? 2 :1;

        this.totalParticales = 15;
        this.particles = [];
        this.maxRadius = 90;
        this.minRadius = 40;

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));

    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth*this.pixelRatio;
        this.canvas.height = this.stageHeight*this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.createParticles();
    }

    createParticles(){
        let curColor = 0;
        this.particles =[];

        for (let index = 0; index < this.totalParticales; index++) {
            const item = new GlowParticle(
                Math.random() * this.stageWidth,
                Math.random() * this.stageHeight,
                Math.random() * 
                (this.maxRadius - this.minRadius) + this.minRadius,
                COLORS[curColor] 
            );
            
            if(++curColor >= COLORS.length){
                curColor = 0;
            }

            this.particles[index] =item;

        }

    }

    animate(){
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0,0,this.stageWidth, this.stageHeight);

        for (let index = 0; index < this.totalParticales; index++) {
            const item = this.particles[index];
            item.animate(this.ctx, this.stageWidth, this.stageHeight);
            
        }
    }
}

// window.onload = () => {
//    new App();
// }






export default MulticolorAnimation;