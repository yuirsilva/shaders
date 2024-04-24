#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

vec2 tile(vec2 st, float f){
    st = st*f;
    return fract(st);
}
void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    st.x += sin(u_time+st.x*st.y);
    st = tile(st,8.);
    
    float s = smoothstep(0.3,0.3+0.004,length(st-0.5));
    
    color = vec3(s);
    gl_FragColor = vec4(color,1.0);
}