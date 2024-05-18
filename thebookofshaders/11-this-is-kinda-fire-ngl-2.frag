#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 rotate2d(vec2 st, float a) {
    st -= 0.5;
    st = mat2(cos(a),-sin(a),sin(a),cos(a))*st;
    st += 0.5;
    return st;
}
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

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    float r = length(st-0.5);
    vec2 pos = (vec2(0.5)-st)*10.;
    float a = atan(pos.x,pos.y);
    
    st = st*2.-1.;
	float x = noise(st.x+st.y*3.*noise(pos.y+pos.x*r+r+u_time));
    
	float d = length(noise(st*100.)-noise(u_time+sin(pos*0.1)*10.));
    
    color = vec3(d);
    color = vec3(d*sqrt(x*2.));
	color *= vec3(x,x*1.3,x);
    color += vec3(0.007,0.140,0.121);
    gl_FragColor = vec4(color,1.0);
}