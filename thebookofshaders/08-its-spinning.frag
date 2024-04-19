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

mat2 scale2d(vec2 s) {
    return mat2(s.x,0.,
               0.,s.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    st -= vec2(0.5);
    st = rotate2d(sin(u_time)*PI)*st;
    st = scale2d(vec2(sin(u_time)))*st;
    st += vec2(0.5);
    
    vec3 color = vec3(0.);
    float bl = step(0.1,st.x)*step(0.1,st.y)*step(0.1,1.-st.y)*step(0.1,1.-st.x);

    color = vec3(st.x,st.y,0.);
    color += vec3(bl);

    gl_FragColor = vec4(color,1.0);
}