#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.);
    

    // we can now see the four quadrants in the billboard
    // st * 2. = to get a range from 0 to 2
    // -1. to shift the range from -1 to 1
    st = st * 2. - 1.;
    
    float d = length(abs(st)-0.5);
    d = length(max(abs(st)-0.95*st.y*st.x*tan(u_time),0.));
    
    color = vec3(fract(d*15.));

    gl_FragColor = vec4(color,1.0);
}