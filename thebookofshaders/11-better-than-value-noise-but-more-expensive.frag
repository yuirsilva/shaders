#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(vec2 st) {
    return fract(sin(dot(st,vec2(12.482418,79.4281390878)))*48314.832);
}
vec2 random2(vec2 st) {
    st = vec2(dot(st,vec2(132.58321,179.328491)),dot(st,vec2(423.4324021,312.421280)));

    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}
// value noise
float noise(vec2 st) {
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
// gradient noise
float gnoise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    vec2 u = smoothstep(0.,1.,f);
    
    float dbl = dot(random2(i + vec2(0.)),f - vec2(0.));
    float dbr = dot(random2(i + vec2(1.,0.)),f - vec2(1.,0.));
    float db = mix(dbl,dbr,u.x);
    
    float dtl = dot(random2(i + vec2(0.,1.)),f-vec2(0.,1.));
    float dtr = dot(random2(i + vec2(1.)),f-vec2(1.));
    float dt = mix(dtl,dtr,u.x);
    
    return mix(db,dt,u.y);
}

void main() {
    vec3 color;
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    float n = gnoise(st*32.)*0.5+0.5;
    
    color = vec3(n);
    gl_FragColor = vec4(color,1.0);
}