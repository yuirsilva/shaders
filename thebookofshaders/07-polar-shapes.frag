#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.);
    
	vec2 pos = vec2(0.5)-st;
    float radius = length(pos)*2.;
    float angle = atan(pos.y,pos.x);
    
    float shape = cos(angle*3.+u_time+sin(st.y*+u_time*0.04));
    
    color = vec3( 1.-smoothstep(shape,shape+0.348,radius+0.1) );

    gl_FragColor = vec4(color,1.0);
}