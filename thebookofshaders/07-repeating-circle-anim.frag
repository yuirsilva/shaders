#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 circle(in float size, in vec2 pos, in vec3 color, in vec2 st) {
    float pct = distance(st*fract(st.y*st.x+u_time), pos);
    pct*=2.;
    pct = smoothstep(size-0.06,size,pct);
    
    return vec3(pct+color);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.);
    
    color = circle(0.4,vec2(0.090,0.170),vec3(0.124,0.156,0.185),st);
    gl_FragColor = vec4(color,1.0);
}