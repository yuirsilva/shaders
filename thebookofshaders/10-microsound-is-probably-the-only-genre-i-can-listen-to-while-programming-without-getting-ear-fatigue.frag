#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(float x) {
    return fract(sin(x)*100000.);
}
float random(vec2 st) {
    return fract(sin(dot(st,vec2(12.824,79.343442)))*48230.480932);
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 st_s = st*50.;
    float f = random(ceil(random(u_time))*tan(floor(u_time)*4.));
    
    st_s.x += u_time*24.*(2.*f-1.);
    
    
    vec2 ipos = floor(st_s);
    vec2 fpos = fract(st_s);
    
    float r = step(0.31,random(vec2(ipos.x)));
    
	color = vec3(r);
    gl_FragColor = vec4(color,1.0);
}