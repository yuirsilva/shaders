#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 circle(in float size, in vec2 pos, in vec3 color, in vec2 st) {
    float pct = distance(st, pos);
    pct*=2.;
    pct = min(distance(st,vec2(0.5,sin(u_time)*0.5+0.5)),distance(vec2(st.y),vec2(0.5)));
    return vec3(pct+color);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.);
    
    color = circle(0.4,vec2(0.5),vec3(0.365,0.390,0.555),st);
    gl_FragColor = vec4(color,1.0);
}