#ifdef GL_ES
precision mediump float;
#endif

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
    float r = length(pos)*2.;
    float a = atan(pos.y,pos.x);
    
    float pct = plot(vec2(r*abs(sin(st.y*4.+u_time))*4.),0.5);
    color = vec3(smoothstep(0.,0.+0.06,pct));
    
    gl_FragColor = vec4(color,1.0);
}