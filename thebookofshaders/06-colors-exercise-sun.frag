#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 yellow = vec3(0.75, 0.51, 0.29);
vec3 red = vec3(1., 0.31, 0.2);

vec3 blue = vec3(0.220,0.354,0.85);

void main() {
    vec3 color = vec3(0.);
    
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 pct = vec3(st.y);
    
    float blah = smoothstep(0.1, 0.11, distance(st, vec2(0.5,sin(u_time*0.5)*0.4+0.4)));
    vec3 sun = vec3(blah);
    
    color = mix(red, yellow, pct);
    color = mix(color, blue, abs(sin(u_time*0.5)*0.4+0.4))/(sun*vec3(1.));
    
    gl_FragColor = vec4(color,1.0);
}