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
    
    float radius = length(pos)*2.;
    float angle = atan(pos.y,pos.x);
    
    float circle = 1.-smoothstep(0.2,0.2+0.006,radius);
    float shape = smoothstep(-.5,0.3, cos(angle*10.+u_time))*0.1+0.5;
    
    color = vec3(1.-smoothstep(shape,shape+0.02,radius));
    color = vec3(color-circle);

    gl_FragColor = vec4(color,1.0);
}