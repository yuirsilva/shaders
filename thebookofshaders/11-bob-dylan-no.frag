#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(vec2 n) {
    return fract(sin(dot(n,vec2(12.32804,78.32803)))*48317.328024);
}
float random(float n) {
    return fract(sin(n)*1e4);
}

void main() {
	vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
	st *= 10.;
    
    vec2 ipos = floor(st);
    vec2 fpos = fract(st);
    
    color = vec3(mix(random(ipos),random(ipos+1.),fpos.x));
    
    gl_FragColor = vec4(color,1.0);
}