class OfEmbed{callback=()=>{};devMode=false;token=null;sistema=null;tipo=null;stackId=null;user=null;hash=null;endPointBack="https://of.pantanaltec.com.br";endPointFront="https://of.pantanaltec.com.br";setSistema=sistema=>this.sistema=sistema;setToken=token=>this.token=token;setDevMode=devMode=>{this.devMode=devMode;if(this.devMode){this.endPointBack="http://localhost:3000";this.endPointFront="http://localhost:8080"}else{this.endPointBack="https://of.pantanaltec.com.br";this.endPointFront="https://of.pantanaltec.com.br"}};addModal(src){const modalBackground=document.createElement("div");modalBackground.classList.add("modal-background");const modalContent=document.createElement("div");modalContent.classList.add("modal-content");const iframe=document.createElement("iframe");iframe.classList.add("modal-iframe");const url=this.endPointFront+src;console.log(url);iframe.src=url;modalContent.appendChild(iframe);modalBackground.appendChild(modalContent);document.body.appendChild(modalBackground);modalBackground.addEventListener("click",()=>this.closeModal(modalBackground));modalBackground.style.display="block";return modalBackground}closeModal(modal){modal.style.display="none";setTimeout(()=>{document.body.removeChild(modal);modal=undefined},1e3);try{this.callback()}catch(error){}}validacaoFornecedor(layout,transacoes,callback=el=>true,DocAdd){this.callback=callback;const transacoesJoined=transacoes.join(",");const docAddJson=JSON.stringify(DocAdd);const modal=this.addModal(`/#/API/${this.sistema}/validacaoFornecedor/${layout}/${transacoesJoined}/${this.token}/${btoa(docAddJson)}`);window.addEventListener("message",event=>{console.log("message FROM",event.origin,this.endPointFront,this.endPointFront==event.origin);if(event.origin!==this.endPointFront){return}console.log("Mensagem recebida:",event.data,event.data=="OK");if(event.data=="OK"){this.closeModal(modal);callback()}else{alert(event.data)}},false)}getTransacoesDocStatus(transacoes,callback=el=>true){return new Promise((resolve,reject)=>{const header=new Headers;header.append("Content-Type","application/json;charset=UTF-8");header.append("Access-Control-Allow-Origin","*");header.append("x-access-token",this.token);let data={layout:this.layout,sistema:this.sistema,transacoes:transacoes};const init={body:JSON.stringify(data),method:"POST",headers:header,mode:"cors",cache:"default"};fetch(this.endPointBack+"/loadRelatorioTransacoesDataAPI",init).then(async function(res){const data=await res.json();const result={};data?.transacoes?.forEach(element=>{if(!result[element.produtoId])result[element.produtoId]={};result[element.produtoId][element.id]=element.nfId?element.docs:false});resolve(result)}).catch(e=>reject(e))})}}