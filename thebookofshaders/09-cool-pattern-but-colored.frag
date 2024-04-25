#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

vec2 tile(vec2 st, float f){ return fract(st*f); }
vec2 rotate2d(vec2 st, float a) {
    st-=0.5;
    st=mat2(cos(a),-sin(a),sin(a),cos(a))*st;
    st+=0.5;
    return st;
}
float box(vec2 st, vec2 size){
    vec2 s=step(vec2((0.5-size)/2.)+0.25,st);
    s*=step(vec2((0.5-size)/2.)+0.25,1.-st);
    return s.x*s.y;
}

void main() {
    vec3 col = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    float a = atan(st.x,st.y);
    float r = length(st);
    
    float f = box(st, vec2(0.5));
    float s = mix(0.,f,ceil(sin(fract(rotate2d(st*sin(a*a)*0.3+u_time*0.04,PI*0.75).y*30.)*PI*2.)));
    
    col = vec3(s*vec3(r*a,r*r,r*a*2.));
    gl_FragColor = vec4(col,1.0);
}