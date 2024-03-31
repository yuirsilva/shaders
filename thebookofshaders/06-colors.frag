#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

vec3 blue = vec3(0., 0., 1.);
// vec3 yellow = vec3(1., 1., 0.);
vec3 red = vec3(1., 0., 0.);

void main() {
	// vec4 vector;
	// vector[0] = vector.r = vector.x = vector.s;
	// vector[1] = vector.g = vector.y = vector.t;
	// vector[2] = vector.b = vector.z = vector.p;
	// vector[3] = vector.a = vector.w = vector.q;
    
    // swizzle = combine channels in any order
    // eg: vector.rgb = another_vector.bgb;
    
    // mix() function mix two values between a defined range
    // mix(start, end, value), start = range's start
    // end = range's end
    // value = value to interpolate
    // mix(0., 1., 0.5) = 0.5 between the range

    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 pct = vec3(st.x);
    
    // pct.b = sqrt(st.x);
    pct.b = pow(st.x,0.5);
    
    vec3 color = mix(blue, red, pct);
    
    color = mix(color,vec3(1.,1.,0.),plot(st,pct.x));
    color = mix(color,vec3(1.,1.,0.),plot(st,pct.y));
    color = mix(color,vec3(0.,1.,0.),plot(st,pct.z));

    gl_FragColor = vec4(color,1.);
}