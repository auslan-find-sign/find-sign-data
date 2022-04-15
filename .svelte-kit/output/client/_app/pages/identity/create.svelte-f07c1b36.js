import{S as X0,i as H0,s as V0,e as S0,t as Y0,k as M0,x as q0,c as j0,a as T0,h as L0,d as Bf,m as C0,y as J0,g as Zf,K as R0,z as W0,r as Q0,p as m0,C as k0,w as f1}from"../../chunks/index-40d8e6e8.js";import{g as r1,c as x1,C as t1}from"../../chunks/CodeBlock-9513f1d7.js";import"../../chunks/Icon-347d076d.js";var z0={exports:{}},e1={},a1=Object.freeze(Object.defineProperty({__proto__:null,default:e1},Symbol.toStringTag,{value:"Module"})),n1=r1(a1);(function(sf){(function(A){var p=function(r){var t,x=new Float64Array(16);if(r)for(t=0;t<r.length;t++)x[t]=r[t];return x},nf=function(){throw new Error("no PRNG")},xf=new Uint8Array(16),yf=new Uint8Array(32);yf[0]=9;var cf=p(),df=p([1]),pf=p([56129,1]),V=p([30883,4953,19914,30187,55467,16705,2637,112,59544,30585,16505,36039,65139,11119,27886,20995]),ef=p([61785,9906,39828,60374,45398,33411,5274,224,53552,61171,33010,6542,64743,22239,55772,9222]),_f=p([54554,36645,11616,51542,42930,38181,51040,26924,56412,64982,57905,49316,21502,52590,14035,8553]),n0=p([26200,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214]),O0=p([41136,18958,6951,50414,58488,44335,6150,12099,55207,15867,153,11085,57099,20417,9344,11139]);function i0(r,t,x,f){r[t]=x>>24&255,r[t+1]=x>>16&255,r[t+2]=x>>8&255,r[t+3]=x&255,r[t+4]=f>>24&255,r[t+5]=f>>16&255,r[t+6]=f>>8&255,r[t+7]=f&255}function Ff(r,t,x,f,e){var n,i=0;for(n=0;n<e;n++)i|=r[t+n]^x[f+n];return(1&i-1>>>8)-1}function o0(r,t,x,f){return Ff(r,t,x,f,16)}function Df(r,t,x,f){return Ff(r,t,x,f,32)}function $0(r,t,x,f){for(var e=f[0]&255|(f[1]&255)<<8|(f[2]&255)<<16|(f[3]&255)<<24,n=x[0]&255|(x[1]&255)<<8|(x[2]&255)<<16|(x[3]&255)<<24,i=x[4]&255|(x[5]&255)<<8|(x[6]&255)<<16|(x[7]&255)<<24,c=x[8]&255|(x[9]&255)<<8|(x[10]&255)<<16|(x[11]&255)<<24,_=x[12]&255|(x[13]&255)<<8|(x[14]&255)<<16|(x[15]&255)<<24,B=f[4]&255|(f[5]&255)<<8|(f[6]&255)<<16|(f[7]&255)<<24,v=t[0]&255|(t[1]&255)<<8|(t[2]&255)<<16|(t[3]&255)<<24,D=t[4]&255|(t[5]&255)<<8|(t[6]&255)<<16|(t[7]&255)<<24,w=t[8]&255|(t[9]&255)<<8|(t[10]&255)<<16|(t[11]&255)<<24,M=t[12]&255|(t[13]&255)<<8|(t[14]&255)<<16|(t[15]&255)<<24,j=f[8]&255|(f[9]&255)<<8|(f[10]&255)<<16|(f[11]&255)<<24,z=x[16]&255|(x[17]&255)<<8|(x[18]&255)<<16|(x[19]&255)<<24,R=x[20]&255|(x[21]&255)<<8|(x[22]&255)<<16|(x[23]&255)<<24,T=x[24]&255|(x[25]&255)<<8|(x[26]&255)<<16|(x[27]&255)<<24,C=x[28]&255|(x[29]&255)<<8|(x[30]&255)<<16|(x[31]&255)<<24,L=f[12]&255|(f[13]&255)<<8|(f[14]&255)<<16|(f[15]&255)<<24,g=e,S=n,l=i,E=c,U=_,y=B,o=v,h=D,u=w,s=M,b=j,d=z,Y=R,O=T,N=C,$=L,a,K=0;K<20;K+=2)a=g+Y|0,U^=a<<7|a>>>32-7,a=U+g|0,u^=a<<9|a>>>32-9,a=u+U|0,Y^=a<<13|a>>>32-13,a=Y+u|0,g^=a<<18|a>>>32-18,a=y+S|0,s^=a<<7|a>>>32-7,a=s+y|0,O^=a<<9|a>>>32-9,a=O+s|0,S^=a<<13|a>>>32-13,a=S+O|0,y^=a<<18|a>>>32-18,a=b+o|0,N^=a<<7|a>>>32-7,a=N+b|0,l^=a<<9|a>>>32-9,a=l+N|0,o^=a<<13|a>>>32-13,a=o+l|0,b^=a<<18|a>>>32-18,a=$+d|0,E^=a<<7|a>>>32-7,a=E+$|0,h^=a<<9|a>>>32-9,a=h+E|0,d^=a<<13|a>>>32-13,a=d+h|0,$^=a<<18|a>>>32-18,a=g+E|0,S^=a<<7|a>>>32-7,a=S+g|0,l^=a<<9|a>>>32-9,a=l+S|0,E^=a<<13|a>>>32-13,a=E+l|0,g^=a<<18|a>>>32-18,a=y+U|0,o^=a<<7|a>>>32-7,a=o+y|0,h^=a<<9|a>>>32-9,a=h+o|0,U^=a<<13|a>>>32-13,a=U+h|0,y^=a<<18|a>>>32-18,a=b+s|0,d^=a<<7|a>>>32-7,a=d+b|0,u^=a<<9|a>>>32-9,a=u+d|0,s^=a<<13|a>>>32-13,a=s+u|0,b^=a<<18|a>>>32-18,a=$+N|0,Y^=a<<7|a>>>32-7,a=Y+$|0,O^=a<<9|a>>>32-9,a=O+Y|0,N^=a<<13|a>>>32-13,a=N+O|0,$^=a<<18|a>>>32-18;g=g+e|0,S=S+n|0,l=l+i|0,E=E+c|0,U=U+_|0,y=y+B|0,o=o+v|0,h=h+D|0,u=u+w|0,s=s+M|0,b=b+j|0,d=d+z|0,Y=Y+R|0,O=O+T|0,N=N+C|0,$=$+L|0,r[0]=g>>>0&255,r[1]=g>>>8&255,r[2]=g>>>16&255,r[3]=g>>>24&255,r[4]=S>>>0&255,r[5]=S>>>8&255,r[6]=S>>>16&255,r[7]=S>>>24&255,r[8]=l>>>0&255,r[9]=l>>>8&255,r[10]=l>>>16&255,r[11]=l>>>24&255,r[12]=E>>>0&255,r[13]=E>>>8&255,r[14]=E>>>16&255,r[15]=E>>>24&255,r[16]=U>>>0&255,r[17]=U>>>8&255,r[18]=U>>>16&255,r[19]=U>>>24&255,r[20]=y>>>0&255,r[21]=y>>>8&255,r[22]=y>>>16&255,r[23]=y>>>24&255,r[24]=o>>>0&255,r[25]=o>>>8&255,r[26]=o>>>16&255,r[27]=o>>>24&255,r[28]=h>>>0&255,r[29]=h>>>8&255,r[30]=h>>>16&255,r[31]=h>>>24&255,r[32]=u>>>0&255,r[33]=u>>>8&255,r[34]=u>>>16&255,r[35]=u>>>24&255,r[36]=s>>>0&255,r[37]=s>>>8&255,r[38]=s>>>16&255,r[39]=s>>>24&255,r[40]=b>>>0&255,r[41]=b>>>8&255,r[42]=b>>>16&255,r[43]=b>>>24&255,r[44]=d>>>0&255,r[45]=d>>>8&255,r[46]=d>>>16&255,r[47]=d>>>24&255,r[48]=Y>>>0&255,r[49]=Y>>>8&255,r[50]=Y>>>16&255,r[51]=Y>>>24&255,r[52]=O>>>0&255,r[53]=O>>>8&255,r[54]=O>>>16&255,r[55]=O>>>24&255,r[56]=N>>>0&255,r[57]=N>>>8&255,r[58]=N>>>16&255,r[59]=N>>>24&255,r[60]=$>>>0&255,r[61]=$>>>8&255,r[62]=$>>>16&255,r[63]=$>>>24&255}function N0(r,t,x,f){for(var e=f[0]&255|(f[1]&255)<<8|(f[2]&255)<<16|(f[3]&255)<<24,n=x[0]&255|(x[1]&255)<<8|(x[2]&255)<<16|(x[3]&255)<<24,i=x[4]&255|(x[5]&255)<<8|(x[6]&255)<<16|(x[7]&255)<<24,c=x[8]&255|(x[9]&255)<<8|(x[10]&255)<<16|(x[11]&255)<<24,_=x[12]&255|(x[13]&255)<<8|(x[14]&255)<<16|(x[15]&255)<<24,B=f[4]&255|(f[5]&255)<<8|(f[6]&255)<<16|(f[7]&255)<<24,v=t[0]&255|(t[1]&255)<<8|(t[2]&255)<<16|(t[3]&255)<<24,D=t[4]&255|(t[5]&255)<<8|(t[6]&255)<<16|(t[7]&255)<<24,w=t[8]&255|(t[9]&255)<<8|(t[10]&255)<<16|(t[11]&255)<<24,M=t[12]&255|(t[13]&255)<<8|(t[14]&255)<<16|(t[15]&255)<<24,j=f[8]&255|(f[9]&255)<<8|(f[10]&255)<<16|(f[11]&255)<<24,z=x[16]&255|(x[17]&255)<<8|(x[18]&255)<<16|(x[19]&255)<<24,R=x[20]&255|(x[21]&255)<<8|(x[22]&255)<<16|(x[23]&255)<<24,T=x[24]&255|(x[25]&255)<<8|(x[26]&255)<<16|(x[27]&255)<<24,C=x[28]&255|(x[29]&255)<<8|(x[30]&255)<<16|(x[31]&255)<<24,L=f[12]&255|(f[13]&255)<<8|(f[14]&255)<<16|(f[15]&255)<<24,g=e,S=n,l=i,E=c,U=_,y=B,o=v,h=D,u=w,s=M,b=j,d=z,Y=R,O=T,N=C,$=L,a,K=0;K<20;K+=2)a=g+Y|0,U^=a<<7|a>>>32-7,a=U+g|0,u^=a<<9|a>>>32-9,a=u+U|0,Y^=a<<13|a>>>32-13,a=Y+u|0,g^=a<<18|a>>>32-18,a=y+S|0,s^=a<<7|a>>>32-7,a=s+y|0,O^=a<<9|a>>>32-9,a=O+s|0,S^=a<<13|a>>>32-13,a=S+O|0,y^=a<<18|a>>>32-18,a=b+o|0,N^=a<<7|a>>>32-7,a=N+b|0,l^=a<<9|a>>>32-9,a=l+N|0,o^=a<<13|a>>>32-13,a=o+l|0,b^=a<<18|a>>>32-18,a=$+d|0,E^=a<<7|a>>>32-7,a=E+$|0,h^=a<<9|a>>>32-9,a=h+E|0,d^=a<<13|a>>>32-13,a=d+h|0,$^=a<<18|a>>>32-18,a=g+E|0,S^=a<<7|a>>>32-7,a=S+g|0,l^=a<<9|a>>>32-9,a=l+S|0,E^=a<<13|a>>>32-13,a=E+l|0,g^=a<<18|a>>>32-18,a=y+U|0,o^=a<<7|a>>>32-7,a=o+y|0,h^=a<<9|a>>>32-9,a=h+o|0,U^=a<<13|a>>>32-13,a=U+h|0,y^=a<<18|a>>>32-18,a=b+s|0,d^=a<<7|a>>>32-7,a=d+b|0,u^=a<<9|a>>>32-9,a=u+d|0,s^=a<<13|a>>>32-13,a=s+u|0,b^=a<<18|a>>>32-18,a=$+N|0,Y^=a<<7|a>>>32-7,a=Y+$|0,O^=a<<9|a>>>32-9,a=O+Y|0,N^=a<<13|a>>>32-13,a=N+O|0,$^=a<<18|a>>>32-18;r[0]=g>>>0&255,r[1]=g>>>8&255,r[2]=g>>>16&255,r[3]=g>>>24&255,r[4]=y>>>0&255,r[5]=y>>>8&255,r[6]=y>>>16&255,r[7]=y>>>24&255,r[8]=b>>>0&255,r[9]=b>>>8&255,r[10]=b>>>16&255,r[11]=b>>>24&255,r[12]=$>>>0&255,r[13]=$>>>8&255,r[14]=$>>>16&255,r[15]=$>>>24&255,r[16]=o>>>0&255,r[17]=o>>>8&255,r[18]=o>>>16&255,r[19]=o>>>24&255,r[20]=h>>>0&255,r[21]=h>>>8&255,r[22]=h>>>16&255,r[23]=h>>>24&255,r[24]=u>>>0&255,r[25]=u>>>8&255,r[26]=u>>>16&255,r[27]=u>>>24&255,r[28]=s>>>0&255,r[29]=s>>>8&255,r[30]=s>>>16&255,r[31]=s>>>24&255}function Tf(r,t,x,f){$0(r,t,x,f)}function Lf(r,t,x,f){N0(r,t,x,f)}var vf=new Uint8Array([101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107]);function h0(r,t,x,f,e,n,i){var c=new Uint8Array(16),_=new Uint8Array(64),B,v;for(v=0;v<16;v++)c[v]=0;for(v=0;v<8;v++)c[v]=n[v];for(;e>=64;){for(Tf(_,c,i,vf),v=0;v<64;v++)r[t+v]=x[f+v]^_[v];for(B=1,v=8;v<16;v++)B=B+(c[v]&255)|0,c[v]=B&255,B>>>=8;e-=64,t+=64,f+=64}if(e>0)for(Tf(_,c,i,vf),v=0;v<e;v++)r[t+v]=x[f+v]^_[v];return 0}function s0(r,t,x,f,e){var n=new Uint8Array(16),i=new Uint8Array(64),c,_;for(_=0;_<16;_++)n[_]=0;for(_=0;_<8;_++)n[_]=f[_];for(;x>=64;){for(Tf(i,n,e,vf),_=0;_<64;_++)r[t+_]=i[_];for(c=1,_=8;_<16;_++)c=c+(n[_]&255)|0,n[_]=c&255,c>>>=8;x-=64,t+=64}if(x>0)for(Tf(i,n,e,vf),_=0;_<x;_++)r[t+_]=i[_];return 0}function c0(r,t,x,f,e){var n=new Uint8Array(32);Lf(n,f,e,vf);for(var i=new Uint8Array(8),c=0;c<8;c++)i[c]=f[c+16];return s0(r,t,x,i,n)}function Gf(r,t,x,f,e,n,i){var c=new Uint8Array(32);Lf(c,n,i,vf);for(var _=new Uint8Array(8),B=0;B<8;B++)_[B]=n[B+16];return h0(r,t,x,f,e,_,c)}var Cf=function(r){this.buffer=new Uint8Array(16),this.r=new Uint16Array(10),this.h=new Uint16Array(10),this.pad=new Uint16Array(8),this.leftover=0,this.fin=0;var t,x,f,e,n,i,c,_;t=r[0]&255|(r[1]&255)<<8,this.r[0]=t&8191,x=r[2]&255|(r[3]&255)<<8,this.r[1]=(t>>>13|x<<3)&8191,f=r[4]&255|(r[5]&255)<<8,this.r[2]=(x>>>10|f<<6)&7939,e=r[6]&255|(r[7]&255)<<8,this.r[3]=(f>>>7|e<<9)&8191,n=r[8]&255|(r[9]&255)<<8,this.r[4]=(e>>>4|n<<12)&255,this.r[5]=n>>>1&8190,i=r[10]&255|(r[11]&255)<<8,this.r[6]=(n>>>14|i<<2)&8191,c=r[12]&255|(r[13]&255)<<8,this.r[7]=(i>>>11|c<<5)&8065,_=r[14]&255|(r[15]&255)<<8,this.r[8]=(c>>>8|_<<8)&8191,this.r[9]=_>>>5&127,this.pad[0]=r[16]&255|(r[17]&255)<<8,this.pad[1]=r[18]&255|(r[19]&255)<<8,this.pad[2]=r[20]&255|(r[21]&255)<<8,this.pad[3]=r[22]&255|(r[23]&255)<<8,this.pad[4]=r[24]&255|(r[25]&255)<<8,this.pad[5]=r[26]&255|(r[27]&255)<<8,this.pad[6]=r[28]&255|(r[29]&255)<<8,this.pad[7]=r[30]&255|(r[31]&255)<<8};Cf.prototype.blocks=function(r,t,x){for(var f=this.fin?0:2048,e,n,i,c,_,B,v,D,w,M,j,z,R,T,C,L,g,S,l,E=this.h[0],U=this.h[1],y=this.h[2],o=this.h[3],h=this.h[4],u=this.h[5],s=this.h[6],b=this.h[7],d=this.h[8],Y=this.h[9],O=this.r[0],N=this.r[1],$=this.r[2],a=this.r[3],K=this.r[4],G=this.r[5],X=this.r[6],P=this.r[7],Z=this.r[8],F=this.r[9];x>=16;)e=r[t+0]&255|(r[t+1]&255)<<8,E+=e&8191,n=r[t+2]&255|(r[t+3]&255)<<8,U+=(e>>>13|n<<3)&8191,i=r[t+4]&255|(r[t+5]&255)<<8,y+=(n>>>10|i<<6)&8191,c=r[t+6]&255|(r[t+7]&255)<<8,o+=(i>>>7|c<<9)&8191,_=r[t+8]&255|(r[t+9]&255)<<8,h+=(c>>>4|_<<12)&8191,u+=_>>>1&8191,B=r[t+10]&255|(r[t+11]&255)<<8,s+=(_>>>14|B<<2)&8191,v=r[t+12]&255|(r[t+13]&255)<<8,b+=(B>>>11|v<<5)&8191,D=r[t+14]&255|(r[t+15]&255)<<8,d+=(v>>>8|D<<8)&8191,Y+=D>>>5|f,w=0,M=w,M+=E*O,M+=U*(5*F),M+=y*(5*Z),M+=o*(5*P),M+=h*(5*X),w=M>>>13,M&=8191,M+=u*(5*G),M+=s*(5*K),M+=b*(5*a),M+=d*(5*$),M+=Y*(5*N),w+=M>>>13,M&=8191,j=w,j+=E*N,j+=U*O,j+=y*(5*F),j+=o*(5*Z),j+=h*(5*P),w=j>>>13,j&=8191,j+=u*(5*X),j+=s*(5*G),j+=b*(5*K),j+=d*(5*a),j+=Y*(5*$),w+=j>>>13,j&=8191,z=w,z+=E*$,z+=U*N,z+=y*O,z+=o*(5*F),z+=h*(5*Z),w=z>>>13,z&=8191,z+=u*(5*P),z+=s*(5*X),z+=b*(5*G),z+=d*(5*K),z+=Y*(5*a),w+=z>>>13,z&=8191,R=w,R+=E*a,R+=U*$,R+=y*N,R+=o*O,R+=h*(5*F),w=R>>>13,R&=8191,R+=u*(5*Z),R+=s*(5*P),R+=b*(5*X),R+=d*(5*G),R+=Y*(5*K),w+=R>>>13,R&=8191,T=w,T+=E*K,T+=U*a,T+=y*$,T+=o*N,T+=h*O,w=T>>>13,T&=8191,T+=u*(5*F),T+=s*(5*Z),T+=b*(5*P),T+=d*(5*X),T+=Y*(5*G),w+=T>>>13,T&=8191,C=w,C+=E*G,C+=U*K,C+=y*a,C+=o*$,C+=h*N,w=C>>>13,C&=8191,C+=u*O,C+=s*(5*F),C+=b*(5*Z),C+=d*(5*P),C+=Y*(5*X),w+=C>>>13,C&=8191,L=w,L+=E*X,L+=U*G,L+=y*K,L+=o*a,L+=h*$,w=L>>>13,L&=8191,L+=u*N,L+=s*O,L+=b*(5*F),L+=d*(5*Z),L+=Y*(5*P),w+=L>>>13,L&=8191,g=w,g+=E*P,g+=U*X,g+=y*G,g+=o*K,g+=h*a,w=g>>>13,g&=8191,g+=u*$,g+=s*N,g+=b*O,g+=d*(5*F),g+=Y*(5*Z),w+=g>>>13,g&=8191,S=w,S+=E*Z,S+=U*P,S+=y*X,S+=o*G,S+=h*K,w=S>>>13,S&=8191,S+=u*a,S+=s*$,S+=b*N,S+=d*O,S+=Y*(5*F),w+=S>>>13,S&=8191,l=w,l+=E*F,l+=U*Z,l+=y*P,l+=o*X,l+=h*G,w=l>>>13,l&=8191,l+=u*K,l+=s*a,l+=b*$,l+=d*N,l+=Y*O,w+=l>>>13,l&=8191,w=(w<<2)+w|0,w=w+M|0,M=w&8191,w=w>>>13,j+=w,E=M,U=j,y=z,o=R,h=T,u=C,s=L,b=g,d=S,Y=l,t+=16,x-=16;this.h[0]=E,this.h[1]=U,this.h[2]=y,this.h[3]=o,this.h[4]=h,this.h[5]=u,this.h[6]=s,this.h[7]=b,this.h[8]=d,this.h[9]=Y},Cf.prototype.finish=function(r,t){var x=new Uint16Array(10),f,e,n,i;if(this.leftover){for(i=this.leftover,this.buffer[i++]=1;i<16;i++)this.buffer[i]=0;this.fin=1,this.blocks(this.buffer,0,16)}for(f=this.h[1]>>>13,this.h[1]&=8191,i=2;i<10;i++)this.h[i]+=f,f=this.h[i]>>>13,this.h[i]&=8191;for(this.h[0]+=f*5,f=this.h[0]>>>13,this.h[0]&=8191,this.h[1]+=f,f=this.h[1]>>>13,this.h[1]&=8191,this.h[2]+=f,x[0]=this.h[0]+5,f=x[0]>>>13,x[0]&=8191,i=1;i<10;i++)x[i]=this.h[i]+f,f=x[i]>>>13,x[i]&=8191;for(x[9]-=1<<13,e=(f^1)-1,i=0;i<10;i++)x[i]&=e;for(e=~e,i=0;i<10;i++)this.h[i]=this.h[i]&e|x[i];for(this.h[0]=(this.h[0]|this.h[1]<<13)&65535,this.h[1]=(this.h[1]>>>3|this.h[2]<<10)&65535,this.h[2]=(this.h[2]>>>6|this.h[3]<<7)&65535,this.h[3]=(this.h[3]>>>9|this.h[4]<<4)&65535,this.h[4]=(this.h[4]>>>12|this.h[5]<<1|this.h[6]<<14)&65535,this.h[5]=(this.h[6]>>>2|this.h[7]<<11)&65535,this.h[6]=(this.h[7]>>>5|this.h[8]<<8)&65535,this.h[7]=(this.h[8]>>>8|this.h[9]<<5)&65535,n=this.h[0]+this.pad[0],this.h[0]=n&65535,i=1;i<8;i++)n=(this.h[i]+this.pad[i]|0)+(n>>>16)|0,this.h[i]=n&65535;r[t+0]=this.h[0]>>>0&255,r[t+1]=this.h[0]>>>8&255,r[t+2]=this.h[1]>>>0&255,r[t+3]=this.h[1]>>>8&255,r[t+4]=this.h[2]>>>0&255,r[t+5]=this.h[2]>>>8&255,r[t+6]=this.h[3]>>>0&255,r[t+7]=this.h[3]>>>8&255,r[t+8]=this.h[4]>>>0&255,r[t+9]=this.h[4]>>>8&255,r[t+10]=this.h[5]>>>0&255,r[t+11]=this.h[5]>>>8&255,r[t+12]=this.h[6]>>>0&255,r[t+13]=this.h[6]>>>8&255,r[t+14]=this.h[7]>>>0&255,r[t+15]=this.h[7]>>>8&255},Cf.prototype.update=function(r,t,x){var f,e;if(this.leftover){for(e=16-this.leftover,e>x&&(e=x),f=0;f<e;f++)this.buffer[this.leftover+f]=r[t+f];if(x-=e,t+=e,this.leftover+=e,this.leftover<16)return;this.blocks(this.buffer,0,16),this.leftover=0}if(x>=16&&(e=x-x%16,this.blocks(r,t,e),t+=e,x-=e),x){for(f=0;f<x;f++)this.buffer[this.leftover+f]=r[t+f];this.leftover+=x}};function Xf(r,t,x,f,e,n){var i=new Cf(n);return i.update(x,f,e),i.finish(r,t),0}function b0(r,t,x,f,e,n){var i=new Uint8Array(16);return Xf(i,0,x,f,e,n),o0(r,t,i,0)}function Hf(r,t,x,f,e){var n;if(x<32)return-1;for(Gf(r,0,t,0,x,f,e),Xf(r,16,r,32,x-32,r),n=0;n<16;n++)r[n]=0;return 0}function Vf(r,t,x,f,e){var n,i=new Uint8Array(32);if(x<32||(c0(i,0,32,f,e),b0(t,16,t,32,x-32,i)!==0))return-1;for(Gf(r,0,t,0,x,f,e),n=0;n<32;n++)r[n]=0;return 0}function bf(r,t){var x;for(x=0;x<16;x++)r[x]=t[x]|0}function qf(r){var t,x,f=1;for(t=0;t<16;t++)x=r[t]+f+65535,f=Math.floor(x/65536),r[t]=x-f*65536;r[0]+=f-1+37*(f-1)}function gf(r,t,x){for(var f,e=~(x-1),n=0;n<16;n++)f=e&(r[n]^t[n]),r[n]^=f,t[n]^=f}function Ef(r,t){var x,f,e,n=p(),i=p();for(x=0;x<16;x++)i[x]=t[x];for(qf(i),qf(i),qf(i),f=0;f<2;f++){for(n[0]=i[0]-65517,x=1;x<15;x++)n[x]=i[x]-65535-(n[x-1]>>16&1),n[x-1]&=65535;n[15]=i[15]-32767-(n[14]>>16&1),e=n[15]>>16&1,n[14]&=65535,gf(i,n,1-e)}for(x=0;x<16;x++)r[2*x]=i[x]&255,r[2*x+1]=i[x]>>8}function u0(r,t){var x=new Uint8Array(32),f=new Uint8Array(32);return Ef(x,r),Ef(f,t),Df(x,0,f,0)}function d0(r){var t=new Uint8Array(32);return Ef(t,r),t[0]&1}function Jf(r,t){var x;for(x=0;x<16;x++)r[x]=t[2*x]+(t[2*x+1]<<8);r[15]&=32767}function of(r,t,x){for(var f=0;f<16;f++)r[f]=t[f]+x[f]}function hf(r,t,x){for(var f=0;f<16;f++)r[f]=t[f]-x[f]}function I(r,t,x){var f,e,n=0,i=0,c=0,_=0,B=0,v=0,D=0,w=0,M=0,j=0,z=0,R=0,T=0,C=0,L=0,g=0,S=0,l=0,E=0,U=0,y=0,o=0,h=0,u=0,s=0,b=0,d=0,Y=0,O=0,N=0,$=0,a=x[0],K=x[1],G=x[2],X=x[3],P=x[4],Z=x[5],F=x[6],Q=x[7],H=x[8],q=x[9],J=x[10],W=x[11],m=x[12],k=x[13],ff=x[14],rf=x[15];f=t[0],n+=f*a,i+=f*K,c+=f*G,_+=f*X,B+=f*P,v+=f*Z,D+=f*F,w+=f*Q,M+=f*H,j+=f*q,z+=f*J,R+=f*W,T+=f*m,C+=f*k,L+=f*ff,g+=f*rf,f=t[1],i+=f*a,c+=f*K,_+=f*G,B+=f*X,v+=f*P,D+=f*Z,w+=f*F,M+=f*Q,j+=f*H,z+=f*q,R+=f*J,T+=f*W,C+=f*m,L+=f*k,g+=f*ff,S+=f*rf,f=t[2],c+=f*a,_+=f*K,B+=f*G,v+=f*X,D+=f*P,w+=f*Z,M+=f*F,j+=f*Q,z+=f*H,R+=f*q,T+=f*J,C+=f*W,L+=f*m,g+=f*k,S+=f*ff,l+=f*rf,f=t[3],_+=f*a,B+=f*K,v+=f*G,D+=f*X,w+=f*P,M+=f*Z,j+=f*F,z+=f*Q,R+=f*H,T+=f*q,C+=f*J,L+=f*W,g+=f*m,S+=f*k,l+=f*ff,E+=f*rf,f=t[4],B+=f*a,v+=f*K,D+=f*G,w+=f*X,M+=f*P,j+=f*Z,z+=f*F,R+=f*Q,T+=f*H,C+=f*q,L+=f*J,g+=f*W,S+=f*m,l+=f*k,E+=f*ff,U+=f*rf,f=t[5],v+=f*a,D+=f*K,w+=f*G,M+=f*X,j+=f*P,z+=f*Z,R+=f*F,T+=f*Q,C+=f*H,L+=f*q,g+=f*J,S+=f*W,l+=f*m,E+=f*k,U+=f*ff,y+=f*rf,f=t[6],D+=f*a,w+=f*K,M+=f*G,j+=f*X,z+=f*P,R+=f*Z,T+=f*F,C+=f*Q,L+=f*H,g+=f*q,S+=f*J,l+=f*W,E+=f*m,U+=f*k,y+=f*ff,o+=f*rf,f=t[7],w+=f*a,M+=f*K,j+=f*G,z+=f*X,R+=f*P,T+=f*Z,C+=f*F,L+=f*Q,g+=f*H,S+=f*q,l+=f*J,E+=f*W,U+=f*m,y+=f*k,o+=f*ff,h+=f*rf,f=t[8],M+=f*a,j+=f*K,z+=f*G,R+=f*X,T+=f*P,C+=f*Z,L+=f*F,g+=f*Q,S+=f*H,l+=f*q,E+=f*J,U+=f*W,y+=f*m,o+=f*k,h+=f*ff,u+=f*rf,f=t[9],j+=f*a,z+=f*K,R+=f*G,T+=f*X,C+=f*P,L+=f*Z,g+=f*F,S+=f*Q,l+=f*H,E+=f*q,U+=f*J,y+=f*W,o+=f*m,h+=f*k,u+=f*ff,s+=f*rf,f=t[10],z+=f*a,R+=f*K,T+=f*G,C+=f*X,L+=f*P,g+=f*Z,S+=f*F,l+=f*Q,E+=f*H,U+=f*q,y+=f*J,o+=f*W,h+=f*m,u+=f*k,s+=f*ff,b+=f*rf,f=t[11],R+=f*a,T+=f*K,C+=f*G,L+=f*X,g+=f*P,S+=f*Z,l+=f*F,E+=f*Q,U+=f*H,y+=f*q,o+=f*J,h+=f*W,u+=f*m,s+=f*k,b+=f*ff,d+=f*rf,f=t[12],T+=f*a,C+=f*K,L+=f*G,g+=f*X,S+=f*P,l+=f*Z,E+=f*F,U+=f*Q,y+=f*H,o+=f*q,h+=f*J,u+=f*W,s+=f*m,b+=f*k,d+=f*ff,Y+=f*rf,f=t[13],C+=f*a,L+=f*K,g+=f*G,S+=f*X,l+=f*P,E+=f*Z,U+=f*F,y+=f*Q,o+=f*H,h+=f*q,u+=f*J,s+=f*W,b+=f*m,d+=f*k,Y+=f*ff,O+=f*rf,f=t[14],L+=f*a,g+=f*K,S+=f*G,l+=f*X,E+=f*P,U+=f*Z,y+=f*F,o+=f*Q,h+=f*H,u+=f*q,s+=f*J,b+=f*W,d+=f*m,Y+=f*k,O+=f*ff,N+=f*rf,f=t[15],g+=f*a,S+=f*K,l+=f*G,E+=f*X,U+=f*P,y+=f*Z,o+=f*F,h+=f*Q,u+=f*H,s+=f*q,b+=f*J,d+=f*W,Y+=f*m,O+=f*k,N+=f*ff,$+=f*rf,n+=38*S,i+=38*l,c+=38*E,_+=38*U,B+=38*y,v+=38*o,D+=38*h,w+=38*u,M+=38*s,j+=38*b,z+=38*d,R+=38*Y,T+=38*O,C+=38*N,L+=38*$,e=1,f=n+e+65535,e=Math.floor(f/65536),n=f-e*65536,f=i+e+65535,e=Math.floor(f/65536),i=f-e*65536,f=c+e+65535,e=Math.floor(f/65536),c=f-e*65536,f=_+e+65535,e=Math.floor(f/65536),_=f-e*65536,f=B+e+65535,e=Math.floor(f/65536),B=f-e*65536,f=v+e+65535,e=Math.floor(f/65536),v=f-e*65536,f=D+e+65535,e=Math.floor(f/65536),D=f-e*65536,f=w+e+65535,e=Math.floor(f/65536),w=f-e*65536,f=M+e+65535,e=Math.floor(f/65536),M=f-e*65536,f=j+e+65535,e=Math.floor(f/65536),j=f-e*65536,f=z+e+65535,e=Math.floor(f/65536),z=f-e*65536,f=R+e+65535,e=Math.floor(f/65536),R=f-e*65536,f=T+e+65535,e=Math.floor(f/65536),T=f-e*65536,f=C+e+65535,e=Math.floor(f/65536),C=f-e*65536,f=L+e+65535,e=Math.floor(f/65536),L=f-e*65536,f=g+e+65535,e=Math.floor(f/65536),g=f-e*65536,n+=e-1+37*(e-1),e=1,f=n+e+65535,e=Math.floor(f/65536),n=f-e*65536,f=i+e+65535,e=Math.floor(f/65536),i=f-e*65536,f=c+e+65535,e=Math.floor(f/65536),c=f-e*65536,f=_+e+65535,e=Math.floor(f/65536),_=f-e*65536,f=B+e+65535,e=Math.floor(f/65536),B=f-e*65536,f=v+e+65535,e=Math.floor(f/65536),v=f-e*65536,f=D+e+65535,e=Math.floor(f/65536),D=f-e*65536,f=w+e+65535,e=Math.floor(f/65536),w=f-e*65536,f=M+e+65535,e=Math.floor(f/65536),M=f-e*65536,f=j+e+65535,e=Math.floor(f/65536),j=f-e*65536,f=z+e+65535,e=Math.floor(f/65536),z=f-e*65536,f=R+e+65535,e=Math.floor(f/65536),R=f-e*65536,f=T+e+65535,e=Math.floor(f/65536),T=f-e*65536,f=C+e+65535,e=Math.floor(f/65536),C=f-e*65536,f=L+e+65535,e=Math.floor(f/65536),L=f-e*65536,f=g+e+65535,e=Math.floor(f/65536),g=f-e*65536,n+=e-1+37*(e-1),r[0]=n,r[1]=i,r[2]=c,r[3]=_,r[4]=B,r[5]=v,r[6]=D,r[7]=w,r[8]=M,r[9]=j,r[10]=z,r[11]=R,r[12]=T,r[13]=C,r[14]=L,r[15]=g}function af(r,t){I(r,t,t)}function _0(r,t){var x=p(),f;for(f=0;f<16;f++)x[f]=t[f];for(f=253;f>=0;f--)af(x,x),f!==2&&f!==4&&I(x,x,t);for(f=0;f<16;f++)r[f]=x[f]}function y0(r,t){var x=p(),f;for(f=0;f<16;f++)x[f]=t[f];for(f=250;f>=0;f--)af(x,x),f!==1&&I(x,x,t);for(f=0;f<16;f++)r[f]=x[f]}function Rf(r,t,x){var f=new Uint8Array(32),e=new Float64Array(80),n,i,c=p(),_=p(),B=p(),v=p(),D=p(),w=p();for(i=0;i<31;i++)f[i]=t[i];for(f[31]=t[31]&127|64,f[0]&=248,Jf(e,x),i=0;i<16;i++)_[i]=e[i],v[i]=c[i]=B[i]=0;for(c[0]=v[0]=1,i=254;i>=0;--i)n=f[i>>>3]>>>(i&7)&1,gf(c,_,n),gf(B,v,n),of(D,c,B),hf(c,c,B),of(B,_,v),hf(_,_,v),af(v,D),af(w,c),I(c,B,c),I(B,_,D),of(D,c,B),hf(c,c,B),af(_,c),hf(B,v,w),I(c,B,pf),of(c,c,v),I(B,B,c),I(c,v,w),I(v,_,e),af(_,D),gf(c,_,n),gf(B,v,n);for(i=0;i<16;i++)e[i+16]=c[i],e[i+32]=B[i],e[i+48]=_[i],e[i+64]=v[i];var M=e.subarray(32),j=e.subarray(16);return _0(M,M),I(j,j,M),Ef(r,j),0}function zf(r,t){return Rf(r,t,yf)}function v0(r,t){return nf(t,32),zf(r,t)}function Of(r,t,x){var f=new Uint8Array(32);return Rf(f,x,t),Lf(r,xf,f,vf)}var l0=Hf,P0=Vf;function K0(r,t,x,f,e,n){var i=new Uint8Array(32);return Of(i,e,n),l0(r,t,x,f,i)}function I0(r,t,x,f,e,n){var i=new Uint8Array(32);return Of(i,e,n),P0(r,t,x,f,i)}var w0=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];function p0(r,t,x,f){for(var e=new Int32Array(16),n=new Int32Array(16),i,c,_,B,v,D,w,M,j,z,R,T,C,L,g,S,l,E,U,y,o,h,u,s,b,d,Y=r[0],O=r[1],N=r[2],$=r[3],a=r[4],K=r[5],G=r[6],X=r[7],P=t[0],Z=t[1],F=t[2],Q=t[3],H=t[4],q=t[5],J=t[6],W=t[7],m=0;f>=128;){for(U=0;U<16;U++)y=8*U+m,e[U]=x[y+0]<<24|x[y+1]<<16|x[y+2]<<8|x[y+3],n[U]=x[y+4]<<24|x[y+5]<<16|x[y+6]<<8|x[y+7];for(U=0;U<80;U++)if(i=Y,c=O,_=N,B=$,v=a,D=K,w=G,M=X,j=P,z=Z,R=F,T=Q,C=H,L=q,g=J,S=W,o=X,h=W,u=h&65535,s=h>>>16,b=o&65535,d=o>>>16,o=(a>>>14|H<<32-14)^(a>>>18|H<<32-18)^(H>>>41-32|a<<32-(41-32)),h=(H>>>14|a<<32-14)^(H>>>18|a<<32-18)^(a>>>41-32|H<<32-(41-32)),u+=h&65535,s+=h>>>16,b+=o&65535,d+=o>>>16,o=a&K^~a&G,h=H&q^~H&J,u+=h&65535,s+=h>>>16,b+=o&65535,d+=o>>>16,o=w0[U*2],h=w0[U*2+1],u+=h&65535,s+=h>>>16,b+=o&65535,d+=o>>>16,o=e[U%16],h=n[U%16],u+=h&65535,s+=h>>>16,b+=o&65535,d+=o>>>16,s+=u>>>16,b+=s>>>16,d+=b>>>16,l=b&65535|d<<16,E=u&65535|s<<16,o=l,h=E,u=h&65535,s=h>>>16,b=o&65535,d=o>>>16,o=(Y>>>28|P<<32-28)^(P>>>34-32|Y<<32-(34-32))^(P>>>39-32|Y<<32-(39-32)),h=(P>>>28|Y<<32-28)^(Y>>>34-32|P<<32-(34-32))^(Y>>>39-32|P<<32-(39-32)),u+=h&65535,s+=h>>>16,b+=o&65535,d+=o>>>16,o=Y&O^Y&N^O&N,h=P&Z^P&F^Z&F,u+=h&65535,s+=h>>>16,b+=o&65535,d+=o>>>16,s+=u>>>16,b+=s>>>16,d+=b>>>16,M=b&65535|d<<16,S=u&65535|s<<16,o=B,h=T,u=h&65535,s=h>>>16,b=o&65535,d=o>>>16,o=l,h=E,u+=h&65535,s+=h>>>16,b+=o&65535,d+=o>>>16,s+=u>>>16,b+=s>>>16,d+=b>>>16,B=b&65535|d<<16,T=u&65535|s<<16,O=i,N=c,$=_,a=B,K=v,G=D,X=w,Y=M,Z=j,F=z,Q=R,H=T,q=C,J=L,W=g,P=S,U%16===15)for(y=0;y<16;y++)o=e[y],h=n[y],u=h&65535,s=h>>>16,b=o&65535,d=o>>>16,o=e[(y+9)%16],h=n[(y+9)%16],u+=h&65535,s+=h>>>16,b+=o&65535,d+=o>>>16,l=e[(y+1)%16],E=n[(y+1)%16],o=(l>>>1|E<<32-1)^(l>>>8|E<<32-8)^l>>>7,h=(E>>>1|l<<32-1)^(E>>>8|l<<32-8)^(E>>>7|l<<32-7),u+=h&65535,s+=h>>>16,b+=o&65535,d+=o>>>16,l=e[(y+14)%16],E=n[(y+14)%16],o=(l>>>19|E<<32-19)^(E>>>61-32|l<<32-(61-32))^l>>>6,h=(E>>>19|l<<32-19)^(l>>>61-32|E<<32-(61-32))^(E>>>6|l<<32-6),u+=h&65535,s+=h>>>16,b+=o&65535,d+=o>>>16,s+=u>>>16,b+=s>>>16,d+=b>>>16,e[y]=b&65535|d<<16,n[y]=u&65535|s<<16;o=Y,h=P,u=h&65535,s=h>>>16,b=o&65535,d=o>>>16,o=r[0],h=t[0],u+=h&65535,s+=h>>>16,b+=o&65535,d+=o>>>16,s+=u>>>16,b+=s>>>16,d+=b>>>16,r[0]=Y=b&65535|d<<16,t[0]=P=u&65535|s<<16,o=O,h=Z,u=h&65535,s=h>>>16,b=o&65535,d=o>>>16,o=r[1],h=t[1],u+=h&65535,s+=h>>>16,b+=o&65535,d+=o>>>16,s+=u>>>16,b+=s>>>16,d+=b>>>16,r[1]=O=b&65535|d<<16,t[1]=Z=u&65535|s<<16,o=N,h=F,u=h&65535,s=h>>>16,b=o&65535,d=o>>>16,o=r[2],h=t[2],u+=h&65535,s+=h>>>16,b+=o&65535,d+=o>>>16,s+=u>>>16,b+=s>>>16,d+=b>>>16,r[2]=N=b&65535|d<<16,t[2]=F=u&65535|s<<16,o=$,h=Q,u=h&65535,s=h>>>16,b=o&65535,d=o>>>16,o=r[3],h=t[3],u+=h&65535,s+=h>>>16,b+=o&65535,d+=o>>>16,s+=u>>>16,b+=s>>>16,d+=b>>>16,r[3]=$=b&65535|d<<16,t[3]=Q=u&65535|s<<16,o=a,h=H,u=h&65535,s=h>>>16,b=o&65535,d=o>>>16,o=r[4],h=t[4],u+=h&65535,s+=h>>>16,b+=o&65535,d+=o>>>16,s+=u>>>16,b+=s>>>16,d+=b>>>16,r[4]=a=b&65535|d<<16,t[4]=H=u&65535|s<<16,o=K,h=q,u=h&65535,s=h>>>16,b=o&65535,d=o>>>16,o=r[5],h=t[5],u+=h&65535,s+=h>>>16,b+=o&65535,d+=o>>>16,s+=u>>>16,b+=s>>>16,d+=b>>>16,r[5]=K=b&65535|d<<16,t[5]=q=u&65535|s<<16,o=G,h=J,u=h&65535,s=h>>>16,b=o&65535,d=o>>>16,o=r[6],h=t[6],u+=h&65535,s+=h>>>16,b+=o&65535,d+=o>>>16,s+=u>>>16,b+=s>>>16,d+=b>>>16,r[6]=G=b&65535|d<<16,t[6]=J=u&65535|s<<16,o=X,h=W,u=h&65535,s=h>>>16,b=o&65535,d=o>>>16,o=r[7],h=t[7],u+=h&65535,s+=h>>>16,b+=o&65535,d+=o>>>16,s+=u>>>16,b+=s>>>16,d+=b>>>16,r[7]=X=b&65535|d<<16,t[7]=W=u&65535|s<<16,m+=128,f-=128}return f}function lf(r,t,x){var f=new Int32Array(8),e=new Int32Array(8),n=new Uint8Array(256),i,c=x;for(f[0]=1779033703,f[1]=3144134277,f[2]=1013904242,f[3]=2773480762,f[4]=1359893119,f[5]=2600822924,f[6]=528734635,f[7]=1541459225,e[0]=4089235720,e[1]=2227873595,e[2]=4271175723,e[3]=1595750129,e[4]=2917565137,e[5]=725511199,e[6]=4215389547,e[7]=327033209,p0(f,e,t,x),x%=128,i=0;i<x;i++)n[i]=t[c-x+i];for(n[x]=128,x=256-128*(x<112?1:0),n[x-9]=0,i0(n,x-8,c/536870912|0,c<<3),p0(f,e,n,x),i=0;i<8;i++)i0(r,8*i,f[i],e[i]);return 0}function $f(r,t){var x=p(),f=p(),e=p(),n=p(),i=p(),c=p(),_=p(),B=p(),v=p();hf(x,r[1],r[0]),hf(v,t[1],t[0]),I(x,x,v),of(f,r[0],r[1]),of(v,t[0],t[1]),I(f,f,v),I(e,r[3],t[3]),I(e,e,ef),I(n,r[2],t[2]),of(n,n,n),hf(i,f,x),hf(c,n,e),of(_,n,e),of(B,f,x),I(r[0],i,c),I(r[1],B,_),I(r[2],_,c),I(r[3],i,B)}function g0(r,t,x){var f;for(f=0;f<4;f++)gf(r[f],t[f],x)}function Wf(r,t){var x=p(),f=p(),e=p();_0(e,t[2]),I(x,t[0],e),I(f,t[1],e),Ef(r,f),r[31]^=d0(x)<<7}function Qf(r,t,x){var f,e;for(bf(r[0],cf),bf(r[1],df),bf(r[2],df),bf(r[3],cf),e=255;e>=0;--e)f=x[e/8|0]>>(e&7)&1,g0(r,t,f),$f(t,r),$f(r,r),g0(r,t,f)}function Nf(r,t){var x=[p(),p(),p(),p()];bf(x[0],_f),bf(x[1],n0),bf(x[2],df),I(x[3],_f,n0),Qf(r,x,t)}function mf(r,t,x){var f=new Uint8Array(64),e=[p(),p(),p(),p()],n;for(x||nf(t,32),lf(f,t,32),f[0]&=248,f[31]&=127,f[31]|=64,Nf(e,f),Wf(r,e),n=0;n<32;n++)t[n+32]=r[n];return 0}var Pf=new Float64Array([237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16]);function kf(r,t){var x,f,e,n;for(f=63;f>=32;--f){for(x=0,e=f-32,n=f-12;e<n;++e)t[e]+=x-16*t[f]*Pf[e-(f-32)],x=Math.floor((t[e]+128)/256),t[e]-=x*256;t[e]+=x,t[f]=0}for(x=0,e=0;e<32;e++)t[e]+=x-(t[31]>>4)*Pf[e],x=t[e]>>8,t[e]&=255;for(e=0;e<32;e++)t[e]-=x*Pf[e];for(f=0;f<32;f++)t[f+1]+=t[f]>>8,r[f]=t[f]&255}function f0(r){var t=new Float64Array(64),x;for(x=0;x<64;x++)t[x]=r[x];for(x=0;x<64;x++)r[x]=0;kf(r,t)}function E0(r,t,x,f){var e=new Uint8Array(64),n=new Uint8Array(64),i=new Uint8Array(64),c,_,B=new Float64Array(64),v=[p(),p(),p(),p()];lf(e,f,32),e[0]&=248,e[31]&=127,e[31]|=64;var D=x+64;for(c=0;c<x;c++)r[64+c]=t[c];for(c=0;c<32;c++)r[32+c]=e[32+c];for(lf(i,r.subarray(32),x+32),f0(i),Nf(v,i),Wf(r,v),c=32;c<64;c++)r[c]=f[c];for(lf(n,r,x+64),f0(n),c=0;c<64;c++)B[c]=0;for(c=0;c<32;c++)B[c]=i[c];for(c=0;c<32;c++)for(_=0;_<32;_++)B[c+_]+=n[c]*e[_];return kf(r.subarray(32),B),D}function Z0(r,t){var x=p(),f=p(),e=p(),n=p(),i=p(),c=p(),_=p();return bf(r[2],df),Jf(r[1],t),af(e,r[1]),I(n,e,V),hf(e,e,r[2]),of(n,r[2],n),af(i,n),af(c,i),I(_,c,i),I(x,_,e),I(x,x,n),y0(x,x),I(x,x,e),I(x,x,n),I(x,x,n),I(r[0],x,n),af(f,r[0]),I(f,f,n),u0(f,e)&&I(r[0],r[0],O0),af(f,r[0]),I(f,f,n),u0(f,e)?-1:(d0(r[0])===t[31]>>7&&hf(r[0],cf,r[0]),I(r[3],r[0],r[1]),0)}function r0(r,t,x,f){var e,n=new Uint8Array(32),i=new Uint8Array(64),c=[p(),p(),p(),p()],_=[p(),p(),p(),p()];if(x<64||Z0(_,f))return-1;for(e=0;e<x;e++)r[e]=t[e];for(e=0;e<32;e++)r[e+32]=f[e];if(lf(i,r,x),f0(i),Qf(c,_,i),Nf(_,t.subarray(32)),$f(c,_),Wf(n,c),x-=64,Df(t,0,n,0)){for(e=0;e<x;e++)r[e]=0;return-1}for(e=0;e<x;e++)r[e]=t[e+64];return x}var x0=32,Kf=24,Sf=32,Af=16,Yf=32,If=32,Mf=32,jf=32,t0=32,A0=Kf,F0=Sf,D0=Af,uf=64,wf=32,Uf=64,e0=32,a0=64;A.lowlevel={crypto_core_hsalsa20:Lf,crypto_stream_xor:Gf,crypto_stream:c0,crypto_stream_salsa20_xor:h0,crypto_stream_salsa20:s0,crypto_onetimeauth:Xf,crypto_onetimeauth_verify:b0,crypto_verify_16:o0,crypto_verify_32:Df,crypto_secretbox:Hf,crypto_secretbox_open:Vf,crypto_scalarmult:Rf,crypto_scalarmult_base:zf,crypto_box_beforenm:Of,crypto_box_afternm:l0,crypto_box:K0,crypto_box_open:I0,crypto_box_keypair:v0,crypto_hash:lf,crypto_sign:E0,crypto_sign_keypair:mf,crypto_sign_open:r0,crypto_secretbox_KEYBYTES:x0,crypto_secretbox_NONCEBYTES:Kf,crypto_secretbox_ZEROBYTES:Sf,crypto_secretbox_BOXZEROBYTES:Af,crypto_scalarmult_BYTES:Yf,crypto_scalarmult_SCALARBYTES:If,crypto_box_PUBLICKEYBYTES:Mf,crypto_box_SECRETKEYBYTES:jf,crypto_box_BEFORENMBYTES:t0,crypto_box_NONCEBYTES:A0,crypto_box_ZEROBYTES:F0,crypto_box_BOXZEROBYTES:D0,crypto_sign_BYTES:uf,crypto_sign_PUBLICKEYBYTES:wf,crypto_sign_SECRETKEYBYTES:Uf,crypto_sign_SEEDBYTES:e0,crypto_hash_BYTES:a0,gf:p,D:V,L:Pf,pack25519:Ef,unpack25519:Jf,M:I,A:of,S:af,Z:hf,pow2523:y0,add:$f,set25519:bf,modL:kf,scalarmult:Qf,scalarbase:Nf};function U0(r,t){if(r.length!==x0)throw new Error("bad key size");if(t.length!==Kf)throw new Error("bad nonce size")}function G0(r,t){if(r.length!==Mf)throw new Error("bad public key size");if(t.length!==jf)throw new Error("bad secret key size")}function tf(){for(var r=0;r<arguments.length;r++)if(!(arguments[r]instanceof Uint8Array))throw new TypeError("unexpected type, use Uint8Array")}function B0(r){for(var t=0;t<r.length;t++)r[t]=0}A.randomBytes=function(r){var t=new Uint8Array(r);return nf(t,r),t},A.secretbox=function(r,t,x){tf(r,t,x),U0(x,t);for(var f=new Uint8Array(Sf+r.length),e=new Uint8Array(f.length),n=0;n<r.length;n++)f[n+Sf]=r[n];return Hf(e,f,f.length,t,x),e.subarray(Af)},A.secretbox.open=function(r,t,x){tf(r,t,x),U0(x,t);for(var f=new Uint8Array(Af+r.length),e=new Uint8Array(f.length),n=0;n<r.length;n++)f[n+Af]=r[n];return f.length<32||Vf(e,f,f.length,t,x)!==0?null:e.subarray(Sf)},A.secretbox.keyLength=x0,A.secretbox.nonceLength=Kf,A.secretbox.overheadLength=Af,A.scalarMult=function(r,t){if(tf(r,t),r.length!==If)throw new Error("bad n size");if(t.length!==Yf)throw new Error("bad p size");var x=new Uint8Array(Yf);return Rf(x,r,t),x},A.scalarMult.base=function(r){if(tf(r),r.length!==If)throw new Error("bad n size");var t=new Uint8Array(Yf);return zf(t,r),t},A.scalarMult.scalarLength=If,A.scalarMult.groupElementLength=Yf,A.box=function(r,t,x,f){var e=A.box.before(x,f);return A.secretbox(r,t,e)},A.box.before=function(r,t){tf(r,t),G0(r,t);var x=new Uint8Array(t0);return Of(x,r,t),x},A.box.after=A.secretbox,A.box.open=function(r,t,x,f){var e=A.box.before(x,f);return A.secretbox.open(r,t,e)},A.box.open.after=A.secretbox.open,A.box.keyPair=function(){var r=new Uint8Array(Mf),t=new Uint8Array(jf);return v0(r,t),{publicKey:r,secretKey:t}},A.box.keyPair.fromSecretKey=function(r){if(tf(r),r.length!==jf)throw new Error("bad secret key size");var t=new Uint8Array(Mf);return zf(t,r),{publicKey:t,secretKey:new Uint8Array(r)}},A.box.publicKeyLength=Mf,A.box.secretKeyLength=jf,A.box.sharedKeyLength=t0,A.box.nonceLength=A0,A.box.overheadLength=A.secretbox.overheadLength,A.sign=function(r,t){if(tf(r,t),t.length!==Uf)throw new Error("bad secret key size");var x=new Uint8Array(uf+r.length);return E0(x,r,r.length,t),x},A.sign.open=function(r,t){if(tf(r,t),t.length!==wf)throw new Error("bad public key size");var x=new Uint8Array(r.length),f=r0(x,r,r.length,t);if(f<0)return null;for(var e=new Uint8Array(f),n=0;n<e.length;n++)e[n]=x[n];return e},A.sign.detached=function(r,t){for(var x=A.sign(r,t),f=new Uint8Array(uf),e=0;e<f.length;e++)f[e]=x[e];return f},A.sign.detached.verify=function(r,t,x){if(tf(r,t,x),t.length!==uf)throw new Error("bad signature size");if(x.length!==wf)throw new Error("bad public key size");var f=new Uint8Array(uf+r.length),e=new Uint8Array(uf+r.length),n;for(n=0;n<uf;n++)f[n]=t[n];for(n=0;n<r.length;n++)f[n+uf]=r[n];return r0(e,f,f.length,x)>=0},A.sign.keyPair=function(){var r=new Uint8Array(wf),t=new Uint8Array(Uf);return mf(r,t),{publicKey:r,secretKey:t}},A.sign.keyPair.fromSecretKey=function(r){if(tf(r),r.length!==Uf)throw new Error("bad secret key size");for(var t=new Uint8Array(wf),x=0;x<t.length;x++)t[x]=r[32+x];return{publicKey:t,secretKey:new Uint8Array(r)}},A.sign.keyPair.fromSeed=function(r){if(tf(r),r.length!==e0)throw new Error("bad seed size");for(var t=new Uint8Array(wf),x=new Uint8Array(Uf),f=0;f<32;f++)x[f]=r[f];return mf(t,x,!0),{publicKey:t,secretKey:x}},A.sign.publicKeyLength=wf,A.sign.secretKeyLength=Uf,A.sign.seedLength=e0,A.sign.signatureLength=uf,A.hash=function(r){tf(r);var t=new Uint8Array(a0);return lf(t,r,r.length),t},A.hash.hashLength=a0,A.verify=function(r,t){return tf(r,t),r.length===0||t.length===0||r.length!==t.length?!1:Ff(r,0,t,0,r.length)===0},A.setPRNG=function(r){nf=r},function(){var r=typeof self!="undefined"?self.crypto||self.msCrypto:null;if(r&&r.getRandomValues){var t=65536;A.setPRNG(function(x,f){var e,n=new Uint8Array(f);for(e=0;e<f;e+=t)r.getRandomValues(n.subarray(e,e+Math.min(f-e,t)));for(e=0;e<f;e++)x[e]=n[e];B0(n)})}else typeof x1!="undefined"&&(r=n1,r&&r.randomBytes&&A.setPRNG(function(x,f){var e,n=r.randomBytes(f);for(e=0;e<f;e++)x[e]=n[e];B0(n)}))}()})(sf.exports?sf.exports:self.nacl=self.nacl||{})})(z0);function i1(sf){return[...sf].map(A=>`0${A.toString(16).toUpperCase()}`.slice(-2)).join("")}function o1(){const{publicKey:sf,secretKey:A}=z0.exports.sign.keyPair();return[sf,A].map(p=>i1(p)).join("-")}function h1(sf){let A,p,nf,xf,yf,cf,df,pf;return xf=new t1({props:{lang:"text/plain",text:sf[0]}}),{c(){A=S0("h1"),p=Y0("New Cryptographic Identity:"),nf=M0(),q0(xf.$$.fragment),yf=M0(),cf=S0("p"),df=Y0("Be sure to keep it somewhere safe, like a password manager.")},l(V){A=j0(V,"H1",{});var ef=T0(A);p=L0(ef,"New Cryptographic Identity:"),ef.forEach(Bf),nf=C0(V),J0(xf.$$.fragment,V),yf=C0(V),cf=j0(V,"P",{});var _f=T0(cf);df=L0(_f,"Be sure to keep it somewhere safe, like a password manager."),_f.forEach(Bf)},m(V,ef){Zf(V,A,ef),R0(A,p),Zf(V,nf,ef),W0(xf,V,ef),Zf(V,yf,ef),Zf(V,cf,ef),R0(cf,df),pf=!0},p(V,[ef]){const _f={};ef&1&&(_f.text=V[0]),xf.$set(_f)},i(V){pf||(Q0(xf.$$.fragment,V),pf=!0)},o(V){m0(xf.$$.fragment,V),pf=!1},d(V){V&&Bf(A),V&&Bf(nf),k0(xf,V),V&&Bf(yf),V&&Bf(cf)}}}function s1(sf,A,p){const nf="Create Identity";let xf="Generating... (ensure javascript is enabled)";return f1(()=>{p(0,xf=o1())}),[xf,nf]}class d1 extends X0{constructor(A){super(),H0(this,A,s1,h1,V0,{title:1})}get title(){return this.$$.ctx[1]}}export{d1 as default};
