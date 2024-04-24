#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

vec2 tile(vec2 st, float f) {
    st=st*f;
    return fract(st);
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
	st = tile(st,1.);
    st = st*2.-1.;
    
    float a = atan(st.x,st.y);
    float r = length(st);
    st = tan(st*st*r+r+a+u_time);
    
    vec2 p = step(vec2(5.),st);
    float s = p.x-p.y;

    color = vec3(s*s*vec3(0.4,0.5*pow(r,a*a),0.9));
    gl_FragColor = vec4(color,1.0);
}