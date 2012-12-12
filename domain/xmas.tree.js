function XmasTree() {
	this.balls = [];
	this.currentIndex = 0;
	this.canvasId = 'webGLCanvas';
	this.overlayId = 'overlay';
} 

XmasTree.prototype = {
	addBall: function (ball) {
		this.balls.push(ball);
	},
	render: function() {
		this.renderScene();
		this.ballLoop();
	},	
	renderScene: function() {
		var canvasId = this.canvasId;
		require(["crimild"], function(crimild) {
			var assetManager = crimild.utils.assetManager();
			assetManager.queueImage("../assets/crate.gif");
			assetManager.loadAll(function() {
				var canvas = document.getElementById(canvasId);
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
				
				var scene = crimild.core.groupNode({
					name: "scene",
                    nodes: [
                        crimild.core.geometryNode({
                            name: "a cube",
                            primitives: [
                                crimild.primitives.cubePrimitive()
                            ],
                            local: crimild.math.transformation({
                                translate: [0, 0, 0]
                            }),
                            components: [
                                crimild.components.rotationComponent({angle: 0.01, axis: [0.5, 0, 1]}),
                            ]
                        }),
                        crimild.rendering.cameraNode({
           		            aspectRatio: canvas.width / canvas.height,
                            local: crimild.math.transformation({
                            	translate: [0, 0, 5]
                            }),
                        })
                    ],
                    components: [
                        crimild.rendering.renderComponent({
                            effects: [
                                crimild.rendering.effect({
                                    textures: [
                                        crimild.rendering.texture({
                                            image: assetManager.getImage("../assets/crate.gif")
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                });

                crimild.simulation.run({canvas: canvas, scenes: [scene]});
    
                $('#loading').hide();
                $('#wrapper').show();
			});
		});
	},
	
	ballLoop: function() {
		//cycle through balls
		if (this.currentIndex >= this.balls.length) {
			this.currentIndex = 0;
		}
		this.showCurrentBall();
	},	
	showCurrentBall: function() {
		$("#overlay iframe").attr("src",this.balls[this.currentIndex].appUrl);
		$("#overlay").delay(5000).fadeIn(1000, $.proxy(this.hideCurrentBall, this));
	},
	hideCurrentBall: function() {
		this.currentIndex = this.currentIndex + 1;
		$("#overlay").delay(3000).fadeOut(1000, $.proxy(this.ballLoop, this));
	}

}