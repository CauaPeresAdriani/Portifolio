(function(){
var r=document.documentElement,$=function(i){return document.getElementById(i)};
try{var t=localStorage.getItem('theme');if(t)r.setAttribute('data-theme',t)}catch(e){}
$('th').onclick=function(){var c=r.getAttribute('data-theme'),d=c?c==='dark':matchMedia('(prefers-color-scheme:dark)').matches,n=d?'light':'dark';r.setAttribute('data-theme',n);try{localStorage.setItem('theme',n)}catch(e){}};
/* hero blur-in words */
var h=$('h1'),i=0;function wrap(n){Array.prototype.slice.call(n.childNodes).forEach(function(c){if(c.nodeType===3){var f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(function(p){if(!p)return;if(/^\s+$/.test(p)){f.appendChild(document.createTextNode(' '));return}var s=document.createElement('span');s.className='wd';s.style.animationDelay=(i++*.08)+'s';s.textContent=p;f.appendChild(s)});n.replaceChild(f,c)}else wrap(c)})}wrap(h);
/* marquee */
var T=["Java","Spring Boot","MySQL","SQL","Python","PHP","C#","HTML5","CSS3","JavaScript","Git","GitHub"],mt=$('mt');mt.innerHTML=T.concat(T).map(function(x){return'<span>'+x+'</span>'}).join('');
/* spotlight + magic cards */
var sp=$('spot');addEventListener('pointermove',function(e){sp.style.left=e.clientX+'px';sp.style.top=e.clientY+'px'});
document.querySelectorAll('.c').forEach(function(c){c.addEventListener('pointermove',function(e){var b=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-b.left+'px');c.style.setProperty('--my',e.clientY-b.top+'px')})});
/* scroll reveal */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');e.target.querySelectorAll('[data-w]').forEach(function(b){b.style.width=b.dataset.w+'%'});io.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll('.rv').forEach(function(s){io.observe(s)});
/* chat */
var K=[
["Qual sua stack?",/stack|tecnolog|skills?|domina|quais linguagens|linguagens que/,"Java é meu foco, com Spring Boot e desenvolvimento back-end em estudo. Também uso SQL/MySQL, Python, PHP, C#, HTML, CSS, JavaScript e Git/GitHub."],
["Quais seus projetos?",/projet|portf[óo]lio|fez|constru/,"Tenho 3 projetos: Gestão Shop (desktop em Java com MySQL), o ClinSecure (projeto acadêmico em Django e MySQL) e este portfólio. Todos no GitHub."],
["O que é o Gestão Shop?",/gest[ãa]o|shop|swing|desktop/,"É um sistema desktop em Java (Swing + MySQL) para gerenciar produtos, clientes e vendas."],
["O que é o ClinSecure?",/clinsecure|djang|pesquisa cl[ií]nica|consentimento/,"ClinSecure é um projeto acadêmico em Django e MySQL que auxilia na gestão de pesquisas clínicas e no consentimento dos participantes, focado em privacidade e controle de acesso."],
["Fale sobre Spring Boot",/spring/,"É um framework Java usado para construir aplicações back-end, com suporte a rotas, injeção de dependências e integração com bancos de dados via MySQL."],
["Onde você estuda?",/estuda\s+onde|onde\s+(você\s+)?estuda|faculdade|forma[çc][ãa]o|curso|univers|umc|mogi|gradua/,"Sistemas de Informação na Universidade de Mogi das Cruzes, de 2024 a 2027 (previsão)."],
["Quando começou a programar?",/come[çc]ou|in[ií]cio|quando.*program|desde/,"Comecei em 2024, com estudos independentes de Web (HTML, CSS, JavaScript, Git e GitHub) junto com a faculdade."],
["O que está estudando?",/estudando|aprendendo|agora|atual/,"Hoje o foco é Java e Spring Boot, além de JavaScript e SQL. Depois quero Docker, AWS e microsserviços."],
["Qual seu objetivo?",/objetivo|meta|sonho|futuro|plano|carreira|trabalhar com|quer ser|quais "\w+"|qual a "\w+"/,"Conquistar minha primeira vaga como Desenvolvedor Back-end Java, me especializar em Spring Boot e depois aprender cloud."],
["Está disponível?",/dispon|vaga|est[áa]gio|freela|contrat|oportunidade|emprego/,"Sim! Estou disponível para estágio, freelancer e desenvolvimento Back-end."],
["Trabalha com front-end?",/front|html|css|javascript|\bjs\b|design/,"Sim, uso HTML, CSS e JavaScript para criar páginas semânticas, responsivas e acessíveis, como este portfólio."],
["Usa banco de dados?",/banco de dados|mysql|sql|database|dados/,"Sim, uso SQL e MySQL para modelagem de dados e consultas, nos meus projetos em Java."],
["Sabe Python, PHP ou C#?",/python|php|c#|csharp|outras? \blinguagens/,"Já usei Python (automação e scripts de dados), PHP (server-side com bancos relacionais) e C# (orientação a objetos)."],
["Já usou Git e GitHub?",/git|github|versiona|reposit/,"Sim, uso Git e GitHub no dia a dia para versionar e organizar meus projetos."],
["Vai aprender cloud?",/cloud|docker|aws|microsserv|nuvem/,"Está nos meus planos: Docker, AWS e microsserviços, depois de me aprofundar em Java e Spring Boot."],
["Como contatar?",/contat|email|e-mail|whats|linkedin|falar|telefone|chamar/,"Email: cauaperesacademico@gmail.com. Também pelo WhatsApp, LinkedIn e GitHub (seção Contato)."]
];
var D="Não tenho essa resposta aqui. Tente uma das sugestões ou fale comigo pelo email ou LinkedIn!";
var ms=$('ms'),qs=$('qs'),ch=$('chat'),fab=$('fab'),ip=$('ip');
function add(x,c){var d=document.createElement('div');d.className='m '+c;d.textContent=x;ms.appendChild(d);ms.scrollTop=ms.scrollHeight;return d}
function ans(q){var s=q.toLowerCase();for(var j=0;j<K.length;j++)if(K[j][1].test(s))return K[j][2];return D}
// Seleciona a URL do Worker de acordo com o ambiente (dev ou produção)
const prodURL = 'https://portfolio-caua-chatbot.cauaperesacademico.workers.dev/api/chat';
const devURL = 'http://127.0.0.1:8787/api/chat';
const CHAT_URL = location.hostname === 'cauaperesadriani.github.io' ? prodURL : devURL;
let isProcessing=false; // impede envios concorrentes
async function ask(q){
  q=q.trim();
  if(!q||isProcessing) return; // ignora vazios ou chamadas simultâneas
  isProcessing=true;
  add(q,'u');
  const typing=document.createElement('div');
  typing.className='m a ty';
  typing.innerHTML='\u003ci\u003e\u003c/i\u003e\u003ci\u003e\u003c/i\u003e\u003ci\u003e\u003c/i\u003e';
  ms.appendChild(typing);
  ms.scrollTop=ms.scrollHeight;
  try{
    const response=await fetch(CHAT_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:q})});
    const data=await response.json();
    if(!response.ok) throw new Error(data.error||'Falha no serviço do assistente');
    if(!data.answer) throw new Error('Resposta vazia');
    typing.remove();
    add(data.answer,'a');
  }catch(error){
    console.error('Erro no chatbot:',error.message);
    typing.remove();
    const fallback=ans(q);
    const msg=fallback===D?'O assistente de IA está temporariamente indisponível. Tente uma sugestão ou fale comigo pelo email ou LinkedIn.':fallback;
    add(msg,'a');
  }finally{
    isProcessing=false;
  }
}
K.forEach(function(k){var b=document.createElement('button');b.textContent=k[0];b.onclick=function(){ask(k[0])};qs.appendChild(b)});
$('sd').onclick=function(){ask(ip.value);ip.value=''};ip.onkeydown=function(e){if(e.key==='Enter'){ask(ip.value);ip.value=''}};
add("Oi! Sou o assistente do Cauã. Pergunte sobre stack, projetos, formação, objetivos ou contato. Use as sugestões abaixo (deslize para o lado) ou digite.",'a');
function tog(){fab.setAttribute('aria-expanded',ch.classList.toggle('o'))}
fab.onclick=tog;$('open').onclick=function(){if(!ch.classList.contains('o'))tog()};
})();
