#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define TWO_PI 6.28318530718

float random(vec2 n) {
    return fract(sin(dot(n,vec2(12.48304,78.438024)))*48324.3289193);
}
float noise(float x) {
	float i = floor(x);
    float f = fract(x);
    vec2 ir = vec2(i);
    
    return mix(random(ir),random(ir+vec2(1.)),smoothstep(0.,1.,f));
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    float r = length(st-0.5);
    vec2 pos = (vec2(0.5)-st)*10.;
    float a = atan(pos.y,pos.x);
    float sa = sin(a);
    
    float x = noise(st.x-st.y-noise(pos.x+pos.y+u_time));

    color = vec3(x);
    color *= vec3(x*1.300,x,x);
    gl_FragColor = vec4(color,1.0);
}