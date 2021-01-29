import Shader from './shader.js';
import vertexShaderSrc from './vertex.js';
import fragmentShaderSrc from './fragment.js';
import fragmentShaderSrc2 from './fragment2.js';
import Renderer from './renderer.js';
import Mesh from './mesh.js'

const renderer = new Renderer();
const gl = renderer.webGlContext();

let systemMode = 0;
let shapeMode = 0;

function mouseToClipCoord(mouseX, mouseY) {
	mouseX = mouseX / renderer.canvas.width;
	mouseY = mouseY / renderer.canvas.height;
	mouseX = mouseX * 2;
	mouseY = mouseY * 2;
	mouseX = mouseX - 1;
	mouseY = mouseY - 1;
	mouseY = -mouseY; 
	return [mouseX, mouseY];
}

window.onload = () =>
	{
		renderer.canvas.addEventListener("click", (event) =>
		{
			let rect = renderer.canvas.getBoundingClientRect(); 
			let mouseX = event.clientX - rect.left;
			let mouseY = event.clientY - rect.top;
			let cord = mouseToClipCoord(mouseX, mouseY);
			console.log("click read");
			if(systemMode === 0) {
				if(shapeMode === "r") {
					//Draw rectangle 
					console.log("Key R read");
					const shader = new Shader(gl, vertexShaderSrc, fragmentShaderSrc); 
					shader.use();
					const mesh = new Mesh(gl, cord, shapeMode);
					mesh.draw(shader);
					shader.delete();
				}	
				else if (shapeMode === "s") {
					// Draw square
					console.log("Key S read")
					const shader = new Shader(gl, vertexShaderSrc, fragmentShaderSrc2); 
					shader.use();
					const mesh = new Mesh(gl, cord, shapeMode);
					mesh.draw(shader);
					shader.delete();
				}
			} // end of systeMode = 0
		}); //end of renderer event

		window.addEventListener("keydown", function(event)
		{
			switch(event.key) {
				case "ArrowDown":
					break;
				case "ArrowUp":
					break;
				case "ArrowLeft":
					if(systemMode === 1) {
						//Move selected primitve left
					}
					else if(systemMode === 2) {
						//Rotate the scene anticlokwise
					}
					break;
				case "ArrowRight":
					if(systemMode === 1) {
						//Move selected primitve right
					}
					else if(systemMode === 2) {
						//Rotate the scene clokwise  
					}
					break;
				case "r":
					shapeMode = "r";
					break;
				case "s":
					shapeMode = "s";
					break;
				case "m":
				systemMode = (systemMode + 1) % 3;
				break;
			}
		}, 
			true
		);
	}; // end of window onload

//Draw loop
//function animate()
//{
//	renderer.clear();
//	mesh.draw(shader);
//	window.requestAnimationFrame(animate);
//}

//animate();
//shader.delete();