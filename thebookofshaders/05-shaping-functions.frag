#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st) {
    return smoothstep(st.x-0.02,st.x,st.y) - smoothstep(st.x, st.x+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    
	// you can use the pow() function to shape the gradient,
    // using values above 1, you can squash the values
    // using values below 1, you can bump the values
    // pow(0.5, 0.5) = 0.7071067812
    float y = st.x;
    y = smoothstep(0.2,0.5,st.x)-smoothstep(0.5, 0.8, st.x);
    // y = sin((st.x)+u_time*acos(st.x)*cos(PI));
    // y = step(0.5, distance(st, vec2(0.5, 0.5))*10.*st.y+cos(u_time));
    // y = smoothstep(0.3,1., abs(sin(st.y*40.*atan(st.x*st.y*PI+u_mouse.y/u_resolution.y)+tan(u_time))));
    // y = smoothstep(st.x-0.02, st.x, st.y)-smoothstep(st.x, st.x+0.02, st.y);
    vec3 color = vec3(y);
    float pct = plot(st);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);
    
    gl_FragColor = vec4(color, 1.);
}