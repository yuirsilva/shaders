#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define TWO_PI 6.28318530718

float random(in vec2 st) {
    return fract(sin(dot(st,vec2(12.45381,79.32891376)))*48324.615);
}
float noise(in float x) {
	vec2 i = vec2(floor(x));
    return mix(random(i),random(i+1.),smoothstep(0.,1.,fract(x)));
}
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
    float a = atan(st.x-0.5,st.y-0.5);
    float s = 1.-smoothstep(0.2,0.2+0.008,r);
    
    st *= 10.;
    float n = length(noise(st+u_time)-st*sin(a-r)*r);
    
    color = vec3(n);
    gl_FragColor = vec4(color,1.0);
}