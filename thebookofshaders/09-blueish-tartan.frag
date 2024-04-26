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
    return 1.-step(0.,b);
}
float outline(in float b, in float t) {
    return 1.-step(0.,b)-step(b,-t);
}

vec3 DARK_BLUE = vec3(0.13, 0.15, 0.27);

void main() {
    vec3 col = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    st+=u_time*0.02;
    st = tile(st,2.);
	vec2 q = st*2.-1.;

    float c = outline(box(st-0.5,vec2(1.,1./22.)),0.006);
    c += outline(box(st-0.5,vec2(1./22.,1.)),0.006);
    c += (smooth(box(st-0.5,vec2(0.5,0.015)))*0.5);
    c += (smooth(box(st-0.5,vec2(0.015,0.5)))*0.5);
    
    float l = smooth(box(abs(q)-vec2(0.65,0.),vec2(1./8.,1.)));
    l += smooth(box(abs(q)-vec2(0.,0.65),vec2(1.,1./8.)));
    l *= 0.75;
    
    vec2 st_str = st-0.5;
    st_str = rotate2d(st_str,-PI*0.25);
    st_str = tile(st_str+0.5,96.160);
    float stripes = smooth(box(st_str-0.5,vec2(0.990,0.21)));
    
    vec3 m = mix(c*length(st-0.5)*2.9,l,stripes)*DARK_BLUE;
    
	col = m;
    gl_FragColor = vec4(col,1.0);
}