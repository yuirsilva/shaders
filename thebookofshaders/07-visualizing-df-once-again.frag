#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    // st = st*2.-1.;

    float r = 0.5;
    vec3 color = vec3(0.);
    
    // sdf of a point
    // float sdf = length(st);
    
    // rounded sdf of a point
    float sdf = length(st-0.5)*2.*7.;
    
    color = vec3(sdf);

    // it can be visualized with a fract
    color = vec3(fract(sdf));
    
    gl_FragColor = vec4(color,1.);
}