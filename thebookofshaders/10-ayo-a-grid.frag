#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
	st *= 10.;
    
    vec2 ipos = floor(st);
    vec2 fpos = fract(st);
    
    color = vec3(ipos/10.,0.);
    gl_FragColor = vec4(color,1.0);
}