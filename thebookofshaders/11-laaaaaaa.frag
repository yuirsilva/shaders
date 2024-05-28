#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

vec2 rotate2d(vec2 st, float a) {
    st -= 0.5;
    st = mat2(cos(a),-sin(a),sin(a),cos(a))*st;
    st += 0.5;
    return st;
}
float noise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f*f*f*(f*(f*6.-15.)+10.);
    
	return mix( mix( dot( random2( i + vec2(0.)), f - vec2(0.)),
                     dot( random2( i + vec2(1.,0.)), f - vec2(1.,0.)), u.x),
                mix( dot( random2( i + vec2(0.,1.)), f - vec2(0.,1.)),
                     dot( random2( i + vec2(1.)), f - vec2(1.)),u.x), u.y);
}

void main() {
	vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    st*=10.;
    float n = smoothstep(0.04,0.28,
                         length(
                             noise(st+u_time)+
                             noise(st*0.4)));
    
    color = vec3(n);
    color *= vec3(n,n*1.2,n);
    gl_FragColor = vec4(color,1.0);
}