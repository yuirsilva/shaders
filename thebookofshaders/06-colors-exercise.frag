#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.x) -
          smoothstep( pct, pct+0.01, st.x);
}

vec3 blue = vec3(0.26, 0.36, 0.66);
vec3 yellow = vec3(0.97, 0.75, 0.3);

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.);
    
    vec3 pct = vec3(st.y);
    
    pct.r = smoothstep(0.592, 0.716, st.y);
    pct.g = 1.-smoothstep(0.238, 0.472, st.y)+smoothstep(0.544, 0.716, st.y);
    pct.b = smoothstep(0.480, 0.800, st.y);
    
    color = mix(yellow, blue, pct);
    
    // color = mix(color,vec3(0.365,1.000,0.018),plot(st,pct.r));
//     color = mix(color,vec3(0.204,0.484,1.000),plot(st,pct.g));
//     color = mix(color,vec3(1.000,0.019,0.010),plot(st,pct.b));

    
    gl_FragColor = vec4(color,1.0);
}