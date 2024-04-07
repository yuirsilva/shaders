#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float cheap_circle(in float radius, in vec2 st) {
    vec2 dist = st-vec2(0.5);
    return 1.-smoothstep(radius-(radius*0.01), radius+(radius*0.01),dot(dist, dist)*4.); 
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    vec3 color = vec3(cheap_circle(0.5,st));
    gl_FragColor = vec4(color,1.0);
}