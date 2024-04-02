#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 DARK_BLUE = vec3(6, 123, 194)/255.;
vec3 BLUE = vec3(132, 188, 218)/255.;

float circle(in vec2 st){
    float c = distance(st, vec2(0.5));
    c = smoothstep(0.180, 0.175, c);
    
    return c;
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    color = mix(DARK_BLUE, BLUE, st.y);
    
    color = mix(color, vec3(1.), circle(st));

    gl_FragColor = vec4(color,1.0);
}