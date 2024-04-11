#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.);
    
    vec2 pos = vec2(0.5)-st;
    
    float radius = length(pos)*3.;
    float angle = atan(pos.y,pos.x);
    
    float shape = smoothstep(-.5,1.,cos(angle*10.+u_time))*0.2+0.5;
    float circle = 1.-smoothstep(0.124,0.492,radius+-0.288);
    float final = shape - circle;

    color = vec3(1.-smoothstep(final,final+0.02,radius));
    color = mix(color,vec3(0.,1.,0.),plot(vec2(final),-0.180));
    
    gl_FragColor = vec4(color,1.0);
}