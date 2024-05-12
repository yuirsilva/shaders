#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define TWO_PI 6.28318530718

float random(vec2 n) {
    return fract(sin(dot(n,vec2(12.32804,78.32803)))*48317.328024);
}
float random(float n) {
    return fract(sin(n)*1e4);
}
float noise(float x) {
    float i = floor(x);
    float f = fract(x);
    return mix(random(i),random(i+1.),smoothstep(0.,1.,f));
}

void main() {
	vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec2 pos = st-vec2(0.5);
    // float a = atan(pos.x,pos.y)/TWO_PI-0.5;
    float a = atan(pos.x,pos.y);
    
    float r = length(pos*noise(st.y+sin(a*10.)+u_time));
    
    
    color = vec3(1.-smoothstep(0.192,0.196,r));
    gl_FragColor = vec4(color,1.0);
}