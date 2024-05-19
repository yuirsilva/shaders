#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

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

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    vec2 pos = st*30.;
    float r = length(pos-15.);
    float n = length(noise(pos)+sin(st-r+u_time*3.));

  	st = st *2.-1.;
	float a = atan(st.x,st.y)+PI;
	r = TWO_PI/float(3);
    
  	float d = cos(floor(.5+a/r)*r-a)*length(st);
    d = 1.-smoothstep(.4,.41,d);
    d -= (n*4.);

    color = vec3(5.*acos(d)*n);
    color /= vec3(d);
    color *= vec3(n+n,r*n*1.3,n*4.);
    gl_FragColor = vec4(color,1.0);
}