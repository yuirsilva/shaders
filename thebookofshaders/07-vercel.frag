// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.);
    
    st = st*2.-1.;
    
    int N = 3;
    float a = atan(st.y,st.x)+PI/2.;
    float r = TWO_PI/float(N);
    
    float s = cos(floor(.5+a/r)*r-a)*length(abs(st));
    
    color = vec3(1.-smoothstep(0.200,0.204,s));
    
    gl_FragColor = vec4(color,1.0);
}