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

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
	st = tile(st,4.);
    st = st*2.-1.;
    
    vec2 p = step(vec2(0.),st);
    float s = p.x-p.y;

    color = vec3(s*s);
    gl_FragColor = vec4(color,1.0);
}