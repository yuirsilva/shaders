#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//  Function from Iñigo Quiles
//  www.iquilezles.org/www/articles/functions/functions.htm
float parabola(float x,float k){return pow(4.0*x*(1.0-x),k);}

float polygon(vec2 st,in vec2 pos, in int n) {
	st-=(pos*2.-1.);
    float a=atan(st.x,st.y)+PI;
    float r=TWO_PI/float(n);
    float s=cos(floor(0.5+a/r)*r-a)*length(st);
    return s;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
	st = st*2.-1.;
    vec3 col = vec3(0.);
    
	float s = polygon(st,vec2(sin(u_time*PI)*0.5+0.5,sin(u_time*TWO_PI)*0.1+0.1),6);
    
    col = vec3(1.-smoothstep(0.200,0.204,s));
    gl_FragColor = vec4(col,1.0);
}