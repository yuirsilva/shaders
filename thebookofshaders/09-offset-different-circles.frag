#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circle(vec2 st) {
    return smoothstep(0.,0.016,length(st-0.5)-.3);
}
vec2 tile(vec2 st, float f) {
    st*=f;
    float n = step(1.,mod(u_time,2.));
    float m = 1.-step(1.,mod(u_time,2.));
    
	st.x += n*(2.*(step(1.,mod(st.y,2.)))-1.)*u_time;
    st.y += m*(2.*(step(1.,mod(st.x,2.)))-1.)*u_time;
    return fract(st);
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    st = tile(st,8.);

    color = vec3(circle(st));
    gl_FragColor = vec4(color,1.0);
}