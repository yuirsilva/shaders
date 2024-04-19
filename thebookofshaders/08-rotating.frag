#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat2 rotate2d(float angle) {
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.);
    
    vec2 uv = st*2.-1.;
    uv = rotate2d(u_time)*uv;
    float s = max(abs(uv.x),abs(uv.y));
    
    color = vec3(smoothstep(0.495,0.5,s));

    gl_FragColor = vec4(color,1.0);
}