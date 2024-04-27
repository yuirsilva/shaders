#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265358979323846

vec2 rotate2d(vec2 st, float a) {
    st -= 0.5;
    st = mat2(cos(a),-sin(a),sin(a),cos(a))*st;
    st += 0.5;
    return st;
}
vec2 tile(vec2 st, float f) {return fract(st*f);}
vec2 truchetPattern(vec2 st) {
    st*=2.;
    
    float index = 0.;
    index += step(1.,st.x);
    index += step(1.,st.y)*2.;

    if (index == 3.) {
        st = rotate2d(st, PI);
    } else if (index == 0.) {
        st = rotate2d(st, PI*0.50001);
    } else if (index == 1.) {
        st = rotate2d(st, PI);
    }
    
    st = fract(st);
    return st;
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    st = truchetPattern(st);
    st = tile(st,12.);
    st = rotate2d(st, PI*0.25);

    color = vec3(step(st.x,st.y));
    gl_FragColor = vec4(color,1.0);
}