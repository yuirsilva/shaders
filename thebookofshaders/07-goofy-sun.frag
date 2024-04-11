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
    
    float radius = length(pos)*3.;
    float angle = atan(pos.y,pos.x);
    
    float shape = 1.-pow(abs(sin(angle*2.+PI/2.)),1.15)+0.2;
    shape += 1.-pow(abs(sin(angle*2.)),1.15)+0.1;
    vec3 center = vec3(1.-step(0.5,radius))*vec3(0.,0.5,1.);
    
    color = vec3(1.-smoothstep(shape,shape+0.005,radius))*vec3(1.,1.,0.);
    color -= center;
    
    gl_FragColor = vec4(color,1.0);
}