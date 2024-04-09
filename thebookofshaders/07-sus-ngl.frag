#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    float d = 0.;
    vec2 st = gl_FragCoord.xy/u_resolution;
	st = st*2.-1.;
    
    d = length(abs(st)-0.5);
    d = length(min(abs(st)-0.5,0.));
    // d = length(max(abs(st)-0.5,0.));
    
    vec3 color = vec3(fract(d*10.));
    color = vec3(step(0.236,d+st.y*-0.404*st.y*-0.728+st.x*0.104*st.x*1.288)*step(d+st.y*-0.66*st.y*-0.4,0.398+st.x*-0.144*st.x*0.856));
    gl_FragColor = vec4(color,1.0);
}