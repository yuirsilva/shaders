#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

vec3 BLUE = vec3(0., 0., 1.);
vec3 YELLOW = vec3(1., 1., 0.);
float DELAY = 0.2;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    st.x = abs(sin(u_time+(st.x*st.y)));
    
    vec3 color = vec3(0.);
    vec3 pct = vec3(st.x);
    
    pct.r = pow(st.x, 1.4);
    pct.g = 1.-sin(st.x*PI);
    
    color = mix(YELLOW, BLUE, pct);
    
    gl_FragColor = vec4(color,1.0);
}