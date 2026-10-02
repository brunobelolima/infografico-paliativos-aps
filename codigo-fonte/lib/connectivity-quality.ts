import type {NetworkInputs,rankPlatforms} from './platform-compatibility';
type Ranking=ReturnType<typeof rankPlatforms>;
export function connectivityQuality(i:NetworkInputs,s:Ranking,live=true){
 const teaching='Ensino: texto, quizzes e arquivos leves dependem do tamanho dos materiais e do servidor; testar login, envio de tarefas e download no celular. Vídeos gravados exigem avaliação própria do tamanho e da taxa de transmissão. Não há um limite único de Mbps adotado para o AVA.';
 if(!s.measured)return {level:'pending',label:'Não classificável',detail:'Habilite uma referência municipal válida para avaliar a adequação de banda.',teaching,method:'Sem referência de download e upload utilizável.'};
 if(!live)return {level:'async',label:'Avaliação pelo conteúdo assíncrono',detail:'Sem encontros ao vivo previstos. Validar acesso ao AVA e transferência dos materiais; a média municipal isolada não define a adequação do curso.',teaching,method:'Sem aplicação de limites de videoconferência à oferta exclusivamente assíncrona.'};
 if(!i.meetingResources)return {level:'pending',label:'Recursos dos encontros pendentes',detail:'Selecione os recursos necessários para classificar a banda municipal em relação ao uso planejado.',teaching,method:'A classificação depende do perfil de uso.'};
 const mode=i.meetingResources==='audio'?'audio':'video';
 let candidates=s.rows.filter(p=>p.id.endsWith('-'+mode));
 if(i.conferenceExisting&&i.conferenceExisting!=='none'&&i.conferenceExisting!=='unknown')candidates=candidates.filter(p=>p.id.startsWith(i.conferenceExisting+'-'));
 else candidates=candidates.filter(p=>p.platform!=='BigBlueButton');
 if(!candidates.length)return {level:'pending',label:'Perfil sem referência integrada',detail:'Não há perfil numérico integrado para a plataforma e os recursos escolhidos. Validar na documentação do serviço.',teaching,method:'Sem extrapolar requisitos de vídeo para áudio.'};
 const scored=candidates.map(p=>({...p,ratio:Math.min(s.perUp!/p.up,s.perDown!/p.down)})).sort((a,b)=>b.ratio-a.ratio);
 const p=scored[0],ratio=p.ratio;
 const level=ratio>=2?'margin':ratio>=1?'adequate':ratio>=0.5?'restricted':'insufficient';
 const label={margin:'Atende com margem de banda',adequate:'Atende à referência de banda',restricted:'Abaixo da referência de banda',insufficient:'Muito abaixo da referência de banda'}[level];
 const action=ratio>=2?'Há margem para o perfil comparado; confirmar estabilidade no local.':ratio>=1?'A referência é atendida com margem limitada; testar no horário do curso.':mode==='video'?'Adaptar os encontros para áudio ou reduzir recursos e validar localmente.':'Priorizar materiais leves, download prévio e alternativas assíncronas.';
 return {level,label,detail:`${p.platform} · ${p.usage}: referência de download ${p.down} Mbps e upload ${p.up} Mbps por dispositivo. ${action}`,teaching,method:`Escala de planejamento deste fluxo, não classificação oficial da Anatel: menor razão entre banda disponível e referência (upload e download). ≥2: com margem; ≥1 e <2: atende; ≥0,5 e <1: abaixo; <0,5: muito abaixo. ${i.conferenceExisting&&i.conferenceExisting!=='none'&&i.conferenceExisting!=='unknown'?'Perfil da plataforma existente.':'Sem plataforma definida, usa o perfil com maior margem entre as opções comparadas; não comprova compatibilidade com todas.'} Não mede latência, jitter, perda de pacotes, estabilidade, franquia ou capacidade do servidor. Gravação e salas simultâneas também exigem validação de licença e infraestrutura.`};
}
