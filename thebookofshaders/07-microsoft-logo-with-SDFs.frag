#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 squareSDF(vec2 st, float size, in vec2 pos, vec3 color) {
    float d = length(max(abs(st-pos)-size,0.));
    color = vec3(1.-smoothstep(0.,0.004,d))*color;
    
    return color;
}

vec3 RED = vec3(0.95, 0.32, 0.13);
vec3 GREEN = vec3(0.51, 0.74, 0.);
vec3 BLUE = vec3(0., 0.65, 0.94);
vec3 GOLD = vec3(1., 0.73, 0.01);

float SQUARE_SIZE = 0.25;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    st = st*2.-1.;

    vec3 color = vec3(0.);
    
    // squares
    vec3 tl = squareSDF(st,SQUARE_SIZE,vec2(-0.28,0.28),RED);
    vec3 tr = squareSDF(st,SQUARE_SIZE,vec2(0.28,0.28),GREEN);
    vec3 bl = squareSDF(st,SQUARE_SIZE,vec2(-0.28,-0.28),BLUE);
	vec3 br = squareSDF(st,SQUARE_SIZE,vec2(0.28,-0.28),GOLD);

    color = tl+tr+bl+br;
    gl_FragColor = vec4(color,1.0);
}