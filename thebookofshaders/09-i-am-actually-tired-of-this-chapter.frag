#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265358979323846

vec2 tile(vec2 st, float f) {return fract(st*f);}
vec2 rotate2d(vec2 st, float a) {
    st -= 0.5;
    st = mat2(cos(a),-sin(a),sin(a),cos(a))*st;
    st += 0.5;
    return st;
}
vec2 truchet(vec2 st) {
    st*=2.;
    float index = 0.;
    index += step(1.,mod(st.x,2.));
    index += step(1.,mod(st.y,2.))*2.;
    
    st = fract(st);
    
    if (index == 0.) {
        st = rotate2d(st, PI*0.5+u_time+cos(st.x*5.)*0.2);
    } else if (index == 1.) {
        st = rotate2d(st, PI-u_time*0.5+sin(st.y*2.)*0.3);
    } else if (index == 2.) {
        st = rotate2d(st, PI*0.5-u_time);
    } else if (index == 3.) {
        st = rotate2d(st, PI+u_time);
    }
    
    return st;
}
float line(vec2 st) {
    vec2 s = vec2(0.,0.490);
    vec2 d = step(s,st);
    d*=step(s,1.-st);
    return d.x*d.y;
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    st = truchet(st);
    st = tile(st,18.);
    float a = atan(st.y,st.x);
    float r = length(st);

	color = vec3(line(st));
    // color *= vec3(a,r,r*a);
    gl_FragColor = vec4(color,1.0);
}