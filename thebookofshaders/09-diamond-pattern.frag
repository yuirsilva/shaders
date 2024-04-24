#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

vec2 rotate2d(vec2 st, float a) {
    vec2 d = st;
    d -= 0.5;
    d = mat2(cos(a),-sin(a),sin(a),cos(a))*d;
    d += 0.5;
    return d;
}

float box(vec2 st, float size) {
    vec2 uv = step(vec2(size),st);
    uv *= step(vec2(size),1.-st);
    return uv.x*uv.y;
}
float bg(vec2 st, float size) {
    st = st*2.-1.;
    float d = length(min(abs(st)-0.058,0.));
    return 1.-smoothstep(0.,0.+0.006,d);
}
vec2 tile(vec2 st, float f){
    st = st*f;
    return fract(st);
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    st = tile(st,12.);
    float c = box(rotate2d(st,PI*0.25),0.4);
    float c2 = box(rotate2d(st,PI*0.25),0.35);

    color = vec3(bg(st,0.1)-c2+2.*c);
    gl_FragColor = vec4(color,1.0);
}