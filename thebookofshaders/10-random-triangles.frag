#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(vec2 st) {
    return fract(sin(dot(st,vec2(12.32,80.23242)))*48204.83443228);

}
vec2 truchet(in vec2 st, in float i) {
    if (i > 0.75) {
        st = vec2(1.0) - st;
    } else if (i > 0.5) {
        st = vec2(1.0-st.x,st.y);
    } else if (i > 0.25) {
        st = 1.0-vec2(1.0-st.x,st.y);
    }
    
    return st;
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec2 uv = st*10.;
    uv += vec2(u_time,-u_time);
    
    vec2 ipos = floor(uv);
    vec2 fpos = fract(uv);
    
    vec2 tile = truchet(fpos,random(ipos));
    
    float t = step(tile.x,tile.y);
	color = vec3(t);
    gl_FragColor = vec4(color,1.0);
}