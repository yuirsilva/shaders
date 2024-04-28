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
// vec2 truchet(vec2 st) {
//     st*=2.;
//     float index = 0.;
//     index += step(1.,mod(st.x,2.));
//     index += step(1.,mod(st.y,2.))*2.;
    
//     st = fract(st);
//     return st;
// }
vec3 truchet(vec2 st) {
    st*=2.;
    float index = 0.;
    index += step(1.,mod(st.x,2.));
    index += step(1.,mod(st.y,2.))*2.;
    
    st = fract(st);
    return vec3(st,index);
}
float circle(vec2 st) {
    return 1.-smoothstep(0.,0.112,length(st-0.5)-0.2);
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    vec3 res = truchet(st);
    float index = res.z;
    st = res.xy;
    st = tile(st,4.);

    
    float a = atan(st.x,st.y);

	color = vec3(circle(st));
    if (index == 0.) {
        color *= vec3(0.811,0.000,0.975)*pow(a,2.);
    } else if (index == 1.) {
        color *= vec3(0.990,0.068,0.049)*pow(a,10.);
    } else if (index == 2.) {
        color *= vec3(0.990,0.693,0.098)*pow(a,5.);
    } else if (index == 3.) {
        color *= vec3(0.070,0.990,0.132)*pow(a,18.);
    }
    gl_FragColor = vec4(color,1.0);
}