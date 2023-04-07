import{A as p}from"./enums.eb3cf57a.js";import{d as M,h as d,u as $,f as w,M as N,_ as E,r as i,o as m,c as u,b as a,w as l,a as e,k as b,m as V,e as h,s as A}from"./index.f324766f.js";import{h as S}from"./moment.9709ab41.js";import{S as C}from"./SortitionList.9f23fa19.js";const O=M({name:"modal-create",props:{showModal:{required:!0,type:Boolean,default:!1},actionType:{required:!0,type:String,default:p.CREATE},sortition:{required:!1,type:Object,default:null}},setup(){return{formData:d({name:"",date:"",idNFTSummary:"",reward:"",status:!1}),fieldsValidations:{required:[n=>!!n&&n.length>0||"Campo \xE9 requirido"]},validation:d(null),showModalToggle:d(!1),Type:p}},methods:{saveFormData(t){var o,n,c;if(t){const T={...this.actionType===this.Type.EDIT&&{_id:this.formData._id},name:this.formData.name,status:this.formData.status,reward:this.formData.reward,date:S(this.formData.date).format("yyyy-MM-DD"),idNFTSummary:(c=(n=(o=this.formData.idNFTSummary)==null?void 0:o.value)!=null?n:this.formData.idNFTSummary)!=null?c:""};this.$store.commit($.SET_FORM_DATA_SORTITION,T),this.actionType===this.Type.CREATE?this.$store.dispatch(w.CREATE_SORTITION):this.$store.dispatch(w.UPDATE_SORTITION),this.showModalToggle=!1}else this.$store.commit(N.SET_NOTIFICATION,{title:"Erro",message:"Dados inv\xE1lidos",color:"danger"})},deleteSortition(){this.$store.commit($.SET_FORM_DATA_SORTITION,this.formData),this.$store.dispatch(w.DELETE_SORTITION),this.showModalToggle=!1}},watch:{showModal(t,o){this.showModalToggle=!0},sortition(t){if(t&&(this.formData=t),t!=null&&t.idNFTSummary){const o=this.options.find(n=>this.formData.idNFTSummary===n.value);this.formData.idNFTSummary=o}}},computed:{options(){return this.actionType===this.Type.EDIT?this.$store.state.NFTModule.nftSummaryIdList.map(t=>({text:`${t.name} - ${t.id.substring(0,3)}...`,value:t.id,id:t.id,name:t.name})):this.$store.state.NFTModule.nftSummaryIdList.map(t=>({text:`${t.name} - ${t.id.substring(0,3)}...`,vinculated:t.vinculated,value:t.id,id:t.id,name:t.name})).filter(t=>!t.vinculated)}}}),I={class:"tw-flex tw-justify-between"},R={class:"tw-font-bold tw-text-xl"},k={key:0},L={key:1},q={key:0,class:""},U=h(" Excluir "),j={class:"tw-w-full tw-max-w-2xl tw-mt-4"},x={class:"line tw-flex tw-w-full tw-mb-2"},B={class:"tw-w-1/2 tw-mx-1"},G={class:"tw-w-1/2 tw-mx-1 tw-mb-2"},P={class:"line tw-flex tw-w-full tw-mb-2"},z={class:"tw-w-1/2 tw-mx-1"},Y={class:"tw-w-1/2 tw-mx-1"},H={class:"line"},J={class:"tw-w-1/2 tw-mx-1"},K=h(" Salvar "),Q=h(" Cancelar ");function W(t,o,n,c,T,g){const r=i("va-button"),f=i("va-input"),_=i("va-select"),v=i("va-date-input"),y=i("va-switch"),D=i("va-form"),F=i("va-modal");return m(),u("div",null,[a(F,{modelValue:t.showModalToggle,"onUpdate:modelValue":o[9]||(o[9]=s=>t.showModalToggle=s),"hide-default-actions":"","overlay-opacity":"0.2"},{header:l(()=>[e("div",I,[e("h2",R,[t.Type.EDIT===t.actionType?(m(),u("span",k,"Editar sorteio")):(m(),u("span",L,"Criar sorteio"))]),t.Type.EDIT===t.actionType?(m(),u("div",q,[a(r,{color:"danger",onClick:o[0]||(o[0]=s=>t.deleteSortition())},{default:l(()=>[U]),_:1})])):b("",!0)])]),footer:l(()=>[a(r,{onClick:o[7]||(o[7]=s=>t.saveFormData(t.$refs.form.validate()))},{default:l(()=>[K]),_:1}),a(r,{class:"tw-ml-2",onClick:o[8]||(o[8]=s=>t.showModalToggle=!1),outline:""},{default:l(()=>[Q]),_:1})]),default:l(()=>[V(t.$slots,"default",{},()=>[e("div",j,[a(D,{ref:"form",onValidation:o[6]||(o[6]=s=>t.validation=s)},{default:l(()=>[e("div",x,[e("div",B,[e("div",null,[a(f,{modelValue:t.formData.name,"onUpdate:modelValue":o[1]||(o[1]=s=>t.formData.name=s),type:"text",label:"Nome",rules:[t.fieldsValidations.required]},null,8,["modelValue","rules"])])]),e("div",G,[a(_,{modelValue:t.formData.idNFTSummary,"onUpdate:modelValue":o[2]||(o[2]=s=>t.formData.idNFTSummary=s),class:"mb-6",label:"id NFT",options:t.options,"track-by":"id"},null,8,["modelValue","options"])])]),e("div",P,[e("div",z,[a(v,{modelValue:t.formData.date,"onUpdate:modelValue":o[3]||(o[3]=s=>t.formData.date=s),label:"Data do sorteio"},null,8,["modelValue"])]),e("div",Y,[a(f,{modelValue:t.formData.reward,"onUpdate:modelValue":o[4]||(o[4]=s=>t.formData.reward=s),rules:t.fieldsValidations.required,type:"text",label:"Premia\xE7\xE3o"},null,8,["modelValue","rules"])])]),e("div",H,[e("div",J,[a(y,{modelValue:t.formData.status,"onUpdate:modelValue":o[5]||(o[5]=s=>t.formData.status=s),"true-inner-label":"Aberto","false-inner-label":"Fechado",class:"mr-4"},null,8,["modelValue"])])])]),_:1},512)])])]),_:3},8,["modelValue"])])}var X=E(O,[["render",W]]);const Z=M({name:"sortition",components:{ModalForm:X,SortitionList:C},setup(){return{moment:S,formData:d(),actionType:d(p.CREATE),showModalForm:d(!1)}},mounted(){this.$store.dispatch(A.GET_NFT_SUMMARY_ID_LIST),this.$store.dispatch(w.GET_SORTITION_LIST)},methods:{openModalCreate(){this.changeActionType(p.CREATE),this.showModalForm=!this.showModalForm,this.formData={}},openEditModal(t){this.formData={...t,date:new Date(t.date)},this.changeActionType(p.EDIT),this.showModalForm=!this.showModalForm},changeActionType(t){this.actionType=t},goToNFT(t){this.$router.push({name:"NFT",query:{nftId:t}})}},computed:{sortitions(){return this.$store.state.SortitionModule.sortitionList}}}),tt={class:"tw-flex tw-justify-center tw-items-center w-full"},ot={class:"tw-max-w-2xl tw-w-full"},et={class:"section mb-5"},st=e("div",{class:"tw-flex tw-justify-center tw-items-center tw-min-h-[100px]"},[e("div",{class:"tw-text-center"},[e("h1",{class:"tw-text-xl tw-mb-3 tw-font-bold"},"Sorteios")])],-1),at={class:"section"},it={class:"tw-w-full tw-flex tw-justify-center tw-items-center tw-mb-3"},lt=h("Criar novo sorteio"),nt={class:"tw-grid tw-justify-center tw-grid-cols-1 tw-grid-rows-1 md:tw-grid-cols-2 md:tw-grid-rows-2 tw-gap-2"};function dt(t,o,n,c,T,g){const r=i("va-card-content"),f=i("va-card"),_=i("va-button"),v=i("SortitionList"),y=i("ModalForm");return m(),u("div",tt,[e("div",ot,[e("div",et,[a(f,null,{default:l(()=>[a(r,null,{default:l(()=>[st]),_:1})]),_:1})]),e("div",at,[e("div",it,[a(_,{class:"tw-w-full",size:"large",onClick:o[0]||(o[0]=D=>t.openModalCreate())},{default:l(()=>[lt]),_:1})]),e("div",nt,[a(v,{sortitions:t.sortitions,adminVisibilityAccess:!0,onOpenEditModal:t.openEditModal},null,8,["sortitions","onOpenEditModal"])])])]),a(y,{showModal:t.showModalForm,actionType:t.actionType,sortition:t.formData},null,8,["showModal","actionType","sortition"])])}var ct=E(Z,[["render",dt]]);export{ct as default};