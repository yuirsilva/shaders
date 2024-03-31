#ifdef GL_ES
precision mediump float;
#endif

// a uniform is something send from the CPU to the GPU
// we send the same data to all threads (uniform data)
// uniforms are read-only (you can't change the input)
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    // gl_FragColor = vec4(abs(sin(u_time*0.000001)),0,0.,1.0);
    // gl_FragColor = vec4(abs(sin(u_time*10000000.)), 0., 0., 1.);
    // gl_FragColor = vec4(abs(sin(u_time)), abs(sqrt(tan(u_time))),floor(acos(u_time)),1.);
    
	// gl_FragCoord is the default input
    // variable that gives the position of each pixel in the final image
    vec2 st = gl_FragCoord.xy/u_resolution;
    gl_FragColor = vec4(st.x+(u_mouse.x/u_resolution.x*2.-1.), st.y+(u_mouse.y/u_resolution.y*2.-1.), abs(sin(u_time)), 1.);
}