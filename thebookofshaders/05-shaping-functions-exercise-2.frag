#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float fifteenth(float x) {
    return 1.-pow(max(0., abs(x) * 2. - 1.), 0.5);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    float x = smoothstep(st.x-0.02,st.x+1.,fifteenth(st.x*2.*abs(sin(u_time))*-abs(sin(st.y*-2.))));
    vec3 color = vec3(x*vec3(0.5,0.5,0.8));
    
    gl_FragColor = vec4(color, 1.);
}