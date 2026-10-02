import {requirementSummary} from './platform-requirements';
import type {TrailState} from './trail';
import type {Municipality} from './connectivity';
const maps:Record<string,Record<string,string>>={
 audience:{multi:'Equipe multiprofissional',category:'Categoria profissional específica',management:'Gestores do SUS'},
 goal:{knowledge:'Consolidar conhecimento',confidence:'Desenvolver segurança percebida',practice:'Aplicar o aprendizado no serviço'},
 local:{stable:'Testada e adequada para webconferência',limited:'Instável ou com acesso restrito',unknown:'Ainda não confirmada'},
 mobile:{yes:'Há participantes que acessam apenas por celular',no:'Sem uso exclusivo de celular, conforme levantamento',unknown:'Dispositivos ainda não confirmados'},
 time:{yes:'Pactuado na jornada de trabalho',no:'Não pactuado',unknown:'Ainda não confirmado'},
 content:{yes:'Conteúdo adequado disponível',partial:'Conteúdo parcial; complementar',no:'Produção necessária'},
 team:{full:'CP, pedagogia, TI e administração',partial:'Equipe parcialmente disponível',none:'Sem equipe interna'},
 budget:{low:'Recursos limitados',medium:'Recursos intermediários',high:'Recursos ampliados'},
 lms:{yes:'Plataforma, hospedagem e suporte disponíveis',no:'Não disponíveis',unknown:'Ainda não confirmados'},
 facilitation:{yes:'Responsável disponível',no:'Sem responsável definido',unknown:'Ainda não confirmado'},
 specialist:{yes:'Equipe e canal disponíveis',no:'Não disponíveis; buscar parceria',unknown:'Ainda não confirmados'},
 acs:{yes:'ACS incluídos',no:'Sem participação de ACS',unknown:'Participação de ACS a confirmar'},
 pilot:{notdone:'Não realizado',adjust:'Realizado; há ajustes necessários',done:'Realizado, com condições verificadas'},
 certification:{yes:'Instituição e critérios definidos',no:'Ainda não definidos',unknown:'Ainda não confirmados'},

};
export function summaryRows(v:TrailState,m:Municipality|null) {
 const label=(key:keyof TrailState)=>maps[key]?.[String(v[key])]??'Não informado';
 return {
  territory:m?`${m.name} · ${m.uf}`:'Município com dados pendentes',
  audience:label('audience'),goal:label('goal'),
  rows:[['Participação de ACS',label('acs')],['Tempo protegido',label('time')],['Conteúdo',label('content')],['Equipe',label('team')],['Orçamento',label('budget')],['Plataforma e suporte',label('lms')],['Mediação pedagógica',label('facilitation')],['Telessaúde',label('specialist')],['Piloto',label('pilot')],['Certificação',label('certification')],...requirementSummary(v)]
 };
}

export function finalGuidance(v:TrailState,modality:string,production:string,pending:string[]){
 if(v.team==='none')return {title:'Estabelecer parceria para viabilizar o curso',action:`Buscar instituição ou equipe com apoio em CP, pedagogia e tecnologia. Planejar ${modality.toLocaleLowerCase('pt-BR')} e definir responsabilidades antes do piloto.`};
 if(v.pilot==='adjust')return {title:'Ajustar o curso e repetir o piloto',action:`Corrigir as dificuldades observadas, mantendo a proposta de ${modality.toLocaleLowerCase('pt-BR')}. Reavaliar acesso, participação e aprendizagem antes de ampliar.`};
 if(v.lms!=='yes'||v.facilitation!=='yes'||v.certification!=='yes'||v.team!=='full')return {title:'Preparar as condições para a oferta',action:`${production}. Resolver as pendências de plataforma, equipe, acompanhamento e certificação indicadas abaixo. A modalidade proposta é ${modality.toLocaleLowerCase('pt-BR')}.`};
 if(v.pilot!=='done')return {title:'Executar o piloto antes de ampliar',action:`Testar uma turma com ${modality.toLocaleLowerCase('pt-BR')}, validar o acesso e acompanhar conclusão, aprendizagem e barreiras. ${v.specialist==='yes'?'Incluir o apoio por telessaúde pactuado.':'Buscar parceria para apoio à prática.'}`};
 if(pending.length)return {title:'Resolver as pendências antes da ampliação',action:`Manter a proposta de ${modality.toLocaleLowerCase('pt-BR')} e concluir as providências listadas abaixo antes de ampliar a oferta.`};
 return {title:`Prosseguir com ${modality.toLocaleLowerCase('pt-BR')}`,action:`${production}. As condições informadas permitem planejar a oferta após análise dos resultados do piloto. ${v.specialist==='yes'?'Integrar o apoio por telessaúde pactuado e tarefas aplicadas.':'Manter tarefas aplicadas e acompanhamento pedagógico.'} Acompanhar participação e aprendizagem durante a oferta.`};
}
