#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

vec2 rotate2d(vec2 st, float a) {
    st -= 0.5;
    st = mat2(cos(a),-sin(a),sin(a),cos(a))*st;
    st += 0.5;
    return st;
}
float circle(vec2 st, float r) {
    return smoothstep(0.,0.01,length(st)-r);
}
float box(vec2 st, vec2 p) {
    vec2 d = step(p,st);
    d *= step(p,1.-st);
    return d.x*d.y;
}
vec2 tile(vec2 st, float f){
    st*=f;
    float r = step(1.,mod(st.y,2.));
    if (r == 0.) {
        st = rotate2d(st, PI);
    }
    return fract(st);
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    float r = length(st-0.5);
    
    st = tile(st,8.);
    float a = atan(st.x,st.y);
    st = rotate2d(st, PI*0.5*r);
    
    color = vec3(circle(st-0.5,0.492)+box(st-vec2(0.5,0.),vec2(0.)));
    gl_FragColor = vec4(color,1.0);
}