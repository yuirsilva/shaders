#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 circle(in float size, in vec2 pos, in vec3 color, in vec2 st) {
    float pct = distance(st, pos);
    pct*=2.;
    pct = smoothstep(size-0.006,size,pct);
    
    return vec3(pct+color);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.);
    
    vec3 red = circle(0.5,vec2(sin(u_time)*0.5+0.5,cos(u_time)*0.5+0.5),vec3(1.,0.,0.),st);
    vec3 blue = circle(0.25,vec2(0.5),vec3(0.,0.,1.),st);
    vec3 green = circle(0.1,vec2(0.240,0.180),vec3(0.,1.,0.),st);
    
    color = red*blue*green;
    gl_FragColor = vec4(color,1.0);
}