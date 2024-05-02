#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(vec2 st) {
    return fract(sin(dot(st,vec2(12.832,80.432)))*48213.295013);
}

void main() {
	vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec2 uv = st*20.;
    
    vec2 ipos = floor(uv);
    vec2 fpos = fract(uv);
    
    float p = 0.;
    p = random(vec2(ipos.x));

    color = vec3(p);
    gl_FragColor = vec4(color,1.0);
}