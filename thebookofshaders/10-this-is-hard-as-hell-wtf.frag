#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359
#define H_PI 1.57079632679
#define TWO_PI 6.28318530718

// COLORS
const vec3 DARK_GREEN = vec3(0.31, 0.53, 0.24);
const vec3 ORANGE = vec3(0.84, 0.5, 0.23);
const vec3 RED = vec3(0.84, 0.35, 0.24);
const vec3 BLUE = vec3(0.24, 0.4, 0.69);
const vec3 TAN = vec3(0.91, 0.91, 0.87);
const vec3 GOLD = vec3(0.83, 0.67, 0.23);
const vec3 BLACK = vec3(0.1);

vec2 rotate2d(vec2 st, float a) {
    st -= 0.5;
    st = mat2(cos(a),-sin(a),sin(a),cos(a))*st;
    st += 0.5;
    return st;
}
vec2 tile(vec2 st, float f) {return fract(st*f);}
float random (in float x) {
    return fract(sin(x)*1e4);
}
float random(vec2 n) {
    return fract(sin(dot(n,vec2(12.5932285,79.328041)))*48318.328094);
}
float easeInOutQuint(float x) {
	return x < 0.5 ? 16.*x*x*x*x*x : 1.-pow(-2.*x+2.,5.)/2.;
}
vec2 truchet(vec2 st, float i) {
    if (i > 0.75) {
        st = vec2(1.0) - st;
    } else if (i > 0.5) {
        st = vec2(1.0-st.x,st.y);
    } else if (i > 0.25) {
        st = 1.0-vec2(1.0-st.x,st.y);
    }
    return st;
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    st = rotate2d(st,u_time);
    
    st.x += sin(u_time*PI);
    
	float s = smoothstep(st.x,st.x+0.006,st.y);
    color = vec3(s);
    gl_FragColor = vec4(color,1.0);
}