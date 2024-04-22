#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 rotate2d(vec2 st, float a) {
    vec2 d = st;
    d -=0.5;
    d = mat2(cos(a),-sin(a),sin(a),cos(a))*d;
    d +=0.5;
    return d;
}
float box(vec2 st) {
    vec2 uv = step(vec2(0.2),st);
    uv*=step(vec2(0.2),1.-st);
    return uv.x*uv.y;
}
vec2 tiling(vec2 st, float f) {
    st = st*f;
    return fract(st);
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
 	float a = atan(st.x,st.y);
    float r = length(st-0.5);
    
    st = tiling(st,3.);
    st = rotate2d(st,PI+u_time);
    
    color = vec3(box(st)*a*vec3(0.704,a*r+sin(u_time),r));

    gl_FragColor = vec4(color,1.0);
}