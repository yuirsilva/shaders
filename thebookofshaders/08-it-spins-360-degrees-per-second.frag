#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

mat2 rotate2d(float a){
    return mat2(cos(a),-sin(a),
                sin(a),cos(a));
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    st -= vec2(0.5);
    st = rotate2d(u_time*PI*2.)*st;
    st += vec2(0.5);
    
    vec3 color = vec3(0.);
    float bl = step(0.1,st.x)*step(0.1,st.y)*step(0.1,1.-st.y)*step(0.1,1.-st.x);
    
    color = vec3(bl);

    gl_FragColor = vec4(color,1.0);
}