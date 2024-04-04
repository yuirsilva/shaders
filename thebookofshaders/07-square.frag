#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
	vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    vec2 size = vec2(0.460,0.460);
    
    vec2 bl_border = step(size, st);
    float pct = bl_border.x * bl_border.y;
    
    vec2 tr_border = step(size, 1.-st);
    pct *= tr_border.x * tr_border.y;
    
    color = vec3(pct);

    gl_FragColor = vec4(color,1.0);
}