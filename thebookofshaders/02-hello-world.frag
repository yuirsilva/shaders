// Macros start with a hashtag (pre-compilation step)
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec4 red() {
    // return vec4(1.,0.,0.,1.);
    // return vec4(vec3(1., 0., 0.), 1.);
    // return vec4(vec2(0.5, 0.5),vec2(1., 1.));
    return vec4(vec2(1., 0.),0.,1.);
}

// shader language has a single main function that
// returns a color at the end
void main() {
	// gl_FragColor = reserved final pixel variable
    // vec4(builtin function, four dimensional vector
    // with floating point precision)
    // don't forget the point in floats
    
    gl_FragColor = vec4(red());
}