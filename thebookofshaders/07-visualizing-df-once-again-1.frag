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
    float sdf = length(st-0.5)*2.;
    
    color = vec3(sdf);

    // it can be visualized with a fract
    // we get a lot of "waves" of a point
    // because we multiplied the length result by 5
    // which used to go from the origin (0) to 1 (because we multiplied by 2 on 21)
    // multiplying by 5 now go from 0 to 5, which helps fract when creating
    // these "waves"
    // just remember that fract = x - floor(x)
    color = vec3(fract(sdf*5.));
    
    gl_FragColor = vec4(color,1.);
}