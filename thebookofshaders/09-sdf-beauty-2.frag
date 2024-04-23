#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float easeInOutQuint(float x) {
	return x < 0.5 ? 16. * x * x * x * x * x : 1. - pow(-2. * x + 2., 5.) / 2.;
}
vec2 rotate2d(vec2 st, float a) {
    vec2 d = st;
    d -=0.5;
    d = mat2(cos(a),-sin(a),sin(a),cos(a))*d;
    d +=0.5;
    return d;
}
vec2 tiling(vec2 st, float f) {
    st = st*f;
    return fract(st);
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    // fract(sin(x)*1.0);
    
    st=st*2.-1.;
 	float a = atan(st.y,st.x);
    float a_two = atan(st.x,st.y)/(PI*2.)+0.5;
    float r = length(max(abs(st)-0.25,0.));
    
    color = vec3(1.-smoothstep(0.02,0.02+0.006,r*length((st*sin(a+u_time))-vec2(sin(u_time)*0.8,cos(u_time)*0.3))));
    color *= vec3(r,r,r*5.);
    gl_FragColor = vec4(color,1.0);
}