#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 tile(vec2 st, float f) {return fract(st*f);}
float circle(vec2 st, float r) {
    return 1.-smoothstep(0.,0.008,length(st-0.5)-r);
}
vec2 shifted(vec2 st, float f) {
    st*=f;
    st.x += step(1.,mod(st.y,2.))*0.5;
    return fract(st);
}

vec3 RED = vec3(0.76, 0.25, 0.1);
vec3 LIGHT_YELLOW = vec3(0.97, 0.84, 0.67);
vec3 DARK_BLUE = vec3(0.07, 0.11, 0.33);

void main() {
	vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    vec2 r = shifted(st+vec2(cos(u_time),sin(u_time))*0.03,3.5);
    vec3 red_dots = vec3((circle(r,0.3)+circle(r,0.15)));
    
    st = shifted(st+vec2(cos(u_time),sin(u_time))*0.01,8.);
    vec3 yellow_dots = vec3((circle(st,0.25)-circle(st,0.08)));
    yellow_dots = mix(DARK_BLUE,LIGHT_YELLOW,yellow_dots);
    color = yellow_dots;
    
    color = mix(color,RED,red_dots);
    
    gl_FragColor = vec4(color,1.0);
}