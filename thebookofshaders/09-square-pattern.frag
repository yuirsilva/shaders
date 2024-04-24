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
float box(vec2 st, float limit) {
    vec2 s = step(vec2(limit),st);
    s *= step(vec2(limit),1.-st);
    return s.x*s.y;
}
vec2 tile(vec2 st, float f) {
    st = st*f;
    return fract(st);
}
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    st = tile(st,4.);
    float a = atan(st.x,st.y);
    float r = length(st);

    vec3 color = vec3(0.);
    float b = box(rotate2d(st,PI*0.25+u_time),0.15);
    float i = 1.-box(st,0.35);
    
    color = vec3(min(b,i)*r);
    color *= vec3(a*r*abs(cos(r+u_time)),a/2.*r+sin(u_time),r*PI);
    gl_FragColor = vec4(color,1.0);
}