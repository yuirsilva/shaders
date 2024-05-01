#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

float random(vec2 n) {
    return fract(sin(dot(n,vec2(12.3424,82.231)))*48320.944);
}
float circle(vec2 st, float r) {
    return smoothstep(0.,0.01,length(st)-r);
}
vec2 truchet(vec2 st, float index) {
    // st *= 2.;
    
    // float index = 0.;
    // index += step(1.,mod(st.x,2.));
    // index += step(1.,mod(st.y,2.))*2.;
    
    if (index > 0.75) {
        st = vec2(1.0) - st;
    } else if (index > 0.5) {
        st = vec2(1.0-st.x,st.y);
    } else if (index > 0.25) {
        st = 1.0-vec2(1.0-st.x,st.y);
    }

    
    return st/2.;
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    st*=10.;
    
    vec2 ipos = floor(st);
    vec2 fpos = fract(st);
    vec2 tile = truchet(fpos, random(ipos));
    
    float c = circle(tile-vec2(0.,0.5),0.5)*circle(tile-vec2(1.,0.5),0.5);
    
    color = vec3(c);
    gl_FragColor = vec4(color,1.0);
}