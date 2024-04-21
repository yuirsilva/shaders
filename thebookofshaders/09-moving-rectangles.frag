#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    st *= 3.;
    st = fract(st+u_time+sin(st*8.)*0.1);

    vec3 color = vec3(0.);
    vec2 bl = step(vec2(0.1),st);
    vec2 tr = step(vec2(0.1),1.-st);
    float pct = bl.x*bl.y*tr.x*tr.y;

    color = vec3(pct);
    
    gl_FragColor = vec4(color,1.0);
}