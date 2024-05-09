#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359
#define H_PI 1.57079632679
#define TWO_PI 6.28318530718

vec2 rotate2d(vec2 st, float a) {
    st -= 0.5;
    st = mat2(cos(a),-sin(a),sin(a),cos(a))*st;
    st += 0.5;
    return st;
}
float random (in float x) {
    return fract(sin(x)*1e4);
}
float random(vec2 n) {
    return fract(sin(dot(n,vec2(12.5932285,79.328041)))*48318.328094);
}
float easeInOutQuint(float x) {
	return x < 0.5 ? 16.*x*x*x*x*x : 1.-pow(-2.*x+2.,5.)/2.;
}
vec2 truchet(vec2 st, float i) {
    if (i > 0.75) {
        st = vec2(1.0) - st;
    } else if (i > 0.5) {
        st = vec2(1.0-st.x,st.y);
    } else if (i > 0.25) {
        st = 1.0-vec2(1.0-st.x,st.y);
    }
    return st;
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    float r = random(floor(u_time));
    float m = floor(4.*r)/2.+0.5;
    st = rotate2d(st,PI*m);
    
    
    vec2 ipos = floor(st*6.);
    vec2 fpos = fract(st*6.);
    
    vec2 tr = truchet(fpos, random(ipos));
    tr.x += sin((u_time+0.5)*PI);

	float s = smoothstep(tr.x,tr.x+0.006,tr.y);
    float t_2 = u_time*0.25;
    
    vec3 r_c = vec3(random(floor(t_2*random(ipos))),random(ceil(t_2)),random(floor(t_2)));
    
    color = mix(r_c*2.,r_c,s);
    // color = vec3(s);
    gl_FragColor = vec4(color,1.0);
}