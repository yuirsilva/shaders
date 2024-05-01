#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// float random(vec2 st, vec2 f) {
//     return fract(sin(dot(st,f))*43824.2312);
// }
float random(vec2 st, vec2 f) {
    return fract(sin((st.x*st.y)*10000.)*43824.2312);
}

void main() {
	vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    float r = random(st, vec2(12.8,84.));
    
    color = vec3(r);
    gl_FragColor = vec4(color,1.0);
}