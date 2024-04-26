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
// Credits (box SDF): Inigo Quilez
float box( in vec2 p, in vec2 b ) {
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}
float smooth(in float b) {
    return step(-0.344,b);
}
float outline(in float b) {
    return 1.-step(0.,b)-step(b,-0.02);
}

void main() {
    vec3 col = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec2 q = st;
    q = st*2.-1.;

    float f = outline(box(q,vec2(0.450)));
    
    q = rotate2d(q,PI*0.75);
    q = tile(q,4.)-0.5;
    float b = 1.-smooth(box(q,vec2(1.000,0.5)));
    
    float m = mix(f,0.,b);
	col = vec3(m);    
    gl_FragColor = vec4(col,1.0);
}