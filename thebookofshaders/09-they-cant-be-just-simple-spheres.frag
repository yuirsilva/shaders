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

vec3 truchet(vec2 st) {
    st*=2.;
    float index = 0.;
    index += step(1.,mod(st.x,2.));
    index += step(1.,mod(st.y,2.))*2.;
    
    st = fract(st);
    return vec3(st,index);
}
float circle(vec2 st) {
    return 1.-smoothstep(0.,0.056,length(st-0.5)-0.2);
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    // st = tile(st,4.);
    
    vec3 res = truchet(st);
    float index = res.z;
    st = res.xy;
    // st = tile(st,4.);
    st = rotate2d(st, PI*u_time);

    
    float a = atan(st.x,st.y);
    float r = length(st-0.5);

	color = vec3(circle(st));
    if (index == 0.) {
        color *= vec3(a+r,a-r,a/r);
    } else if (index == 1.) {
        color *= vec3(sin(a)/cos(a),1.,1.);
    } else if (index == 2.) {
        color *= vec3(sin(a)*cos(a+u_time),a,r+0.5+sin(r)*.2);
    } else if (index == 3.) {
        color *= vec3(smoothstep(0.192,0.216,r));
        color *= vec3(r*a,a+a,a/sin(r));
    }
    gl_FragColor = vec4(color,1.0);
}