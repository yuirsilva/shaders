#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 RED = vec3(0.167,0.515,0.740);

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.);
    
    float pct = length(st-0.5);
    color = vec3(atan(0.048,pct));
    
    gl_FragColor = vec4(color+RED,1.0);
}