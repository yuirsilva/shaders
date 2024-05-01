#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(vec2 st, vec2 f) {
    return fract(sin(dot(st+sin(u_time*0.0000002),f))*123332.2312);
}

void main() {
	vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    float r = random(st, vec2(0.990,844460));
    
    color = vec3(r);
    gl_FragColor = vec4(color,1.0);
}