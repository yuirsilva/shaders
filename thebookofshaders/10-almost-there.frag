#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(vec2 st) {
    return fract(sin(dot(st,vec2(12.3283,79.34821)))*48321.213091);
}

void main() {
	vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    st *= vec2(50.);
    float f = u_time*4.+random(vec2(floor(st.y))*400.);
    st.x -= f;
    
    vec2 ipos = floor(st);
    vec2 fpos = fract(st);
    
	float r = step(0.328,random(ipos));
    
    color = vec3(r);
    gl_FragColor = vec4(color,1.0);
}