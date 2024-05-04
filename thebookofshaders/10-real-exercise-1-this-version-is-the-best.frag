#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

float random(float x) {
    return fract(sin(x)*48321.9293);
}
float random(vec2 st) {
    return fract(sin(dot(st,vec2(12.3823,79.32809)))*48321.9293);
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
	st *= 100.;
    
    float f = random(floor(u_time)*ceil(abs(tan(u_time*0.1))));
    st.x += floor(u_time*12.)*(2.*f-1.);
    if (st.y <= 50.) {
    	st.x -= -floor(u_time*12.)*(2.*f-1.);
    }
    
    vec2 ipos = floor(st);
    vec2 fpos = fract(st);
    
    float r = step(0.220,random(vec2(ipos.x)));
    float blue = step(0.94,abs(sin(u_time*PI*3.))*random(u_time));
    
    color = vec3(vec2(r),r+blue);
    gl_FragColor = vec4(color,1.0);
}