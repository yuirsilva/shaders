#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.);
    
    float pct = distance(st,vec2(0.5));
    
    color = vec3(step(0.5,pct*2.));
    gl_FragColor = vec4(color,1.0);
}