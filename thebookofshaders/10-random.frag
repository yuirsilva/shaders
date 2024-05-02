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
    vec2 uv = st*10.;
    
    vec2 ipos = floor(uv);
    vec2 fpos = fract(uv);
    
    float p = 0.;
    if (random(vec2(ipos.x*u_time*0.5)) == 0.) {
        p = random(vec2(ipos.x*u_time*0.00000005));
    }

    color = vec3(p);
    gl_FragColor = vec4(color,1.0);
}