#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

// estonia flag
// wrong blue tho :D

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.x) -
          smoothstep( pct, pct+0.01, st.x);
}

vec3 black = vec3(0.);
vec3 white = vec3(1.);

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 pct = vec3(st.y);
    
    pct.b = 1.-sin(st.y*PI*3.);
    pct.r = 1.-max(0., sin(st.y*PI*3.)-step(0.5, st.y));
    pct.g = 1.-max(0., sin(st.y*PI*3.)-step(0.5, st.y));
    
	color = mix(white, black, step(1.,pct));
    gl_FragColor = vec4(color,1.);
}