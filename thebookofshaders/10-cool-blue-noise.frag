#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(vec2 st) {
    return fract(sin(st.x*12.231+st.y*80.2312)*48403.3423+u_time);
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

	color = vec3(0.,random(st),1.);    
    gl_FragColor = vec4(color,1.0);
}