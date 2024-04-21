#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

mat2 rotate2d(float a) {
    return mat2(cos(a),-sin(a),
               sin(a),cos(a));
}
mat2 scale2d(vec2 s) {
    return mat2(s.x,0.,
               0.,s.y);
}

float circle(in vec2 _st, in float _radius){
    vec2 dist = _st-vec2(0.5);
	return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(dist,dist)*4.0);
}
float x(in vec2 st, in vec2 size) {
    vec2 uv = st;
    uv -=0.5;
    uv = rotate2d(PI*0.25)*uv;
    uv +=0.5;
    
    vec2 s = vec2(0.5)-size*0.5;
    vec2 d = step(size,uv);
    d*= step(size,1.-uv);
    
    return d.x*d.y;
}
float cross(in vec2 _st, float _size){
    return  x(_st, vec2(_size,_size/4.)) +
            x(_st, vec2(_size/4.,_size));
}
vec3 shape(in vec2 st, in vec2 pos, in int t) {
    vec3 d = vec3(0.);
    if (t == 0) {
        if (ceil(st) == pos) {
        	st -= pos-1.;
        	d = vec3(circle(st,0.5));
        }
    } else if (t == 1) {
        if (ceil(st) == pos) {
            st -= pos-1.;
            d = vec3(cross(st,0.48));
        }
    }
    return d;
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    st *= 3.;
    color = shape(st,vec2(1.),1);
    color += shape(st,vec2(2.,1.),0);
    color += shape(st,vec2(3.,1.),0);
    color += shape(st,vec2(1.,2.),1);
    color += shape(st,vec2(2.),0);
    color += shape(st,vec2(3.,2.),0);
    color += shape(st,vec2(1.,3.),0);
    color += shape(st,vec2(2.,3.),1);
    color += shape(st,vec2(3.,3.),1);
    st = fract(st);
    
    gl_FragColor = vec4(color,1.0);
}