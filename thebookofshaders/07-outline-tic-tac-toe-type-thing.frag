#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.);
    
    float size = 0.5;
    
    // vec2 bl = step(st,vec2(size));
    // vec2 tr = step(1.-st,vec2(size));
    
    // float test = step(0.3,st.x)-step(0.7,st.x);
    vec2 bl = step(vec2(0.2),st)-step(vec2(0.260,0.260),st);
    vec2 tr = step(vec2(0.3),1.-st)-step(vec2(0.360,0.360),1.-st);
    
    // we use Addition here because the step is inverted
    // the step is setting st.y to 0 if it's bigger than 0.1
    // so x*y will result in 0
	// the addition acts like the OR operator
    // the multiplication acts like the AND operator
    
    float pct = bl.x+bl.y+tr.x+tr.y;
    
    color = vec3(pct);

    gl_FragColor = vec4(color,1.0);
}