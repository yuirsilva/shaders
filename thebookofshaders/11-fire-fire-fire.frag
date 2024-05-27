#ifdef GL_ES
precision mediump float;
#endif

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
    
	return mix( mix( dot( random2( i + vec2(0.)), f - vec2(0.)),
                     dot( random2( i + vec2(1.,0.)), f - vec2(1.,0.)), u.x),
                mix( dot( random2( i + vec2(0.,1.)), f - vec2(0.,1.)),
                     dot( random2( i + vec2(1.)), f - vec2(1.)),u.x), u.y);
}

void main() {
	vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    float n = noise(st*8.+u_time)*0.5+0.5;
    n *= noise(st*4.-u_time);
    
    float s = noise(length(n-0.5-st)*length(st-0.5)-st);

	color = vec3(s*4.,s*1.5,s);
    gl_FragColor = vec4(color,1.0);
}