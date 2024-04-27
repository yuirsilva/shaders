#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circle(vec2 st) {
    return smoothstep(0.,0.016,length(st-0.5)+sin(u_time)*0.1-0.2);
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    float a = atan(st.x,st.y);
    float r = length(st-0.5);

    float s = 1.-circle(st-0.5*sin(st.x*30.+u_time*12.)*0.05*cos(st.y*20.+u_time*2.));
    float b = smoothstep(0.812,0.736,s)-smoothstep(0.296,0.,s);
    vec3 res = vec3(b);
    
    color = res*vec3(length(b/s),1.,1.);
    gl_FragColor = vec4(color,1.0);
}