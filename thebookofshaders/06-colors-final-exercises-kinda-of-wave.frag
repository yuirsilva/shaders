// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 BLUSH = vec3(204., 90., 113.)/255.;
vec3 SPACE = vec3(52., 52., 74.)/255.;

float square(in vec2 st) {
    // i actually don't know what i'm doing
    // vec2 c = step(0.2, st*distance(st*st, vec2(sin(u_time),cos(u_time))));
    vec2 c = step(0.240, st*distance(st*st, vec2(sin(u_time),sin(u_time))));
    return c.y;
}

void main() {
	vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    color = mix(BLUSH, SPACE, step(0.5, st.y));
    color = mix(color, vec3(1.), square(st));

    gl_FragColor = vec4(color,1.0);
}