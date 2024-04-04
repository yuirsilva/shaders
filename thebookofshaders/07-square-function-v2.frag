#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 square(in float size, in vec2 pos, in vec3 color, vec2 st) {
    st += -pos+0.5;
    float size_normalized = 0.5-(size/2.);
    
	vec2 bl = step(vec2(size_normalized), st);
    vec2 tr = step(vec2(size_normalized), 1.-st);
    
    float pct = (bl.x*bl.y)*(tr.x*tr.y);
    
    return mix(vec3(0.), color, pct);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 square = square(0.5, vec2(0.5), vec3(0.522,0.702,1.000), st);
    
    gl_FragColor = vec4(square, 1.0);
}