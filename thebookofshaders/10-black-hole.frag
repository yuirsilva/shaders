#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rand(float x) {
    return fract(sin(x)*100000.);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(0.);
    color = vec3(rand(st.x*st.y*1000.));
    color /= vec3(length(st-0.5)-0.2);

    gl_FragColor = vec4(color,1.0);
}