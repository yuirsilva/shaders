#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
	vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    // Each result will return 1.0 (white) or 0.0 (black).

    
    // float bottom = step(0.1, st.x); // Similar to ( X greater than 0.1 )
    // float left = step(0.1, st.y); // Similar to ( Y greater than 0.1 )
    
    // The multiplication of left*bottom will be similar to the logical AND.
    // both left and bottom must be 1 to return 1, because 1*1 = 1
    // if any of them is 0 the result will be 0
    
    // float right = step(0.1, 1.-st.x);
    // float top = step(0.1, 1.-st.y);
    
//     vec2 bottom_left = step(vec2(0.1), st);
//     float bl_border = bottom_left.x * bottom_left.y;
    
//     vec2 top_right = step(vec2(0.1), 1.-st);
//     float tr_border = top_right.x * top_right.y;
    
    st.y += sin(u_time+st.x)*0.3;
    
    vec2 size = vec2(0.13,0.49);
    
    vec2 bottom_left = step(size, st);
    float pct = bottom_left.x * bottom_left.y;
    
    vec2 top_right = step(size, 1.-st);
    pct *= top_right.x * top_right.y;
    
    color = vec3(pct);

    gl_FragColor = vec4(color,1.0);
}