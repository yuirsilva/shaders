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
vec3 tile(vec2 st, float f){
    st*=f;
    float index = 0.;
    index += step(1., mod(st.x,2.0));
    index += step(1., mod(st.y,2.0))*2.0;
    st.x += step(1.,mod(st.y,2.))*0.5*u_time;
    
    return vec3(fract(st),index);
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
	st = rotate2d(st, PI*0.25);

    st = st*2.-1.;
    
    vec3 res = tile(st, 4.);
    vec2 st_res = res.xy;
    float i = res.z;
    
    float f = 1.-smoothstep(0.262,0.262+0.009,length(max(abs(st_res-0.5)-0.215*st.x,0.)));
    
    color = vec3(f);
    gl_FragColor = vec4(color,1.0);
}