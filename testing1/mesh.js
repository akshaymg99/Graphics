export default class Mesh
{
	constructor(gl, cord, shapeMode)
	{
		let mx = cord[0];
		let my = cord[1];
		if (shapeMode === "r") {
			this.vertexPositionData = new Float32Array([
				mx-0.125, my-0.25, 0.0,
				mx+0.125, my-0.25, 0.0,
				mx-0.125, my+0.25, 0.0,
				mx+0.125, my+0.25, 0.0	
			]);
		}
		else if (shapeMode === "s") {
			this.vertexPositionData = new Float32Array([
				mx-0.125, my-0.125, 0.0,
				mx+0.125, my-0.125, 0.0,
				mx-0.125, my+0.125, 0.0,
				mx+0.125, my+0.125, 0.0	
			]);
		}
		this.gl = gl;

		this.buffer = this.gl.createBuffer();
		if (!this.buffer)
		{
			throw new Error("Buffer could not be allocated");
		}
	}

	draw(shader)
	{		
		const elementPerVertex = 3;
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertexPositionData, this.gl.STATIC_DRAW);
		
		const aPosition = shader.attribute("aPosition");
		this.gl.enableVertexAttribArray(aPosition);
		this.gl.vertexAttribPointer(aPosition, elementPerVertex, this.gl.FLOAT, false, 0, 0);

		this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, this.vertexPositionData.length / elementPerVertex);
	}
}
