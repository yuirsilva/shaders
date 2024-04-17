#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    st = st*2.-1.;
    vec3 color = vec3(0.);
    float s = pow(length(abs(st)*st.y*st.x),length(abs(st)-sin(u_time)*0.5-0.5));
    color = vec3(s);

    gl_FragColor = vec4(color,1.0);
}