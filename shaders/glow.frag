precision highp float;

uniform bool uUseTextures;
uniform sampler2D uSampler;
uniform bool uUseBloom;

varying vec2 vTextureCoord;
varying vec4 vPosition;
varying vec3 vNormal;
varying vec3 vViewVector;

float Gaussian(float x, float deviation) {
    return (1.0 / sqrt(2.0 * 3.141592 * deviation)) * exp(-((x * x) / (2.0 * deviation)));
}

void main(void) {
    if (uUseBloom) {
        float pi = 3.141592;
        float sigma = 4.0;
        float blurSize = 0.005;
        vec2 blurMultiplyVec = vec2(1.0, 0.0);

        vec3 incrementalGaussian;
        incrementalGaussian.x = 1.0 / (sqrt(2.0 * pi) * sigma);
        incrementalGaussian.y = exp(-0.5 / (sigma * sigma));
        incrementalGaussian.z = incrementalGaussian.y * incrementalGaussian.y;

        vec4 avgValue = vec4(0.0, 0.0, 0.0, 0.0);
        float coefficientSum = 0.0;

        avgValue += texture2D(uSampler, vTextureCoord) * incrementalGaussian.x;
        coefficientSum += incrementalGaussian.x;
        incrementalGaussian.xy *= incrementalGaussian.yz;

        for (float i = 1.0; i <= 4.0; i++) {
            avgValue += texture2D(uSampler, vTextureCoord - i * blurSize * blurMultiplyVec) * incrementalGaussian.x;
            avgValue += texture2D(uSampler, vTextureCoord + i * blurSize * blurMultiplyVec) * incrementalGaussian.x;
            coefficientSum += 2.0 * incrementalGaussian.x;
            incrementalGaussian.xy *= incrementalGaussian.yz;
        }

        gl_FragColor = avgValue / coefficientSum + texture2D(uSampler, vTextureCoord);
    }
    else {
        gl_FragColor = texture2D(uSampler, vTextureCoord);   
    }
}
