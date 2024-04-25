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
    
    st = tile(st,1.);
    vec2 q = st*2.-1.;

    float stripes = box(abs(q)-0.315,vec2(1./4.,2.))+box(abs(q)-0.315,vec2(2.,1./4.));
    
    float boxes = box(st,vec2(1./8.,1.))+box(st,vec2(1.,1./8.));
    boxes += box(abs(q)+0.28,vec2(1./14.,2.))+box(abs(q)+0.28,vec2(2.,1./14.));
    boxes += box(abs(q)+0.15,vec2(1./14.,2.))+box(abs(q)+0.15,vec2(2.,1./14.));
    
    vec2 strr = st;
    strr = strr -0.5;
    strr = rotate2d(strr,-PI*0.25);
    strr = tile(strr+0.5,96.160);
    float str = box(strr,vec2(1.,0.5));
    float m = mix(boxes*0.3, stripes, str);
    
    col = vec3(m);
    gl_FragColor = vec4(col,1.0);
}