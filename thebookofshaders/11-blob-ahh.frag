#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(in vec2 st) {
    return fract(sin(dot(st,vec2(12.48304,78.438024)))*48324.3289193);
}
// 1d noise
float noise(float x) {
	float i = floor(x);
    float f = fract(x);
    vec2 ir = vec2(i);
    
    return mix(random(ir),random(ir+vec2(1.)),smoothstep(0.,1.,f));
}
// value noise
float noise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    vec2 u = smoothstep(0.,1.,f);
    
    float bl = random(i);
    float br = random(i + vec2(1.,0.));
    float b = mix(bl,br,u.x);
    
    float tl = random(i + vec2(0.,1.));
    float tr = random(i + vec2(1.));
    float t = mix(tl,tr,u.x);
    
    return mix(b,t,u.y);
}

vec3 YELLOW = vec3(0.976,0.784,0.055);
vec3 ORANGE = vec3(0.973,0.4,0.141);

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    st = 2.*st-1.;
    float s = 1.-smoothstep(0.2,0.2+0.008,length(max(abs(st)-0.5,0.)));
    float n = 1.-smoothstep(0.2,0.2+0.008,length((abs(noise(st*8.))-sin(u_time)*0.5-0.5)));
    vec3 m = mix(YELLOW,ORANGE,n);
    
	color = vec3(m);
    gl_FragColor = vec4(color,1.0);
}