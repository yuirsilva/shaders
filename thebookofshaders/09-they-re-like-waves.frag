#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float easeInOutQuint(float x) {
	return x<0.5?16.*x*x*x*x*x:1.-pow(-2.*x+2.,5.)/2.;
}

vec2 tile(vec2 st, float f) {
    st = st*f;
    return fract(st);
}
float box(vec2 st,float i) {
    st=st*2.-1.;
    float d = length(max(abs(st)-i,0.));
    return 1.-smoothstep(0.3,0.3+0.006,d);
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    st.y += easeInOutQuint(abs(sin(st.x+u_time)*.5));
    st = tile(st,3.);
    float a = atan(st.x,st.y);
    float r = length(st);

    color = vec3(box(st,0.25*sin(a*(sin(st.y+u_time)*3.)*13.+u_time*2.)*0.05));
    color *= vec3(r*a*1.3,a,r*2.);
    gl_FragColor = vec4(color,1.0);
}