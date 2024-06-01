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

float noise(in vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    // quintic
	vec2 u = f*f*f*(f*(f*6.-15.)+10.);
    
    return mix( mix(
            		dot(random2(i+vec2(0.,0.)),f-vec2(0.,0.)),
            		dot(random2(i+vec2(1.,0.)),f-vec2(1.,0.)), u.x),
        		mix(
            		dot(random2(i+vec2(0.,1.)),f-vec2(0.,1.)),
            		dot(random2(i+vec2(1.,1.)),f-vec2(1.)), u.x), u.y);
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    float n = noise(st*10.+u_time)*0.5+0.5;
    float s = smoothstep(0.25,n*n,length(st-0.5));
    // s -= 1.-smoothstep(0.15,0.152+0.008,n*length(st-0.5));

    color = vec3(s);
    color *= vec3(s,s*1.3,s*4.);
    gl_FragColor = vec4(color,1.0);
}