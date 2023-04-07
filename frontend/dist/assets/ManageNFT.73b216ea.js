import{A as p}from"./enums.eb3cf57a.js";import{f as N}from"./fieldValidations.55b02bef.js";import{d as E,h as r,v as M,s as h,_ as D,r as n,o as i,c as d,b as a,w as l,a as o,k as A,m as k,e as _,F as g,l as F,t as V,n as x}from"./index.f324766f.js";import{s as q}from"./themesUtil.c377a4d3.js";const I=E({name:"modal-create",props:{showModal:{required:!0,type:Boolean,default:!1},actionType:{required:!0,type:String,default:p.CREATE},nft:{required:!1,type:Object,default:null}},setup(){const t=r({name:"",pixelQuantity:10,themes:""}),e=[{text:"800",value:"10",id:"1"},{text:"1152",value:"12",id:"2"},{text:"1568",value:"14",id:"3"}];return{formData:t,fieldsValidations:N,validation:r(null),showModalToggle:r(!1),Type:p,options:e,option:r(e[0]),value:r(e[0])}},methods:{saveFormData(t){t&&(this.formData.pixelQuantity=Number(this.option.value),this.$store.commit(M.SET_FORM_DATA_NFT,this.formData),this.actionType===this.Type.CREATE?this.$store.dispatch(h.CREATE_NFT):this.$store.dispatch(h.UPDATE_NFT),this.showModalToggle=!1)},deletarNFT(){this.$store.commit(M.SET_FORM_DATA_NFT,this.formData),this.$store.dispatch(h.DELETE_NFT),this.showModalToggle=!1}},watch:{showModal(){this.showModalToggle=!0},nft(t){t&&(this.formData=t)}}}),S={class:"tw-flex tw-justify-between"},j={class:"tw-font-bold tw-text-xl"},R={key:0},Q={key:1},U={key:0,class:""},B=_(" Excluir "),L={class:"tw-w-full tw-max-w-2xl tw-mt-4"},O={class:"line tw-flex tw-w-full tw-mb-2"},z={class:"tw-w-1/2 tw-mx-1"},G={class:"tw-w-1/2 tw-mx-1"},P=o("div",{class:"line tw-flex tw-w-full tw-mb-2"},null,-1),H={class:"line tw-flex tw-w-full tw-mb-2"},J={class:"tw-w-1/2 tw-mx-1"},K=_(" Salvar "),W=_(" Cancelar ");function X(t,e,m,u,v,b){const w=n("va-button"),c=n("va-input"),T=n("va-select"),y=n("va-form"),f=n("va-modal");return i(),d("div",null,[a(f,{modelValue:t.showModalToggle,"onUpdate:modelValue":e[7]||(e[7]=s=>t.showModalToggle=s),"hide-default-actions":"","overlay-opacity":"0.2"},{header:l(()=>[o("div",S,[o("h2",j,[t.Type.EDIT===t.actionType?(i(),d("span",R,"Editar sorteio")):(i(),d("span",Q,"Criar sorteio"))]),t.Type.EDIT===t.actionType?(i(),d("div",U,[a(w,{color:"danger",onClick:e[0]||(e[0]=s=>t.deletarNFT())},{default:l(()=>[B]),_:1})])):A("",!0)])]),footer:l(()=>[a(w,{onClick:e[5]||(e[5]=s=>t.saveFormData(t.$refs.form.validate()))},{default:l(()=>[K]),_:1}),a(w,{class:"tw-ml-2",onClick:e[6]||(e[6]=s=>t.showModalToggle=!1),outline:""},{default:l(()=>[W]),_:1})]),default:l(()=>[k(t.$slots,"default",{},()=>[o("div",L,[a(y,{ref:"form",onValidation:e[4]||(e[4]=s=>t.validation=s)},{default:l(()=>[o("div",O,[o("div",z,[o("div",null,[a(c,{modelValue:t.formData.name,"onUpdate:modelValue":e[1]||(e[1]=s=>t.formData.name=s),type:"text",label:"Nome",rules:[t.fieldsValidations.required]},null,8,["modelValue","rules"])])]),o("div",G,[a(T,{modelValue:t.option,"onUpdate:modelValue":e[2]||(e[2]=s=>t.option=s),class:"mb-6",label:"Quantidade de pixels",options:t.options,"track-by":"id"},null,8,["modelValue","options"])])]),P,o("div",H,[o("div",J,[a(c,{modelValue:t.formData.themes,"onUpdate:modelValue":e[3]||(e[3]=s=>t.formData.themes=s),type:"text",label:"Tema",rules:t.fieldsValidations.required},null,8,["modelValue","rules"])])])]),_:1},512)])])]),_:3},8,["modelValue"])])}var Y=D(I,[["render",X]]);const Z=E({name:"ManageNFT",components:{ModalForm:Y},setup(){return{formData:r(),actionType:r(p.CREATE),showModalForm:r(!1)}},mounted(){var t;if(this.$store.dispatch(h.GET_NFT_LIST),(t=this.$route.query)!=null&&t.nftId){const e=this.$route.query.nftId,m=this.nfts.find(u=>u._id===e);m&&this.openEditModal(m)}},computed:{nfts(){return this.$store.state.NFTModule.nftSummaryList}},watch:{nfts(t){var e;if(t&&(t==null?void 0:t.length)>0&&(e=this.$route.query)!=null&&e.nftId){const m=this.$route.query.nftId,u=this.nfts.find(v=>v._id===m);u&&this.openEditModal(u),this.$router.replace({query:{}})}}},methods:{openModalCreate(){this.changeActionType(p.CREATE),this.showModalForm=!this.showModalForm,this.formData={}},openEditModal(t){this.formData={_id:t._id,name:t.name,themes:t.themes,pixelQuantity:t.pixelQuantity},this.changeActionType(p.EDIT),this.showModalForm=!this.showModalForm},changeActionType(t){this.actionType=t},stringToArray:q}}),tt={class:"tw-flex tw-justify-start tw-items-center w-full"},et={class:"tw-w-full"},ot={class:"section"},st={class:"tw-w-full tw-flex tw-justify-start tw-items-center tw-mb-3 tw-ml-5"},at=_("Criar novo NFT"),lt={class:"tw-flex tw-justify-start tw-flex-wrap tw-m-auto"},nt={class:"tw-w-full"},it={class:"tw-text-xl tw-font-bold tw-text-center"},dt=o("div",null,"NFT",-1),rt={class:"tw-flex tw-justify-between tw-w-full tw-flex-wrap tw-m-auto tw-max-w-[200px]"};function mt(t,e,m,u,v,b){const w=n("va-button"),c=n("va-card-content"),T=n("va-card"),y=n("ModalForm");return i(),d("div",tt,[o("div",et,[o("div",ot,[o("div",st,[a(w,{class:"tw-w-52",size:"large",onClick:e[0]||(e[0]=f=>t.openModalCreate())},{default:l(()=>[at]),_:1})]),o("div",lt,[(i(!0),d(g,null,F(t.nfts,(f,s)=>(i(),d("div",{key:s,class:"tw-max-w-sm tw-w-full tw-flex tw-justify-center tw-items-center tw-m-5 tw-cursor-pointer"},[a(T,{onClick:$=>t.openEditModal(f),class:"tw-w-full"},{default:l(()=>[a(c,null,{default:l(()=>[o("div",nt,[o("div",it,V(f.name),1),dt,o("div",rt,[(i(!0),d(g,null,F(t.stringToArray(f.themes),($,C)=>(i(),d("div",{key:C},[o("div",{style:x(`background-color: #${$};`),class:"tw-h-8 tw-w-8 tw-m-1 tw-mt-2"},null,4)]))),128))])])]),_:2},1024)]),_:2},1032,["onClick"])]))),128))])])]),a(y,{showModal:t.showModalForm,actionType:t.actionType,nft:t.formData},null,8,["showModal","actionType","nft"])])}var ct=D(Z,[["render",mt]]);export{ct as default};