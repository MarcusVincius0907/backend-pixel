import{d as h,_ as m,r as i,o as e,g as r,w,b as y,c as o,a as t,F as u,l as x,t as c,n as v,k as b,e as g}from"./index.b5ed19d5.js";const B=h({name:"pixel-sum-card",props:{pixels:{type:Array,required:!0},sortitionId:String,hideBuyButton:{type:Boolean,default:!0}},methods:{onBuyPixel(){this.$emit("onBuyPixel")}}}),k={key:0,class:"tw-bg-white tw-w-full tw-p-3 tw-py-5 tw-rounded-md"},$={class:"tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-th-blue tw-py-2"},j=t("h3",{class:"tw-text-2xl tw-font-bold tw-text-center"},"Pixel(s) Selecionado(s):",-1),C={class:"tw-flex tw-flex-wrap tw-justify-center"},P={class:"tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-th-blue tw-py-2"},S=t("h3",{class:"tw-text-2xl tw-font-bold"},"Cor(es):",-1),V={class:"tw-flex tw-flex-wrap"},q={class:"tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-th-blue tw-py-2"},N=t("h3",{class:"tw-text-2xl tw-font-bold"},"Quantidade:",-1),z={class:"tw-font-bold tw-text-xl tw-mt-2 tw-rounded-full tw-p-1 bg-th-green tw-h-8 tw-w-8 tw-flex tw-justify-center tw-items-center"},A={class:"tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-th-blue tw-py-2"},E=t("h3",{class:"tw-text-2xl tw-font-bold"},"Total:",-1),F={class:"tw-font-bold tw-text-3xl tw-pt-2"},T={class:"tw-flex tw-justify-center tw-mt-4"},D=g(" Comprar agora "),I={key:1,class:"tw-bg-white tw-w-full tw-flex tw-flex-col tw-justify-center tw-p-3 tw-py-5 tw-rounded-md"},L=t("h3",{class:"tw-text-2xl tw-font-bold tw-text-center"},"Selecione seus pixels!",-1),Q=t("div",{class:"tw-font-bold tw-text-md tw-pt-4"}," Voc\xEA pode selecionar um pixel clicando em qualquer quadrado e definindo a cor. ",-1),R=[L,Q];function G(s,d,H,J,K,M){const _=i("va-button"),f=i("va-card-content"),p=i("va-card");return e(),r(p,null,{default:w(()=>[y(f,null,{default:w(()=>{var a;return[((a=s.pixels)==null?void 0:a.length)>0?(e(),o("div",k,[t("div",$,[j,t("div",C,[(e(!0),o(u,null,x(s.pixels,(l,n)=>(e(),o("div",{key:n,class:"tw-font-bold tw-text-xl tw-pt-2 tw-m-1"},c(`#${l.uuid.substring(0,4)}`),1))),128))])]),t("div",P,[S,t("div",V,[(e(!0),o(u,null,x(s.pixels,(l,n)=>(e(),o("div",{key:n,style:v(`background-color: ${l.color};`),class:"tw-h-8 tw-w-8 tw-m-1 tw-mt-2"},null,4))),128))])]),t("div",q,[N,t("div",z,c(s.pixels.length),1)]),t("div",A,[E,t("div",F,"R$ "+c(s.pixels.length+",00"),1)]),t("div",T,[s.hideBuyButton?b("",!0):(e(),r(_,{key:0,onClick:d[0]||(d[0]=l=>s.onBuyPixel()),size:"large"},{default:w(()=>[D]),_:1}))])])):(e(),o("div",I,R))]}),_:1})]),_:1})}var U=m(B,[["render",G]]);export{U as P};
