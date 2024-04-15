#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float polygon(in vec2 pos, in int n) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
	st = st*2.-1.-(pos*2.-1.);
    
    // find the angle of each point
    // "+PI" in the end is for 360 degrees
    // as "atan()" returns from -PI to +PI
    // so we can turn this to "0-2PI" or 0-360degrees
    float a = atan(st.x,st.y)+PI;
    float r = TWO_PI/float(n);
    
    float s = cos(floor(0.5+a/r)*r-a)*length(st);
    
    return s;
}

void main() {
    vec3 color = vec3(0.);
    float s = polygon(vec2(0.5),3);
    
    color = vec3(1.-smoothstep(0.200,0.204,s));
    
    gl_FragColor = vec4(color,1.0);
}