#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 rotate2d(vec2 st, float a) {
    st-=0.5;
    st = mat2(cos(a),-sin(a),sin(a),cos(a))*st;
    st+=0.5;
    return st;
}
vec2 tile(vec2 st, float f) {
    st=st*f;
    return fract(st);
}
float box(vec2 st, float i) {
    st = st*2.-1.;
    float d = length(min(abs(st)-i,0.14));
    return smoothstep(0.240,0.240+0.006,d)*1.-smoothstep(0.320,0.344+0.006,d);
}
void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    st = tile(st,3.);
    
    color = vec3(box(st,0.588));
    gl_FragColor = vec4(color,1.);
}