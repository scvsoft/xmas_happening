precision highp float;

uniform bool uUseTextures;
uniform sampler2D uSampler;

varying vec2 vTextureCoord;

void main(void) {
	vec4 color = texture2D(uSampler, vTextureCoord);
    gl_FragColor = color;
}
