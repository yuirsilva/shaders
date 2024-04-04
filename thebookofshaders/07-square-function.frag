#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float square(float size, in vec2 st) {
    vec3 color = vec3(0.);
    float size_normalized = 0.5-(size/2.);
    
	vec2 bl = step(vec2(size_normalized), st);
    vec2 tr = step(vec2(size_normalized), 1.-st);
    
    float pct = (bl.x*bl.y)*(tr.x*tr.y);
    
    return pct;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 square = vec3(square(0.5, st));
    
    gl_FragColor = vec4(square, 1.0);
}