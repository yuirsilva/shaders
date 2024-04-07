#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 circle1(in float size, in vec2 pos, in vec3 color, in vec2 st) {
    float pct = distance(st, pos);
    pct*=2.;
	pct = max(distance(st,vec2(0.4)),distance(vec2(st.x*st.y,st.y/st.x),vec2(sin(u_time)*0.5,cos(u_time)*0.5)));
    
    return vec3(pct+color);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.);
    
    vec3 red = circle1(1.410,vec2(0.970,0.790),vec3(sin(u_time*0.1)*0.5,sin(u_time*0.2)*0.5+0.5,cos(u_time)*0.5+0.5),st);
    vec3 blu = circle1(1.,vec2(0.5),vec3(0.),vec2(st.x,st.y));
    
    color = red*blu;
    gl_FragColor = vec4(color,1.0);
}