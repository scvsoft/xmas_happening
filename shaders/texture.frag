precision highp float;

uniform bool uUseTextures;
uniform sampler2D uSampler;

varying vec2 vTextureCoord;

void main(void) {
    gl_FragColor = texture2D(uSampler, vTextureCoord);   
}
