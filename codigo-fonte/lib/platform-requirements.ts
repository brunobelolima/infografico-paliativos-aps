export type PlatformRequirements={participants:string;parallelRooms:string;pedagogy:string;offlineNeed:string;teachingExisting:string;conferenceExisting:string;technicalSupport:string;meetingResources:string;licenseFit:string;budget?:string};
export const requirementOptions:Record<keyof Omit<PlatformRequirements,'budget'>,{label:string;options:[string,string][]}>={
 participants:{label:'Máximo de participantes por turma / encontro',options:[['25','Até 25'],['100','Até 100'],['300','Até 300'],['500','Até 500'],['1000','Até 1.000']]},
 parallelRooms:{label:'Turmas ou reuniões simultâneas',options:[['1','Uma'],['2','Duas'],['3','Três ou mais']]},
 pedagogy:{label:'Recursos necessários no ambiente de ensino',options:[['simple','Materiais, tarefas e feedback'],['structured','Trilhas por profissão, quizzes e acompanhamento de conclusão']]},
 offlineNeed:{label:'Materiais e atividades precisam funcionar off-line?',options:[['yes','Sim'],['no','Não'],['unknown','Ainda não definido']]},
 teachingExisting:{label:'Plataforma de ensino já disponível',options:[['none','Nenhuma'],['moodle','Moodle configurado'],['classroom','Google Classroom com contas disponíveis'],['canvas','Canvas institucional'],['unknown','Ainda não confirmado']]},
 conferenceExisting:{label:'Plataforma de videoconferência já disponível',options:[['none','Nenhuma'],['teams','Microsoft Teams'],['meet','Google Meet'],['zoom','Zoom'],['webex','Webex'],['bbb','BigBlueButton'],['unknown','Ainda não confirmado']]},
 technicalSupport:{label:'Suporte para configuração e manutenção',options:[['internal','Sim, equipe ou parceiro'],['none','Não']]},
 meetingResources:{label:'Recursos indispensáveis nos encontros',options:[['audio','Somente áudio'],['basic','Vídeo e apresentação'],['interactive','Vídeo, apresentação e salas para pequenos grupos'],['recorded','Vídeo, gravação e relatório de presença']]},

 licenseFit:{label:'O serviço atual atende ao tamanho da turma, encontros simultâneos e recursos necessários?',options:[['yes','Sim, verificado na licença institucional'],['no','Não atende'],['unknown','Ainda não verificado']]}
};
export function requirementSummary(i:Partial<PlatformRequirements>){return Object.entries(requirementOptions).filter(([key])=>visibleRequirements(i).includes(key as keyof typeof requirementOptions)&&!!i[key as keyof PlatformRequirements]).map(([key,o])=>[o.label,o.options.find(([v])=>v===i[key as keyof PlatformRequirements])?.[1]??'Não informado'])}

export function visibleRequirements(i:Partial<PlatformRequirements>){return Object.keys(requirementOptions).filter(key=>{
 if(key==='licenseFit')return ['teams','meet','zoom','webex','bbb'].includes(i.conferenceExisting??'');
 if(key==='parallelRooms')return i.pedagogy==='structured';
 if(key==='participants')return i.pedagogy==='structured'||i.meetingResources==='interactive'||i.conferenceExisting==='bbb';
 return true;
}) as (keyof typeof requirementOptions)[]}
