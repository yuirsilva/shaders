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
    return fract(sin(dot(st,vec2(12.4280,79.4380421)))*48328.4309823);
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
    
    // this would be the optimized version by Morgan McGuire @morgan3d
    // mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    
    // I did the unoptimized way cuz I'm too dumb to understand how
    // the f his implementation works
    
    float n = mix(b,t,u.y);
    
    return n;
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
	float d = length(noise(st*5.)+sin(u_time));
    
    color = vec3(d);
    gl_FragColor = vec4(color,1.0);
}