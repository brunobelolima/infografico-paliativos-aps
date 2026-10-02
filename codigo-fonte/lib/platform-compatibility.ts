import {visibleRequirements,type PlatformRequirements} from './platform-requirements';
export type NetworkInputs=Partial<PlatformRequirements> & {download:string;upload:string;devices:string;local:string;measurementSource?:string;measurementDate?:string;measurementPlace?:string};
export const profiles=[
 {id:'webex-video',platform:'Webex',usage:'Vídeo HD · referência de consumo máximo',up:3,down:2.5,detail:'Consumo máximo publicado para envio e recepção de vídeo HD; tela, áudio e câmeras adicionais alteram o uso.',url:'https://help.webex.com/en-us/article/WBX22158/Webex-Meetings-Bandwidth-Requirements'},
 {id:'bbb-video',platform:'BigBlueButton',usage:'Cliente aluno · referência básica',up:0.5,down:1,detail:'Referência básica por aluno; não equivale a reunião HD com múltiplas câmeras. Validar apresentador, servidor e quantidade de câmeras.',url:'https://docs.bigbluebutton.org/support/faq/'},
 {id:'bbb-audio',platform:'BigBlueButton',usage:'Cliente básico · uso com câmera desligada',up:0.5,down:1,detail:'Usamos a referência básica do cliente, sem presumir que o consumo isolado de VoIP cubra todo o acesso à sala.',url:'https://docs.bigbluebutton.org/support/faq/'},
 {id:'teams-video',platform:'Microsoft Teams',usage:'Vídeo em reunião · referência recomendada',up:2.5,down:4,detail:'Referência da Microsoft por dispositivo; cenário de reunião, não chamada individual.',url:'https://learn.microsoft.com/en-us/microsoftteams/prepare-network'},
 {id:'meet-video',platform:'Google Meet',usage:'Vídeo 720p em grupo · perfil de planejamento',up:1.7,down:4,detail:'Envio de até 1,7 Mbps para 720p; recepção em grupo de até 4 Mbps. Perfil combinado para planejamento.',url:'https://knowledge.workspace.google.com/admin/meet/prepare-your-network-for-meet-meetings-and-live-streams'},
 {id:'zoom-video',platform:'Zoom',usage:'Vídeo em grupo 720p · referência recomendada',up:2.6,down:1.8,detail:'Reunião em grupo 720p. Galeria, resolução e recursos adicionais alteram o consumo.',url:'https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060748'},
 {id:'teams-audio',platform:'Microsoft Teams',usage:'Somente áudio · referência recomendada',up:0.058,down:0.058,detail:'58 kbps por direção, sem vídeo. Compartilhamento de tela consome banda adicional.',url:'https://learn.microsoft.com/en-us/microsoftteams/prepare-network'},
 {id:'meet-audio',platform:'Google Meet',usage:'Somente áudio · perfil para indivíduos',up:0.1,down:0.1,detail:'100 kbps por direção. Referência para indivíduos ou organizações pequenas.',url:'https://knowledge.workspace.google.com/admin/meet/prepare-your-network-for-meet-meetings-and-live-streams'},
 {id:'zoom-audio',platform:'Zoom',usage:'Somente áudio · limite superior da faixa publicada',up:0.08,down:0.08,detail:'VoIP: faixa de 60–80 kbps; a comparação usa 80 kbps, sem vídeo nem tela.',url:'https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060748'}
];
export function networkNumber(text:string){if(!text.trim())return null;const n=Number(text.trim().replace(',','.'));return Number.isFinite(n)&&n>=0?n:null}
export function assessPlatforms(i:NetworkInputs){
 const upload=networkNumber(i.upload),download=networkNumber(i.download),devices=networkNumber(i.devices);
 const invalid=(i.upload.trim()!==''&&upload===null)||(i.download.trim()!==''&&download===null)||(i.devices.trim()!==''&&(devices===null||devices<=0||!Number.isInteger(devices)));
 const numeric=!invalid&&upload!==null&&download!==null&&devices!==null;
 const municipal=i.measurementSource==='anatel-municipal';
 const documented=municipal||(i.measurementSource==='esa-web'||i.measurementSource==='esa-app')&&!!i.measurementDate?.trim()&&!!i.measurementPlace?.trim();
 const measured=numeric&&documented;
 const perUp=measured?upload!/(municipal?1:devices!):null,perDown=measured?download!/(municipal?1:devices!):null;
 return {municipal,invalid,numeric,documented,measured,perUp,perDown,rows:profiles.map(p=>{
  const meets=measured?perUp!>=p.up&&perDown!>=p.down:null;
  const status=municipal&&measured?(meets?'Média municipal atende; validar localmente':'Média municipal abaixo da referência'):invalid?'Corrigir medição':!measured?(numeric?'Registrar fonte, data e unidade':'Medição pendente'):!meets?'Abaixo da referência':i.local==='limited'?'Banda atende; conexão instável':i.local!=='stable'?'Banda atende; estabilidade pendente':'Banda atende; validar no piloto';
  return {...p,meets,status};
 })};
}

export function rankPlatforms(i:NetworkInputs){
 const visible=visibleRequirements(i);i={...i,participants:visible.includes('participants')?i.participants:'',parallelRooms:visible.includes('parallelRooms')?i.parallelRooms:''};
 const assessment=assessPlatforms(i);
 const considerBBB=i.conferenceExisting==='bbb'||(i.meetingResources==='interactive'&&i.technicalSupport&&i.technicalSupport!=='none'&&Number(i.participants)<=100);
 const video=assessment.rows.filter(p=>p.id.endsWith('-video')&&(p.platform!=='BigBlueButton'||considerBBB));
 const constrained=assessment.measured&&!video.some(p=>p.meets);
 const mode=constrained||i.meetingResources==='audio'?'audio':'video';
 const conference=assessment.rows.filter(p=>p.id.endsWith('-'+mode)).map(p=>({...p,score:assessment.measured?Math.min(assessment.perUp!/p.up,assessment.perDown!/p.down):null})).sort((a,b)=>(b.score??0)-(a.score??0));

 const contextual=!!i.pedagogy&&!!i.teachingExisting&&!!i.technicalSupport;
 const fit=(id:string)=>i.conferenceExisting===id.split('-')[0]?(i.licenseFit==='no'?-1:i.licenseFit==='yes'?2:1):0;
 conference.sort((a,b)=>{const af=fit(a.id),bf=fit(b.id);return (bf===-1?-1:0)-(af===-1?-1:0)||Number(b.meets)-Number(a.meets)||bf-af||(b.score??0)-(a.score??0)});
 const ranked=conference.map(p=>{const eligible=fit(p.id)!==-1&&(p.platform!=='BigBlueButton'||i.conferenceExisting==='bbb'||(i.meetingResources==='interactive'&&i.technicalSupport&&i.technicalSupport!=='none'&&Number(i.participants)<=100));const rank=(assessment.measured||contextual)&&eligible?conference.findIndex(x=>fit(x.id)===fit(p.id)&&x.meets===p.meets&&Math.abs((x.score??0)-(p.score??0))<1e-9)+1:null;return {...p,rank,tied:eligible&&conference.filter(x=>fit(x.id)===fit(p.id)&&x.meets===p.meets&&Math.abs((x.score??0)-(p.score??0))<1e-9).length>1,licenseStatus:!eligible?(fit(p.id)===-1?'Plano atual não atende; adequar ou substituir':'Confirmar servidor, suporte e dimensionamento antes de considerar'):fit(p.id)===2?'Licença declarada adequada aos requisitos':fit(p.id)===1?'Verificar os requisitos na licença existente':'Verificar plano, capacidade e recursos antes de contratar',eligible};});
 const offline=constrained||i.offlineNeed==='yes';
 const teaching=[
  {id:'moodle',platform:'Moodle + aplicativo Moodle',points:0,reasons:[] as string[],detail:'Download de conteúdos e atividades off-line com sincronização, conforme configuração. Confirmar hospedagem, quizzes e suporte.',url:'https://docs.moodle.org/501/en/Moodle_app_offline_features'},
  {id:'canvas',platform:'Canvas LMS',points:0,reasons:[] as string[],detail:'Ambiente para organizar conteúdos, atividades e avaliações. Confirmar edição institucional, recursos necessários, contas e custo; não presumimos oferta gratuita ou equivalência off-line ao Moodle.',url:'https://www.instructure.com/pt-br/canvas'},
  {id:'classroom',platform:'Google Classroom',points:0,reasons:[] as string[],detail:'Materiais, tarefas e feedback; leitura e edição de anexos baixados pelo aplicativo. Confirmar contas, critérios de conclusão e integrações.',url:'https://support.google.com/edu/classroom/answer/6020279?hl=pt-BR'}
 ];
 for(const p of teaching){
  if(p.id==='moodle'&&offline){p.points+=4;p.reasons.push('Prioridade para atividades off-line (+4)')}
  if(p.id==='moodle'&&i.pedagogy==='structured'){p.points+=4;p.reasons.push('Trilhas e acompanhamento de conclusão (+4)')}
  if(p.id==='canvas'&&i.pedagogy==='structured'){p.points+=4;p.reasons.push('Ambiente estruturado para atividades e avaliações (+4)')}
  if(p.id==='classroom'&&i.pedagogy==='simple'){p.points+=2;p.reasons.push('Materiais e tarefas como foco (+2)')}
  if(p.id===i.teachingExisting){const points=i.budget==='low'?5:3;p.points+=points;p.reasons.push(`Estrutura já disponível (+${points})`)}
  if(p.id==='moodle'&&i.technicalSupport==='none'&&i.teachingExisting!=='moodle'){p.points-=6;p.reasons.push('Implantação sem suporte definido (-6)')}
  if(p.id==='moodle'&&i.pedagogy==='structured'&&(Number(i.participants)>100||Number(i.parallelRooms)>1)){p.points+=1;p.reasons.push('Organização por grupos e turmas (+1)')}
 }
 teaching.sort((a,b)=>b.points-a.points);
 const teachingRanked=teaching.map(p=>({...p,rank:assessment.measured||contextual?teaching.findIndex(x=>x.points===p.points)+1:null,tied:teaching.filter(x=>x.points===p.points).length>1,detail:p.detail}));

 const teachingSuggestion=contextual?teachingRanked[0]:null;
 const suitable=ranked.filter(p=>p.eligible&&p.meets===true);
 const conferenceSuggestion=assessment.measured&&i.meetingResources&&i.conferenceExisting&&i.technicalSupport?suitable[0]??null:null;
 const teachingReason=teachingSuggestion?teachingSuggestion.reasons.map(r=>r.replace(/ \([+-]\d+\)/g,'')).join('; ')||'Adequação geral aos requisitos informados; testar no piloto.':'';
 const conferenceReason=conferenceSuggestion?`${i.conferenceExisting===conferenceSuggestion.id.split('-')[0]?'Aproveita o serviço existente. ':''}${conferenceSuggestion.status}. ${conferenceSuggestion.licenseStatus}. ${conferenceSuggestion.platform==='BigBlueButton'?'Sala virtual para ensino: confirmar hospedagem e capacidade do servidor. ':''}Perfil avaliado: ${conferenceSuggestion.usage}.`:'';
 return {...assessment,mode,constrained,conference:ranked,teaching:teachingRanked,contextual,teachingSuggestion,conferenceSuggestion,teachingReason,conferenceReason};
}
