#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 RED = vec3(0.74, 0., 0.18);

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.);
    
    float form = sqrt(pow(0.5-st.x,2.)+pow(0.5-st.y*abs(sin(u_time)),2.));
    color = vec3(step(0.24,form*abs(sin(u_time)*cos(u_time)-1.)));
    
    gl_FragColor = vec4(color+RED,1.0);
}