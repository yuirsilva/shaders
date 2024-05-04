#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(vec2 st) {
    return fract(sin(dot(st,vec2(12.3823,79.32809)))*48321.9293);
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
	st *= 10.;
    
    st.x += random(floor(vec2(u_time*4.))-ceil(st));
    
    vec2 ipos = floor(st*20.);
    vec2 fpos = fract(st);
    
    float r = step(0.26,random(vec2(ipos.x)));
    
    color = vec3(r);
    gl_FragColor = vec4(color,1.0);
}