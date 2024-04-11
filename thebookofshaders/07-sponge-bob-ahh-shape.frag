#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.);
    
    vec2 pos = vec2(0.5)-st;
    
    // length of a vector is always positive
    // so length of 0.5*2 = 1
    float radius = length(pos)*2.;
    float angle = atan(pos.y,pos.x);
    
    float shape = abs(cos(angle*2.5+u_time))*0.5+0.108;
    
    color = vec3(1.-smoothstep(shape, shape+0.015,radius));

    gl_FragColor = vec4(color,1.0);
}