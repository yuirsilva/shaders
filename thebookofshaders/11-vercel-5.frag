#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}
float noise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    vec2 u = smoothstep(0.,1.,f);
    
    return mix(
        mix(
            dot(random2(i+vec2(0.)),f-vec2(0.)),
            dot(random2(i+vec2(1.,0.)),f-vec2(1.,0.)),
            u.x
        ),
        mix(
            dot(random2(i+vec2(0.,1.)),f-vec2(0.,1.)),
            dot(random2(i+vec2(1.)),f-vec2(1.)),
            u.x
        ), u.y
    );
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
  	st = st *2.-1.;
    
  	float a = atan(st.x,st.y)+PI;
	float r = TWO_PI/float(3);
    
    float n = noise(st*100.+sin(u_time+st*500.));
    
  	float d = cos(floor(.5+a/r)*r-a)*length(st/n);
    d = 1.0-smoothstep(0.336,0.7,d);
    
    color = vec3(d);
    gl_FragColor = vec4(color,1.0);
}