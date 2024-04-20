// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    st *= 2.;
    st = fract(st+u_time+st*sin(st.x*+u_time)*0.2);
    float s = smoothstep(0.240,0.376,length(st-0.5));
    
    color = vec3(s);
    gl_FragColor = vec4(color,1.0);
}