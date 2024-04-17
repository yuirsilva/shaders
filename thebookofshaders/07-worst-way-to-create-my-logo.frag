#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float squareSDF(in vec2 st, in vec2 pos, in float r, float side) {
    return length(max(abs(vec2(st.x*side,st.y)-pos)-r,0.));
}
float pointSDF(in vec2 st, in vec2 pos, in float r){
    return length(st-pos)-r;
}

vec3 BLUE = vec3(0.84, 0.9, 1.);

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
	st = st*2.-1.;
    vec3 col = vec3(0.);
    
    float a = atan(st.x,st.y);
    float r = length(abs(st));
    
    st.x+=0.475;
    st.y-=0.2;

    float s = 1.-smoothstep(0.0,0.004,squareSDF(st,vec2(0.1+0.2,-0.1),0.1,1.));
    float c = 1.-smoothstep(0.2,0.205,pointSDF(st,vec2(0.+0.2,0.),0.));
    float fs = max(c,s);
    
    float c1 = 1.-smoothstep(0.2,0.205,pointSDF(st,vec2(0.,-0.460),0.));
    float c2 = 1.-smoothstep(0.2,0.205,pointSDF(st,vec2(0.2,-0.460),0.));
    float s1 = 1.-smoothstep(0.0,0.005,squareSDF(st,vec2(0.170,-0.460),0.2,1.8));
    float s2 = 1.-smoothstep(0.040,0.045,squareSDF(st,vec2(0.280,-0.380),0.08,1.));
    float ss = max(max(max(c1,c2),s1),s2);
    
    float c3 = 1.-smoothstep(0.2,0.205,pointSDF(st,vec2(0.662,0.),0.));
    float c4 = 1.-smoothstep(0.2,0.205,pointSDF(st,vec2(0.950,0.),0.));
    float s3 = 1.-smoothstep(0.0,0.005,squareSDF(st,vec2(1,0.),0.2,1.26));
    float s4 = 1.-smoothstep(0.040,0.045,squareSDF(st,vec2(0.583,-0.08),0.08,1.));
    float ts = max(max(max(c3,c4),s3),s4);
    
    col = vec3(fs+ss+ts)*BLUE;
    gl_FragColor = vec4(col,1.0);
}