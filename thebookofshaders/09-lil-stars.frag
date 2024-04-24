#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 tile(vec2 st, float f) {
    st=st*f;
    return fract(st);
}
float box(vec2 st, float i) {
    st = st*2.-1.;
    float d = length(max(abs(st)-i,0.));
    return smoothstep(0.248,0.236,d)*smoothstep(0.264,0.250,d);
}
void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    st = tile(st-0.5,4.);
    
    color = vec3(box(st,0.75));
    gl_FragColor = vec4(color,1.0);
}