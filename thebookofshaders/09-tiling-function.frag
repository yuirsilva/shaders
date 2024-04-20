#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 tiling(vec2 st, float f) {
    vec2 d = fract(st*f);
    return d;
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    st = tiling(st,2.);
    float s = smoothstep(0.240,0.376,length(st+sin(u_time)-0.5));
    
    color = vec3(s);
    gl_FragColor = vec4(color,1.0);
}