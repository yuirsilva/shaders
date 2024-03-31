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

vec3 BLUE = vec3(0., 0.4, 0.7);
vec3 WHITE = vec3(1.);

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution;
    
    st.x += sin(u_time+(st.y*sqrt(st.x))*3.)*0.3;
    
    vec3 pct = vec3(st.x);
    
	color = mix(BLUE, WHITE, step(0.5, pct));
    gl_FragColor = vec4(color,1.0);
}